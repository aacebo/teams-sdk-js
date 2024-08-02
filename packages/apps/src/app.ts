import http from 'http';
import url from 'url';

import { Client } from '@teams/api';
import { HttpClient, Request } from '@teams/common/http';
import { Logger, ConsoleLogger } from '@teams/common/logging';

import { Events } from './events';

export interface AppOptions {
  readonly http?: HttpClient;
  readonly logger?: Logger;
}

export class App {
  readonly api: Client;
  readonly log: Logger;

  private readonly _server: http.Server;
  private readonly _events: Events = {};

  constructor(readonly options?: AppOptions) {
    this.api = new Client({ http: this.options?.http });
    this.log = this.options?.logger || new ConsoleLogger({ name: '@teams/app' });
    this._server = http.createServer();
  }

  start(port = 3000) {
    return new Promise<void>((resolve) => {
      this._server.addListener('request', this._on_incoming_request.bind(this));
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
    if (req.method !== 'POST' || !req.url) {
      res.statusCode = 404;
      return res.end('not found');
    }

    const uri = url.parse(req.url, true);

    if (uri.path !== '/api/messages') {
      res.statusCode = 404;
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
          {
            method: req.method!,
            url: req.url!,
            headers: req.headers,
            body,
          },
          res
        );
      });
    } catch (err) {
      res.statusCode = 500;
      res.end('internal server error');
      this.log.error(err);
    }
  }

  private _on_request(req: Request, _res: http.ServerResponse<http.IncomingMessage>) {
    if (this._events.activity) {
      this._events.activity(req.body);
    }
  }
}
