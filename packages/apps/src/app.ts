import axios, { AxiosError } from 'axios';

import { Logger, ConsoleLogger } from '@teams.sdk/common/logging';
import { LocalStorage, Storage } from '@teams.sdk/common/storage';
import {
  Client,
  Activity,
  Token,
  Credentials,
  ConversationReference,
  TokenExchangeInvokeResponse,
  SignInTokenExchangeInvokeActivity,
  SignInVerifyStateInvokeActivity,
  InvokeResponse,
  JsonWebToken,
} from '@teams.sdk/api';

import pkg from '../package.json';

import { Routes } from './routes';
import { Router } from './router';
import { Plugin, RouteHandler } from './types';
import { DEFAULT_EVENTS, Events } from './events';
import { ActivityContext } from './activity-context';
import { MiddlewareContext } from './middleware-context';
import { withAIContentLabel, withMention } from './utils';
import { HttpPlugin } from './plugins';

/**
 * App initialization options
 */
export type AppOptions = Partial<Credentials> & {
  /**
   * http client options used to make api requests
   */
  readonly http?: axios.CreateAxiosDefaults;

  /**
   * logger instance to use
   */
  readonly logger?: Logger;

  /**
   * storage instance to use
   */
  readonly storage?: Storage;

  /**
   * plugins to extend the apps functionality
   */
  readonly plugins?: Array<Plugin>;
};

export interface ProcessActivityArgs {
  /**
   * inbound request token
   */
  readonly token: Token;

  /**
   * inbound request activity payload
   */
  readonly activity: Activity;

  /**
   * other
   */
  [key: string]: any;
}

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

  protected plugins: Array<Plugin>;
  protected sender: Plugin;
  protected storage: Storage;
  protected api: Client;
  protected router = new Router();
  protected credentials?: Credentials;

  private readonly _events = DEFAULT_EVENTS;

  constructor(readonly options: AppOptions) {
    this.log = this.options.logger || new ConsoleLogger('@teams.sdk/app');
    this.api = new Client({
      ...this.options.http,
      headers: {
        ...this.options.http?.headers,
        'User-Agent': `teams[apps]/${pkg.version}`,
      },
    });

    this.storage = this.options.storage || new LocalStorage();
    this.plugins = this.options.plugins || [];

    const clientId = this.options.clientId || process.env.CLIENT_ID;
    const clientSecret = this.options.clientSecret || process.env.CLIENT_SECRET;
    const tenantId = this.options.tenantId || process.env.TENANT_ID;

    if (clientId && clientSecret) {
      this.credentials = {
        clientId: clientId,
        clientSecret: clientSecret,
        tenantId: tenantId,
      };
    }

    const http = new HttpPlugin();
    let sender = this.plugins.find((p) => !!p.sender);

    if (!sender) {
      sender = http;
      this.plugin(http);
    }

    this.sender = sender;

    for (const plugin of this.plugins) {
      plugin.register(this);
      plugin.on('error', (err) =>
        this._events.error({
          err: err,
          log: this.log,
        })
      );
    }

    // default event handlers
    this.on('signin.token-exchange', this.onTokenExchange.bind(this));
    this.on('signin.verify-state', this.onVerifyState.bind(this));
  }

  /**
   * start the app
   * @param port port to listen on
   */
  async start(port = 3000) {
    try {
      if (this.credentials) {
        const bot = await this.api.bots.token.get(this.credentials);
        const graph = await this.api.bots.token.getGraph(this.credentials);
        this._tokens = {
          bot: new JsonWebToken(bot.access_token),
          graph: new JsonWebToken(graph.access_token),
        };
      }

      for (const plugin of this.plugins) {
        if (plugin.start) {
          await plugin.start(port);
        }
      }

      this._events.start(this.log);
    } catch (err: any) {
      this._events.error({ err, log: this.log });
    }
  }

  /**
   * subscribe to an event
   * @param name event to subscribe to
   * @param cb callback to invoke
   */
  on<Name extends keyof Routes>(name: Name, cb: Exclude<Routes[Name], undefined>) {
    this.router.on(name, cb);
    return this;
  }

  /**
   * subscribe to a message event for a specific pattern
   * @param pattern pattern to match against message text
   * @param cb callback to invoke
   */
  message(pattern: string | RegExp, cb: Exclude<Routes['message'], undefined>) {
    this.router.register<'message'>({
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
    this.router.use(cb);
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
   * add a plugin
   * @param plugin plugin to add
   */
  plugin(plugin: Plugin) {
    if (this.plugins.some((p) => p.name === plugin.name)) {
      return;
    }

    this.plugins.push(plugin);
    return this;
  }

  /**
   * activity handler called when an inbound activity is received
   * @param args activity arguments
   */
  async process(args: ProcessActivityArgs): Promise<InvokeResponse> {
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
      baseURL: serviceUrl,
      headers: {
        ...this.options.http?.headers,
        'User-Agent': `teams[apps]/${pkg.version}`,
        Authorization: `Bearer ${this.tokens.bot}`,
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

    const routes = this.router.select(activity);

    if (routes.length === 0) {
      return { status: 200 };
    }

    const tenantId = this.options.tenantId || 'common';
    const creds = {
      ...this.credentials,
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
      storage: this.storage,
    };

    let i = 0;
    const sender = this.sender.sender!(ctx);
    const stream = sender.stream || {
      emit: () => {},
      close: () => {},
    };

    const routeCtx: MiddlewareContext<Activity> = {
      ...ctx,
      api,
      log: this.log,
      conversation,
      storage: this.storage,
      stream: stream,
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
    await stream.close();
    return res || { status: 200 };
  }

  protected async onTokenExchange(ctx: MiddlewareContext<SignInTokenExchangeInvokeActivity>) {
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
      return { status: 200 };
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.status !== 404 && err.status !== 400) {
          this._events.error({ ...ctx, err });
        }

        if (err.status === 404) {
          return { status: 404 };
        }
      }

      return {
        status: 412,
        body: {
          id: activity.value.id,
          connectionName: activity.value.connectionName,
          failureDetail: 'unable to exchange token...',
        } as TokenExchangeInvokeResponse,
      };
    }
  }

  protected async onVerifyState(ctx: MiddlewareContext<SignInVerifyStateInvokeActivity>) {
    const { api, activity, storage } = ctx;
    const key = `auth/${activity.conversation.id}/${activity.from.id}`;

    try {
      const connectionName: string | undefined = await storage.get(key);

      if (!connectionName || !activity.value.state) {
        return { status: 404 };
      }

      const token = await api.users.token.get({
        channelId: activity.channelId,
        userId: activity.from.id,
        connectionName,
        code: activity.value.state,
      });

      await storage.delete(key);
      this._events.signin({ ...ctx, token });
      return { status: 200 };
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.status !== 404 && err.status !== 400) {
          this._events.error({ ...ctx, err });
        }
      }

      return { status: 412 };
    }
  }
}
