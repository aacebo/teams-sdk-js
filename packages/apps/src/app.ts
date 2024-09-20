import {
  Client,
  Activity,
  Token,
  Credentials,
  ConversationReference,
  TokenExchangeInvokeResponse,
  SignInTokenExchangeInvokeActivity,
  SignInVerifyStateInvokeActivity,
} from '@teams.sdk/api';

import { HttpClientOptions, HttpError, StatusCodes } from '@teams.sdk/common/http';
import { Logger, ConsoleLogger } from '@teams.sdk/common/logging';
import { LocalStorage, Storage } from '@teams.sdk/common/storage';

import pkg from '../package.json';

import { HttpReceiver, Receiver, ReceiverActivityArgs } from './receiver';
import { Routes } from './routes';
import { Router } from './router';
import { RouteHandler } from './types';
import { DEFAULT_EVENTS, Events } from './events';
import { Sender, HttpSender, SenderContext } from './sender';
import { ActivityContext } from './activity-context';
import { MiddlewareContext } from './middleware-context';
import { withAIContentLabel, withMention } from './utils';

/**
 * App initialization options
 */
export type AppOptions = Credentials & {
  /**
   * http client options used to make api requests
   */
  readonly http?: HttpClientOptions;

  /**
   * logger instance to use
   */
  readonly logger?: Logger;

  /**
   * receiver instance to listen for incoming activities
   */
  readonly receiver?: Receiver;

  /**
   * sender factory to send outgoing acitivies
   */
  readonly sender?: (ctx: SenderContext) => Sender | Promise<Sender>;

  /**
   * storage instance to use
   */
  readonly storage?: Storage;
};

/**
 * The orchestrator for receiving/sending activities
 */
export class App {
  readonly log: Logger;

  get tokens() {
    return this._tokens;
  }
  private _tokens: {
    /**
     * bot token used to send activities
     */
    bot?: Token;

    /**
     * graph token used to query the graph api
     */
    graph?: Token;
  } = {};

  private readonly _api: Client;
  private readonly _receiver: Receiver;
  private readonly _sender?: (ctx: SenderContext) => Sender | Promise<Sender>;
  private readonly _storage: Storage;
  private readonly _router = new Router();
  private readonly _events = DEFAULT_EVENTS;

  constructor(readonly options: AppOptions) {
    this.log = this.options.logger || new ConsoleLogger('@teams.sdk/app');
    this._api = new Client({
      ...this.options.http,
      requestOptions: {
        ...this.options.http?.requestOptions,
        headers: {
          ...this.options.http?.requestOptions?.headers,
          'user-agent': `teams[apps]/${pkg.version}`,
        },
      },
    });

    this._storage = this.options.storage || new LocalStorage();
    this._sender = this.options.sender;
    this._receiver =
      this.options.receiver ||
      new HttpReceiver({
        ...options,
        logger: this.options.logger,
        api: this._api,
      });

    this._receiver.on('activity', this.onActivity.bind(this));
    this._receiver.on('error', (err) => {
      this._events.error({ err, log: this.log });
    });

    this._receiver.on('start', ({ tokens }) => {
      this.tokens.bot = tokens.bot;
      this.tokens.graph = tokens.graph;
    });

    // default event handlers
    this.on('signin.token-exchange', this._onTokenExchange.bind(this));
    this.on('signin.verify-state', this._onVerifyState.bind(this));
  }

  /**
   * start the app
   * @param port port to listen on
   */
  async start(port = 3000) {
    return await new Promise<void>((resolve, reject) => {
      this._receiver
        .start(port)
        .then(() => {
          this._events.start(this.log);
          resolve();
        })
        .catch((err) => {
          this.log.error(err);
          reject(err);
        });
    });
  }

  /**
   * subscribe to an event
   * @param name event to subscribe to
   * @param cb callback to invoke
   */
  on<Name extends keyof Routes>(name: Name, cb: Exclude<Routes[Name], undefined>) {
    this._router.on(name, cb);
    return this;
  }

  /**
   * subscribe to a message event for a specific pattern
   * @param pattern pattern to match against message text
   * @param cb callback to invoke
   */
  message(pattern: string | RegExp, cb: Exclude<Routes['message'], undefined>) {
    this._router.register<'message'>({
      select: (activity) => {
        if (activity.type !== 'message') {
          return false;
        }

        return new RegExp(pattern).test(activity.text);
      },
      callback: cb,
    });

    return this;
  }

  /**
   * register a middleware
   * @param cb callback to invoke
   */
  use(cb: RouteHandler<MiddlewareContext>) {
    this._router.use(cb);
    return this;
  }

