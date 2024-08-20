import {
  Client,
  Activity,
  Token,
  Credentials,
  ConversationReference,
  TokenExchangeInvokeResponse,
  SignInTokenExchangeInvokeActivity,
  SignInVerifyStateInvokeActivity,
} from '@teams/api';

import { HttpClientOptions, HttpError, StatusCodes } from '@teams/common/http';
import { Logger, ConsoleLogger } from '@teams/common/logging';

import pkg from '../../package.json';
import { Receiver, ReceiverActivityArgs, HttpReceiver } from '../receiver';

import { signin } from './signin';
import { ActivityEventArgs, Events } from './events';
import { AppTokens } from './tokens';

export type AppOptions = Credentials & {
  readonly http?: HttpClientOptions;
  readonly logger?: Logger;
  readonly receiver?: Receiver;
};

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

  constructor(readonly options: AppOptions) {
    this.log = this.options.logger || new ConsoleLogger({ name: '@teams/app' });
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
    this.on('error', this._onError.bind(this));
    this.on('activity.invoke[signin/tokenExchange]', this._onTokenExchange.bind(this));
    this.on('activity.invoke[signin/verifyState]', this._onVerifyState.bind(this));
  }

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
          this.log.info('listening 🚀');
          resolve();
        })
        .catch((err) => {
          this.log.error(err);
          reject(err);
        });
    });
  }

  on<Event extends keyof Events>(event: Event, cb: Events[Event]) {
    this._events[event] = cb;
  }

  protected async onActivity(args: ReceiverActivityArgs) {
    const { token, activity } = args;

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

    activity.callerId = token.fromId;

    const say = (params: Partial<Activity>) => {
      if (params.id) {
        return api.conversations.activities(activity.conversation.id).update(params.id, params);
      }

      return api.conversations.activities(activity.conversation.id).create(params);
    };

    const reply = (id: string, params: Partial<Activity>) => {
      return api.conversations.activities(activity.conversation.id).reply(id, params);
    };

    const params = {
      ...args,
      api,
      log: this.log,
      tokens: this.tokens,
      conversation,
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

    if (activity.type === 'message') {
      await say({ type: 'typing' });
    }

    this._emit('activity', params);
    this._emit(`activity.${activity.type}`, params);

    if (activity.type === 'message' && activity.entities?.some((e) => e.type === 'mention')) {
      const mention = activity.entities?.find(
        (e) => e.type === 'mention' && e.mentioned.id === activity.recipient.id
      );

      if (mention) {
        this._emit('mention', { ...params, mention });
      }
    }

    if (activity.type === 'invoke') {
      const res = await this._emit(`activity.${activity.type}[${activity.name}]`, params);
      if (res) return res;
    }

    return { status: 200 };
  }

  private _emit<Event extends keyof Events>(event: Event, data?: any) {
    if (!this._events[event]) return;
    return this._events[event](data as never);
  }

  private _onError(err: Error) {
    this.log.error(err);
  }

  private async _onTokenExchange(args: ActivityEventArgs<SignInTokenExchangeInvokeActivity>) {
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

  private async _onVerifyState(args: ActivityEventArgs<SignInVerifyStateInvokeActivity>) {
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

export * from './events';
export * from './tokens';
