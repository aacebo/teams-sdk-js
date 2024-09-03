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

import pkg from '../package.json';

import { Receiver, ReceiverActivityArgs } from './receiver';
import { HttpReceiver } from './http-receiver';
import { signin } from './signin';
import { Events, INVOKE_ALIASES } from './events';
import { AppTokens } from './tokens';
import { Context } from './context';
import { AppMiddleware, Middleware } from './middleware';

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
  private readonly _exchanges = new Map<string, string>();
  private readonly _events: Events = {};
  private readonly _middleware: AppMiddleware = {
    before: [],
    after: [],
  };

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

    this._receiver =
      this.options.receiver ||
      new HttpReceiver({
        logger: this.options.logger,
      });

    this._receiver.on('activity', this.onActivity.bind(this));
    this._receiver.on('error', (err) => {
      if (!this._events.error) return;
      this._events.error(err);
    });

    // default event handlers
    this.on('start', this._onStart.bind(this));
    this.on('error', this._onError.bind(this));
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
      this._emit('error', err);
      throw err;
    }

    return await new Promise<void>((resolve, reject) => {
      this._receiver
        .start(port)
        .then(() => {
          this._emit('start');
          resolve();
        })
        .catch((err) => {
          this._emit('error', err);
          reject(err);
        });
    });
  }

  /**
   * subscribe to an event
   * @param event event to subscribe to
   * @param cb callback to invoke
   */
  on<Event extends keyof Events>(event: Event, cb: Exclude<Events[Event], undefined>) {
    this._events[event] = cb;
    return this;
  }

  /**
   * subscribe to a message event for a specific pattern
   * @param pattern pattern to match against message text
   * @param cb callback to invoke
   */
  message(pattern: string | RegExp, cb: Exclude<Events['message'], undefined>) {
    this._events.message = (ctx) => {
      if (!new RegExp(pattern).test(ctx.activity.text)) {
        return;
      }

      return cb(ctx);
    };

    return this;
  }

  /**
   * add middleware to run either before or after your event handlers run.
   * if the callback returns a response, the app will respond and stop
   * executing handlers/middleware.
   * @param type when should the middleware be invoked
   * @param cb callback to invoke
   */
  middleware(type: keyof AppMiddleware, cb: Middleware) {
    this._middleware[type].push(cb);
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

    const say = (params: Partial<Activity>) => {
      if (params.id) {
        return api.conversations.activities(activity.conversation.id).update(params.id, params);
      }

      return api.conversations.activities(activity.conversation.id).create(params);
    };

    const reply = (id: string, params: Partial<Activity>) => {
      return api.conversations.activities(activity.conversation.id).reply(id, params);
    };

    const ctx: Context<Activity> = {
      ...args,
      api,
      log: this.log,
      tokens: this.tokens,
      conversation,
      data: new Map<string, any>(),
      say,
      reply,
      signin: signin({
        appId: this._tokens.bot!.appId,
        api,
        activity,
        conversation,
        log: this.log,
      }),
    };

    // run before middleware
    for (const cb of this._middleware.before) {
      const res = await cb(ctx);

      if (res) {
        return res;
      }
    }

    if (activity.type === 'message') {
      await say({ type: 'typing' });
    }

    await this._emit('activity', ctx);
    await this._emit(activity.type, ctx);

    if (activity.type === 'message' && activity.entities?.some((e) => e.type === 'mention')) {
      const mention = activity.entities?.find(
        (e) => e.type === 'mention' && e.mentioned.id === activity.recipient.id
      );

      if (mention) {
        await this._emit('mention', { ...ctx, mention });
      }
    }

    if (activity.type === 'invoke') {
      let res = await this._emit(INVOKE_ALIASES[activity.name], ctx);

      if (activity.name === 'fileConsent/invoke') {
        res = (await this._emit(`file.consent.${activity.value.action}`, ctx)) || res;
      }

      if (activity.name === 'composeExtension/submitAction') {
        res =
          (await this._emit(`message.ext.submit.${activity.value.botMessagePreviewAction}`, ctx)) ||
          res;
      }

      if (res) {
        ctx.res = res;
      }
    }

    if (activity.type === 'installationUpdate') {
      await this._emit(`install.${activity.action}`, ctx);
    }

    // run after middleware
    for (const cb of this._middleware.after) {
      const res = await cb(ctx);

      if (res) {
        return res;
      }
    }

    return ctx.res || { status: 200 };
  }

  private _emit<Event extends keyof Events>(event: Event, data?: any) {
    if (!this._events[event]) return;
    return this._events[event](data as never);
  }

  private _onStart() {
    this.log.info('listening 🚀');
  }

  private _onError(err: Error) {
    this.log.error(err);
  }

  private async _onTokenExchange(args: Context<SignInTokenExchangeInvokeActivity>) {
    const { api, activity } = args;
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

      this._emit('signin', { ...args, tokenResponse: token });
      return { status: StatusCodes.OK };
    } catch (err) {
      if (err instanceof HttpError) {
        if (err.code !== 404 && err.code !== 400) {
          this._emit('error', err);
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

  private async _onVerifyState(args: Context<SignInVerifyStateInvokeActivity>) {
    const { api, activity } = args;
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
      this._emit('signin', { ...args, tokenResponse: token });
      return { status: StatusCodes.OK };
    } catch (err) {
      if (err instanceof HttpError) {
        if (err.code !== 404 && err.code !== 400) {
          this._emit('error', err);
        }
      }

      return { status: StatusCodes.PRECONDITION_FAILED };
    }
  }
}
