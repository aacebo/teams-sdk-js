import http from 'http';
import url from 'url';

import { Client, Activity } from '@teams/api';
import { DefaultHttpClient, HttpClient, HttpRequest, StatusCodes } from '@teams/common/http';
import { Logger, ConsoleLogger } from '@teams/common/logging';

import pkg from '../package.json';

import { Events } from './events';

export interface AppOptions {
  readonly http?: HttpClient;
  readonly logger?: Logger;
}

export class App {
  readonly api: Client;
  readonly log: Logger;

  private readonly _server: http.Server;
  private readonly _events: Events = {
    error: this._on_error.bind(this),
  };

  constructor(readonly options?: AppOptions) {
    const client = this.options?.http || new DefaultHttpClient();
    client.headers.add('user-agent', `teams[apps]/${pkg.version}`);
    this.api = new Client({ http: client });
    this.log = this.options?.logger || new ConsoleLogger({ name: '@teams/app' });
    this._server = http.createServer();
  }

  start(port = 3000) {
    return new Promise<void>((resolve, reject) => {
      this._server.on('request', this._on_incoming_request.bind(this));
      this._server.on('error', (err) => {
        this._emit('error', err);
        reject(err);
      });

      this._server.listen(port, undefined, undefined, () => {
        this.log.info('listening 🚀');
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

    const activity: Activity = req.body;
    this._emit('activity', activity);
    this._emit(`activity.${activity.type}`, activity);
  }

  private _emit<Event extends keyof Events>(event: Event, data?: any) {
    if (!this._events[event]) return;
    this._events[event](data);
  }

  private _on_error(err: Error) {
    this.log.error(err);
  }
}
