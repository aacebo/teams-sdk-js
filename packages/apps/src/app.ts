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

import { Receiver, ReceiverActivityArgs } from './receiver';
import { HttpReceiver } from './http-receiver';
import { Routes } from './routes';
import { AppTokens } from './tokens';
import { Router } from './router';
import { RouteHandler } from './types';
import { DEFAULT_EVENTS, Events } from './events';
import { Context, signin, send, reply, withAIContentLabel, withMention } from './context';

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
  private _tokens: AppTokens = {};

  private readonly _api: Client;
  private readonly _receiver: Receiver;
  private readonly _storage: Storage;
  private readonly _exchanges = new Map<string, string>();
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
    this._receiver =
      this.options.receiver ||
      new HttpReceiver({
        logger: this.options.logger,
      });

    this._receiver.on('activity', this.onActivity.bind(this));

    // default event handlers
    this.on('signin.token-exchange', this._onTokenExchange.bind(this));
    this.on('signin.verify-state', this._onVerifyState.bind(this));
  }

  /**
   * start the app
   * @param port port to listen on
   */
  async start(port = 3000) {
    try {
      const botToken = await this._api.bots.token.get(this.options);
      this._tokens.bot = new Token(botToken.access_token);

      const graphToken = await this._api.bots.token.getGraph(this.options);
      this._tokens.graph = new Token(graphToken.access_token);
    } catch (err) {
      this.log.error(err);
      throw err;
    }

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
  use(cb: RouteHandler<Context>) {
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

    const api = new Client({
      ...this.options.http,
      baseUrl: token.serviceUrl,
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

    let i = 0;
    const ctx: Context<Activity> = {
      ...args,
      api,
      log: this.log,
      tokens: this.tokens,
      conversation,
      data: new Map<string, any>(),
      storage: this._storage,
      next: (context) => {
        if (i === routes.length - 1) return;
        i++;
        return routes[i](context || ctx);
      },
      withAIContentLabel,
      withMention,
      send: send(api.conversations.activities(activity.conversation.id)),
      reply: reply(api.conversations.activities(activity.conversation.id)),
      signin: signin({
        appId: this._tokens.bot!.appId,
        api,
        activity,
        conversation,
        log: this.log,
      }),
    };

    const res = await routes[0](ctx);
    return res || { status: 200 };
  }

  private async _onTokenExchange(ctx: Context<SignInTokenExchangeInvokeActivity>) {
    const { api, activity } = ctx;
    const key = `${activity.conversation.id}/${activity.from.id}`;

    try {
      this._exchanges.set(key, activity.value.connectionName);
      const token = await api.users.token.exchange({
        channelId: activity.channelId,
        userId: activity.from.id,
        connectionName: activity.value.connectionName,
        exchangeRequest: {
          token: activity.value.token,
        },
      });

      this._events.signin({ ...ctx, tokenResponse: token });
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

  private async _onVerifyState(ctx: Context<SignInVerifyStateInvokeActivity>) {
    const { api, activity } = ctx;
    const key = `${activity.conversation.id}/${activity.from.id}`;

    try {
      const connectionName = this._exchanges.get(key);

      if (!connectionName || !activity.value.state) {
        return { status: StatusCodes.NOT_FOUND };
      }

      const token = await api.users.token.get({
        channelId: activity.channelId,
        userId: activity.from.id,
        connectionName,
        code: activity.value.state,
      });

      this._exchanges.delete(key);
      this._events.signin({ ...ctx, tokenResponse: token });
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
