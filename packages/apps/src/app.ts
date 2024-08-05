import http from 'http';
import url from 'url';

import { Client, Activity, Token, Credentials } from '@teams/api';
import { DefaultHttpClient, HttpClient, HttpRequest, StatusCodes } from '@teams/common/http';
import { Logger, ConsoleLogger } from '@teams/common/logging';

import pkg from '../package.json';

import { Events } from './events';

export type AppOptions = Credentials & {
  readonly http?: HttpClient;
  readonly logger?: Logger;
};

export class App {
  readonly api: Client;
  readonly http: HttpClient;
  readonly log: Logger;

  private readonly _server: http.Server;
  private readonly _events: Events = {
    error: this._on_error.bind(this),
  };

  constructor(readonly options: AppOptions) {
    this.http = this.options.http || new DefaultHttpClient();
    this.http.headers.add('user-agent', `teams[apps]/${pkg.version}`);
    this.api = new Client({ http: this.http });
    this.log = this.options.logger || new ConsoleLogger({ name: '@teams/app' });
    this._server = http.createServer();
  }

  async start(port = 3000) {
    const res = await this.api.bots.token.get(this.options);
    this.http.headers.set('Authorization', `Bearer ${res.access_token}`);
    this._emit('auth', res.access_token);

    return new Promise<void>((resolve, reject) => {
      this._server.on('request', this._on_incoming_request.bind(this));
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

  private _on_incoming_request(
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
      let body: any;
      const chunks: any[] = [];

      req.on('data', (chunk) => {
        chunks.push(chunk);
      });

      req.on('end', () => {
        body = JSON.parse(Buffer.concat(chunks).toString());
        this._on_request(
          new HttpRequest({
            method: req.method!,
            url: req.url!,
            headers: req.headers,
            body,
          }),
          res
        );
      });
    } catch (err) {
      res.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
      res.end('internal server error');
      this.log.error(err);
    }
  }

  private _on_request(req: HttpRequest, res: http.ServerResponse<http.IncomingMessage>) {
    const authorization = req.headers['authorization']?.replace('Bearer ', '');

    if (!authorization) {
      res.statusCode = StatusCodes.UNAUTHORIZED;
      return res.end('unauthorized');
    }

    const token = new Token(authorization);
    const activity: Activity = req.body;
    activity.callerId = token.appId;

    this._emit('activity', activity);
    this._emit(`activity.${activity.type}`, activity);
  }

  private _emit<Event extends keyof Events>(event: Event, data?: any) {
    if (!this._events[event]) return;
    this._events[event](data as never);
  }

  private _on_error(err: Error) {
    this.log.error(err);
  }
}
