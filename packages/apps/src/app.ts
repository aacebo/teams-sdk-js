import http from 'http';
import url from 'url';

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
import { HttpClientOptions, HttpRequest, StatusCodes } from '@teams/common/http';
import { Logger, ConsoleLogger } from '@teams/common/logging';

import pkg from '../package.json';

import { ActivityEventArgs, Events } from './events';

export type AppOptions = Credentials & {
  readonly http?: HttpClientOptions;
  readonly logger?: Logger;
};

export class App {
  readonly log: Logger;

  get token() {
    return this._token;
  }
  private _token?: Token;

  private readonly _api: Client;
  private readonly _server: http.Server;
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

    this._server = http.createServer();
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
      this._server.on('request', this._onIncomingRequest.bind(this));
      this._server.on('error', (err) => {
        this._emit('error', err);
        reject(err);
      });

      this._server.listen(port, undefined, undefined, () => {
        this.log.info('listening 🚀');
        this._emit('start');
        resolve();
      });
    });
  }

  on<Event extends keyof Events>(event: Event, cb: Events[Event]) {
    this._events[event] = cb;
  }

  private _onIncomingRequest(
    req: http.IncomingMessage,
    res: http.ServerResponse<http.IncomingMessage>
  ) {
    if (req.method !== 'POST') {
      res.statusCode = StatusCodes.METHOD_NOT_ALLOWED;
      return res.end();
    }

    if (!req.url) {
      res.statusCode = StatusCodes.NOT_FOUND;
      return res.end('not found');
    }

    const uri = url.parse(req.url, true);

    if (uri.path !== '/api/messages') {
      res.statusCode = StatusCodes.NOT_FOUND;
      return res.end('not found');
    }

    try {
      const chunks: any[] = [];

      req.on('data', (chunk) => {
        chunks.push(chunk);
      });

      req.on('end', async () => {
        const response = await this._onRequest(
          new HttpRequest({
            method: req.method!,
            url: req.url!,
            headers: req.headers,
            body: JSON.parse(Buffer.concat(chunks).toString()),
          }),
          res
        );

        res.statusCode = response?.status || 200;
        res.end(JSON.stringify(response?.body || null));
      });
    } catch (err) {
      res.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
      res.end('internal server error');
      this._emit('error', err);
    }
  }

  private _onRequest(req: HttpRequest, res: http.ServerResponse<http.IncomingMessage>) {
    const authorization = req.headers['authorization']?.replace('Bearer ', '');

    if (!authorization) {
      res.statusCode = StatusCodes.UNAUTHORIZED;
      res.end('unauthorized');
      return;
    }

    const token = new Token(authorization);
    const log = this.log;
    const activity: Activity = req.body;
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

    return this._onActivity({ activity, conversation, req, api, token, log, say, reply, signin });
  }

  private async _onActivity(args: ActivityEventArgs<Activity>) {
    const { activity, api, say } = args;

    this.log.debug(
      `activity/${activity.type}${activity.type === 'invoke' ? `/${activity.name}` : ''}`
    );

    if (activity.type === 'message') {
      await say({ type: 'typing' });
    }

    this._emit('activity', args);
    this._emit(`activity.${activity.type}`, args);

    if (activity.type === 'invoke') {
      const key = `${activity.conversation.id}/${activity.from.id}`;
      const res = this._emit(`activity.${activity.type}[${activity.name}]`, args);

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

          this._emit('sign-in', { ...args, tokenResponse: token });
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
          this._emit('sign-in', { ...args, tokenResponse: token });
        } catch (err) {
          this._emit('error', err);
          return { status: StatusCodes.PRECONDITION_FAILED };
        }
      }

      return { status: 200, body: res };
    }
  }

  private _emit<Event extends keyof Events>(event: Event, data?: any) {
    if (!this._events[event]) return;
    return this._events[event](data as never);
  }

  private _onError(err: Error) {
    this.log.error(err);
  }
}
