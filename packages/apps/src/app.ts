import npath from 'path';
import { AxiosError } from 'axios';

import { Logger, ConsoleLogger } from '@teams.sdk/common/logging';
import { LocalStorage, Storage } from '@teams.sdk/common/storage';
import * as http from '@teams.sdk/common/http';
import * as graph from '@teams.sdk/graph';

import {
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
import { Plugin, RouteHandler, Sender } from './types';
import { DEFAULT_EVENTS, Events } from './events';
import { ActivityContext } from './activity-context';
import { MiddlewareContext } from './middleware-context';
import { HttpPlugin } from './plugins';
import { OAuthSettings } from './oauth';
import { AppClient, ApiClient } from './api';
import * as manifest from './manifest';

/**
 * App initialization options
 */
export type AppOptions = Partial<Credentials> & {
  /**
   * http client or client options used to make api requests
   */
  readonly http?: http.Client | http.ClientOptions | (() => http.Client);

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

  /**
   * OAuth Settings
   */
  readonly oauth?: OAuthSettings;

  /**
   * The apps manifest
   */
  readonly manifest?: Partial<manifest.Manifest>;
};

export interface AppTokens {
  /**
   * bot token used to send activities
   */
  bot?: Token;

  /**
   * graph token used to query the graph api
   */
  graph?: Token;
}

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
   *
   */
  readonly sender: (ctx: ActivityContext) => Sender | Promise<Sender>;

  /**
   * other
   */
  [key: string]: any;
}

/**
 * The orchestrator for receiving/sending activities
 */
export class App {
  api: AppClient;
  log: Logger;
  storage: Storage;
  credentials?: Credentials;

  /**
   * the apps id
   */
  get id() {
    return this.tokens.bot?.appId || this.tokens.graph?.appId;
  }

  /**
   * the apps name
   */
  get name() {
    return this.tokens.bot?.appDisplayName || this.tokens.graph?.appDisplayName;
  }

  /**
   * the apps manifest
   */
  get manifest(): Partial<manifest.Manifest> {
    return {
      id: this.id,
      name: {
        short: this.name || '??',
        full: this.name || '??',
        ...this._manifest.name,
      },
      bots: [
        {
          botId: this.id || '??',
          scopes: ['personal'],
        },
      ],
      webApplicationInfo: {
        id: this.credentials?.clientId || '??',
        resource: `api://\${{BOT_DOMAIN}}/${this.credentials?.clientId || '??'}`,
        ...this._manifest.webApplicationInfo,
      },
      ...this._manifest,
    };
  }

  /**
   * the apps auth tokens
   */
  get tokens() {
    return this._tokens;
  }

  protected http: http.Client;
  protected plugins: Array<Plugin>;
  protected router = new Router();
  protected tenantTokens = new LocalStorage<string>(undefined, { max: 20000 });

  private readonly _events = DEFAULT_EVENTS;
  private readonly _userAgent = `teams[apps]/${pkg.version}`;
  private readonly _manifest: Partial<manifest.Manifest>;
  private _tokens: AppTokens = {};