  /**
   * subscribe to an event
   * @param name the event to subscribe to
   * @param cb the callback to invoke
   */
  event<Name extends keyof Events>(name: Name, cb: Events[Name]) {
    this._events[name] = cb;
    return this;
  }

  /**
   * activity handler called when an inbound activity is received
   * @param args activity arguments
   */
  protected async onActivity(args: ReceiverActivityArgs) {
    const { token, activity } = args;
    activity.callerId = token.fromId;

    this.log.debug(
      `activity/${activity.type}${activity.type === 'invoke' ? `/${activity.name}` : ''}`
    );

    let serviceUrl = activity.serviceUrl || token.serviceUrl;

    if (serviceUrl.endsWith('/')) {
      serviceUrl = serviceUrl.slice(0, serviceUrl.length - 1);
    }

    const api = new Client({
      ...this.options.http,
      baseUrl: serviceUrl,
      requestOptions: {
        ...this.options.http?.requestOptions,
        headers: {
          ...this.options.http?.requestOptions?.headers,
          'user-agent': `teams[apps]/${pkg.version}`,
          Authorization: `Bearer ${this.tokens.bot}`,
        },
      },
    });

    const conversation: ConversationReference = {
      activityId: activity.id,
      bot: activity.recipient,
      channelId: activity.channelId,
      conversation: activity.conversation,
      locale: activity.locale,
      serviceUrl: activity.serviceUrl,
      user: activity.from,
    };

    const routes = this._router.select(activity);

    if (routes.length === 0) {
      return { status: 200 };
    }

    let tenantId = 'common';

    if (this.options.type === 'SingleTenant') {
      tenantId = this.options.tenantId;
    }

    const creds = {
      type: this.options.type,
      clientId: this.options.clientId,
      clientSecret: this.options.clientSecret,
      tenantId: tenantId,
    } as Credentials;

    const ctx: ActivityContext<Activity> & Credentials = {
      ...args,
      ...creds,
      appId: this._tokens.bot?.appId || '',
      api,
      log: this.log,
      tokens: this.tokens,
      conversation,
      storage: this._storage,
    };

    let i = 0;
    const sender = this._sender ? await this._sender(ctx) : new HttpSender(ctx);
    const routeCtx: MiddlewareContext<Activity> = {
      ...ctx,
      api,
      log: this.log,
      conversation,
      storage: this._storage,
      next: (context) => {
        if (i === routes.length - 1) return;
        i++;
        return routes[i](context || routeCtx);
      },
      withAIContentLabel,
      withMention,
      send: sender.send.bind(sender),
      reply: sender.reply.bind(sender),
      signin: sender.signin.bind(sender),
    };

    const res = await routes[0](routeCtx);
    return res || { status: 200 };
  }

  private async _onTokenExchange(ctx: MiddlewareContext<SignInTokenExchangeInvokeActivity>) {
    const { api, activity, storage } = ctx;
    const key = `auth/${activity.conversation.id}/${activity.from.id}`;

    try {
      await storage.set(key, activity.value.connectionName);
      const token = await api.users.token.exchange({
        channelId: activity.channelId,
        userId: activity.from.id,
        connectionName: activity.value.connectionName,
        exchangeRequest: {
          token: activity.value.token,
        },
      });

      this._events.signin({ ...ctx, token });
      return { status: StatusCodes.OK };
    } catch (err) {
      if (err instanceof HttpError) {
        if (err.code !== 404 && err.code !== 400) {
          this._events.error({ ...ctx, err });
        }

        if (err.code === 404) {
          return { status: StatusCodes.NOT_FOUND };
        }
      }

      return {
        status: StatusCodes.PRECONDITION_FAILED,
        body: {
          id: activity.value.id,
          connectionName: activity.value.connectionName,
          failureDetail: 'unable to exchange token...',
        } as TokenExchangeInvokeResponse,
      };
    }
  }

  private async _onVerifyState(ctx: MiddlewareContext<SignInVerifyStateInvokeActivity>) {
    const { api, activity, storage } = ctx;
    const key = `auth/${activity.conversation.id}/${activity.from.id}`;

    try {
      const connectionName: string | undefined = await storage.get(key);

      if (!connectionName || !activity.value.state) {
        return { status: StatusCodes.NOT_FOUND };
      }

      const token = await api.users.token.get({
        channelId: activity.channelId,
        userId: activity.from.id,
        connectionName,
        code: activity.value.state,
      });

      await storage.delete(key);
      this._events.signin({ ...ctx, token });
      return { status: StatusCodes.OK };
    } catch (err) {
      if (err instanceof HttpError) {
        if (err.code !== 404 && err.code !== 400) {
          this._events.error({ ...ctx, err });
        }
      }

      return { status: StatusCodes.PRECONDITION_FAILED };
    }
  }
}
