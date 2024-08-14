import {
  Client,
  Activity,
  Token,
  Credentials,
  TokenExchangeState,
  ConversationReference,
  cardAttachment,
  TokenExchangeInvokeResponse,
} from '@teams/api';

import { HttpClientOptions, StatusCodes } from '@teams/common/http';
import { Logger, ConsoleLogger } from '@teams/common/logging';

import pkg from '../package.json';

import { Events } from './events';
import { Receiver, ReceiverActivityArgs } from './receiver';
import { HttpReceiver } from './http-receiver';

export type AppOptions = Credentials & {
  readonly http?: HttpClientOptions;
  readonly logger?: Logger;
  readonly receiver?: Receiver;
};

export class App {
  readonly log: Logger;

  get token() {
    return this._token;
  }
  private _token?: Token;

  private readonly _api: Client;
  private readonly _receiver: Receiver;
  private readonly _exchangeState: Record<string, string | undefined> = {};
  private readonly _events: Events = {
    error: this._onError.bind(this),
  };

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

    this._receiver.onActivity(this.onActivity.bind(this));
  }

  async start(port = 3000) {
    try {
      const res = await this._api.bots.token.get(this.options);
      this._token = new Token(res.access_token);
      this._emit('auth', res.access_token);
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
    const api = new Client({
      ...this.options.http,
      baseUrl: token.serviceUrl,
      requestOptions: {
        ...this.options.http?.requestOptions,
        headers: {
          ...this.options.http?.requestOptions?.headers,
          'user-agent': `teams[apps]/${pkg.version}`,
          Authorization: `Bearer ${this.token}`,
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

    const signin = async (name: string, text = 'Sign In') => {
      const tokenExchangeState: TokenExchangeState = {
        connectionName: name,
        conversation: conversation,
        relatesTo: activity.relatesTo,
        msAppId: this._token?.appId!,
      };

      const state = Buffer.from(JSON.stringify(tokenExchangeState)).toString('base64');
      const resource = await api.bots.signIn.getResource({ state });

      return say({
        type: 'message',
        inputHint: 'acceptingInput',
        recipient: activity.from,
        attachments: [
          cardAttachment('oauth', {
            text,
            connectionName: name,
            tokenExchangeResource: resource.tokenExchangeResource,
            tokenPostResource: resource.tokenPostResource,
            buttons: [
              {
                type: 'signin',
                title: 'Sign In',
                value: resource.signInLink,
              },
            ],
          }),
        ],
      });
    };

    const params = {
      ...args,
      say,
      reply,
      signin,
    };

    this.log.debug(
      `activity/${activity.type}${activity.type === 'invoke' ? `/${activity.name}` : ''}`
    );

    if (activity.type === 'message') {
      await say({ type: 'typing' });
    }

    this._emit('activity', params);
    this._emit(`activity.${activity.type}`, params);

    if (activity.type === 'invoke') {
      const key = `${activity.conversation.id}/${activity.from.id}`;
      const res = this._emit(`activity.${activity.type}[${activity.name}]`, params);

      if (activity.name === 'signin/tokenExchange') {
        try {
          this._exchangeState[key] = activity.value.connectionName;
          const token = await api.users.token.exchange({
            channelId: activity.channelId,
            userId: activity.from.id,
            connectionName: activity.value.connectionName,
            exchangeRequest: {
              token: activity.value.token,
            },
          });

          this._emit('sign-in', { ...params, tokenResponse: token });
        } catch (err) {
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

      if (activity.name === 'signin/verifyState') {
        try {
          const connectionName = this._exchangeState[key];

          if (!connectionName || !activity.value.state) {
            return { status: StatusCodes.NOT_FOUND, body: 'not found' };
          }

          const token = await api.users.token.get({
            channelId: activity.channelId,
            userId: activity.from.id,
            connectionName,
            code: activity.value.state,
          });

          delete this._exchangeState[key];
          this._emit('sign-in', { ...params, tokenResponse: token });
        } catch (err) {
          this._emit('error', err);
          return { status: StatusCodes.PRECONDITION_FAILED, body: err };
        }
      }

      return { status: 200, body: res };
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
}