  constructor(readonly options: AppOptions = {}) {
    this.log = this.options.logger || new ConsoleLogger('@teams.sdk/app');
    this.storage = this.options.storage || new LocalStorage();
    this.plugins = this.options.plugins || [];
    this._manifest = this.options.manifest || {};

    if (!options.http) {
      this.http = new http.Client({
        headers: {
          'User-Agent': this._userAgent,
        },
      });
    } else if (typeof options.http === 'function') {
      this.http = options.http().clone({
        headers: {
          'User-Agent': this._userAgent,
        },
      });
    } else if ('request' in options.http) {
      this.http = options.http.clone({
        headers: {
          'User-Agent': this._userAgent,
        },
      });
    } else {
      this.http = new http.Client({
        ...options.http,
        headers: {
          ...options.http.headers,
          'User-Agent': this._userAgent,
        },
      });
    }

    this.api = new AppClient(
      'https://smba.trafficmanager.net/teams',
      this.http.clone({ token: () => this._tokens.bot }),
      this.http.clone({ token: () => this._tokens.graph })
    );

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

    if (!this.plugins.find((p) => p.name === 'http')) {
      this.plugins.unshift(new HttpPlugin());
    }

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
        const botResponse = await this.api.bots.token.get(this.credentials);
        const graphResponse = await this.api.bots.token.getGraph(this.credentials);
        this._tokens = {
          bot: new JsonWebToken(botResponse.access_token),
          graph: new JsonWebToken(graphResponse.access_token),
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

    plugin.register(this);
    plugin.on('error', (err) =>
      this._events.error({
        err: err,
        log: this.log,
      })
    );

    this.plugins.push(plugin);
    return this;
  }

  /**
   * get a plugin
   */
  getPlugin(name: string) {
    return this.plugins.find((p) => p.name === name);
  }

  /**
   * add/update a function that can be called remotely
   * @param name The unique function name
   * @param cb The callback to handle the function
   */
  function(name: string, cb: (...args: any[]) => any | Promise<any>) {
    const http = this.plugins.find((p) => p.name === 'http');

    if (http && http instanceof HttpPlugin) {
      http.post(`/api/functions/${name}`, async (req, res) => {
        const body = Array.isArray(req.body) ? req.body : [req.body];
        const data = await cb(...body);
        res.send(data);
      });
    }

    return this;
  }

  /**
   * add/update a static tab.
   * the tab will be hosted at
   * `http://localhost:{{PORT}}/tabs/{{name}}` or `https://{{BOT_DOMAIN}}/tabs/{{name}}`
   * @remark scopes default to `personal`
   * @param name A unique identifier for the entity which the tab displays.
   * @param path The path to the web `dist` folder.
   */
  tab(
    name: string,
    path: string,
    options?: Partial<Omit<manifest.StaticTab, 'contentUrl' | 'entityId'>>
  ) {
    if (!this._manifest.staticTabs) {
      this._manifest.staticTabs = [];
    }

    const i = this._manifest.staticTabs.findIndex((t) => t.entityId === name);
    const tab: manifest.StaticTab = {
      entityId: name,
      contentUrl: `https://\${{BOT_DOMAIN}}/tabs/${name}`,
      scopes: ['personal'],
      ...options,
    };

    if (i > -1) {
      this._manifest.staticTabs[i] = tab;
    } else {
      this._manifest.staticTabs.push(tab);
    }

    const http = this.plugins.find((p) => p.name === 'http');

    if (http && http instanceof HttpPlugin) {
      http.static(`/tabs/${name}`, path);
      http.use(`/tabs/${name}*`, async (_, res) => {
        res.sendFile(npath.join(path, 'index.html'));
      });
    }

    return this;
  }

  /**
   * add a configurable tab
   * @remark scopes defaults to `team`
   * @param url The url to use when configuring the tab.
   */
  configTab(url: string, options?: Partial<Omit<manifest.ConfigurableTab, 'configurationUrl'>>) {
    if (!this._manifest.configurableTabs) {
      this._manifest.configurableTabs = [];
    }

    this._manifest.configurableTabs.push({
      configurationUrl: url,
      scopes: ['team'],
      ...options,
    });

    return this;
  }

  /**
   * activity handler called when an inbound activity is received
   * @param args activity arguments
   */
  async process(args: ProcessActivityArgs): Promise<InvokeResponse> {
    const { token, activity } = args;

    this.log.debug(
      `activity/${activity.type}${activity.type === 'invoke' ? `/${activity.name}` : ''}`
    );

    let serviceUrl = activity.serviceUrl || token.serviceUrl;

    if (serviceUrl.endsWith('/')) {
      serviceUrl = serviceUrl.slice(0, serviceUrl.length - 1);
    }

    let userToken: string | undefined;
    let botToken =
      this.tenantTokens.get(token.tenantId || 'common') || this._tokens.graph?.toString();

    try {
      const res = await this.api.users.token.get({
        channelId: activity.channelId,
        userId: activity.from.id,
        connectionName: this.options.oauth?.graph || 'graph',
      });

      userToken = res.token;

      if (this.credentials && !botToken) {
        const { access_token } = await this.api.bots.token.getGraph({
          ...this.credentials,
          tenantId: args.token.tenantId,
        });

        botToken = access_token;
        this.tenantTokens.set(token.tenantId || 'common', access_token);
      }
    } catch (err) {}

    const api = new ApiClient(
      serviceUrl,
      this.http.clone({ token: () => this.tokens.bot }),
      this.http.clone({ token: () => botToken }),
      this.http.clone({ token: () => userToken })
    );

    const conversation: ConversationReference = {
      serviceUrl,
      activityId: activity.id,
      bot: activity.recipient,
      channelId: activity.channelId,
      conversation: activity.conversation,
      locale: activity.locale,
      user: activity.from,
    };

    const routes = this.router.select(activity);

    if (routes.length === 0) {
      return { status: 200 };
    }

    const ctx: ActivityContext<Activity> = {
      ...args,
      sender: undefined,
      api,
      appId: this.id || '',
      log: this.log,
      tokens: this.tokens,
      ref: conversation,
      storage: this.storage,
      isSignedIn: !!userToken,
    };

    let i = 0;
    const sender = await args.sender(ctx);
    const stream = sender.stream || {
      emit: () => {},
      close: () => {},
    };

    const routeCtx: MiddlewareContext<Activity> = {
      ...ctx,
      stream,
      log: this.log,
      conversation,
      storage: this.storage,
      next: (context) => {
        if (i === routes.length - 1) return;
        i++;
        return routes[i](context || routeCtx);
      },
      send: sender.send.bind(sender),
      reply: sender.reply.bind(sender),
      signin: sender.signin.bind(sender),
      signout: sender.signout.bind(sender),
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

      ctx.api.user = new graph.Client(
        this.http.clone({
          token: token.token,
        })
      );

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

      ctx.api.user = new graph.Client(
        this.http.clone({
          token: token.token,
        })
      );

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
