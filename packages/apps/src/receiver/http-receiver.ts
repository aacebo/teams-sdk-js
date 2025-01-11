import http from 'node:http';
import path from 'node:path';

import io from 'socket.io';
import express from 'express';

import { Activity, Client, Credentials, JsonWebToken } from '@teams.sdk/api';
import { ConsoleLogger, Logger } from '@teams.sdk/common/logging';

import { AppResponse } from '../response';
import { Receiver, ReceiverActivityArgs, ReceiverEvents } from './receiver';

/**
 * Http Receiver Options
 */
export type HttpReceiverOptions = Credentials & {
  /**
   * logger instance to use
   */
  readonly logger?: Logger;

  /**
   * the api client
   */
  readonly api?: Client;

  /**
   * enable/disable devtools
   */
  readonly devtools?: boolean;
};

/**
 * Http Receiver Activity Arguments
 */
export interface HttpReceiverActivityArgs extends ReceiverActivityArgs {
  /**
   * inbound http request
   */
  readonly req: express.Request;
}

/**
 * Http Receiver Event Arguments
 */
export interface HttpReceiverEventArgs {
  /**
   * logger instance to use
   */
  readonly log: Logger;
}

export type HttpReceiverEvents = ReceiverEvents & {
  request?: (
    args: HttpReceiverEventArgs & {
      readonly req: express.Request;
    }
  ) => void | Promise<void>;
  response?: (
    args: HttpReceiverEventArgs & {
      readonly res: AppResponse;
      readonly elapse: number;
    }
  ) => void | Promise<void>;
  activity?: (args: HttpReceiverActivityArgs) => AppResponse | Promise<AppResponse>;
};

/**
 * Can receive activities via http
 */
export class HttpReceiver implements Receiver {
  readonly get: express.Application['get'];
  readonly post: express.Application['post'];
  readonly patch: express.Application['patch'];
  readonly put: express.Application['put'];
  readonly delete: express.Application['delete'];
  readonly route: express.Application['route'];
  readonly use: express.Application['use'];

  private readonly _log: Logger;
  private readonly _express: express.Application;
  private readonly _socket?: io.Server;
  private readonly _server: http.Server;
  private readonly _api?: Client;
  private readonly _events: HttpReceiverEvents = {};
  private readonly _sockets: Record<string, io.Socket> = { };

  constructor(protected options: HttpReceiverOptions) {
    this._log = options.logger?.child('receiver') || new ConsoleLogger('@teams.sdk/app/receiver');
    this._api = options.api;
    this._express = express();
    this._server = http.createServer(this._express);

    this.on('error', this.onError.bind(this));
    this.get = this._express.get.bind(this._server);
    this.post = this._express.post.bind(this._server);
    this.patch = this._express.patch.bind(this._server);
    this.put = this._express.put.bind(this._server);
    this.delete = this._express.delete.bind(this._server);
    this.route = this._express.route.bind(this._server);
    this.use = this._express.use.bind(this._server);

    if (options.devtools) {
      this._socket = new io.Server(this._server, { path: '/devtools/sockets' });
      this._socket.on('connection', this.onDevtools.bind(this));

      if (this._api) {
        this._api = new Client({
          ...this._api.options,
          interceptors: {
            request: [{
              onSuccess: (config) => {
                this.emitToSockets('request', {
                  type: 'outbound',
                  url: config.url,
                  method: config.method,
                  headers: config.headers,
                  body: config.data
                });

                return config;
              }
            }]
          }
        });
      }

      try {
        const dist = path.join(__dirname, '..', '..', 'devtools', 'dist');
        this._express.use('/devtools', express.static(dist));
        this._express.get('/devtools/*', (_, res) => {
          res.sendFile(path.join(dist, 'index.html'));
        });
      } catch (err) {
        this._log.warn('failed to load devtools, please ensure you have installed `@teams.sdk/devtools`');
        this._log.warn(err);
      }
    }
  }

  /**
   * start listening
   * @param port port to listen on
   */
  async start(port = 3000) {
    return await new Promise<void>((resolve, reject) => {
      this._express.use(express.json());
      this._express.post('/api/messages', this.onIncomingRequest.bind(this));
      this._express.on('error', (err) => {
        this.emit('error', err);
        reject(err);
      });

      this._server.listen(port, async () => {
        try {
          const bot = await this._api?.bots.token.get(this.options);
          const graph = await this._api?.bots.token.getGraph(this.options);

          this.emit('start', {
            tokens: {
              bot: bot && new JsonWebToken(bot.access_token),
              graph: graph && new JsonWebToken(graph.access_token),
            },
          });
        } catch (err) {
          this._log.error(err);
          throw err;
        }

        resolve();
      });
    });
  }

  /**
   * subscribe to an event
   * @param event event to subscribe to
   * @param cb callback to invoke
   */
  on<Event extends keyof ReceiverEvents>(event: Event, cb: HttpReceiverEvents[Event]) {
    this._events[event] = cb;
    return this;
  }

  /**
   * validates an incoming http request
   * @param req the incoming http request
   * @param res the http response
   */
  protected async onIncomingRequest(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const start = Date.now();

    try {
      const response = await this.onRequest(req, res);

      this.emit('response', {
        log: this._log,
        res: response,
        elapse: Date.now() - start,
      });

      this.emitToSockets('response', {
        ...response,
        type: 'inbound',
        elapse: Date.now() - start,
      });

      res.status(response?.status || 200).send(JSON.stringify(response?.body || null));
      return next();
    } catch (err) {
      this._log.error(err);
      res.status(500).send('internal server error');
      this.emitToSockets('error', err);
    }
  }

  /**
   * request handler called when an inbound http request is received
   * @param req the inbound http request
   * @param res the http response
   */
  protected async onRequest(req: express.Request, res: express.Response) {
    this.emit('request', { log: this._log, req });
    this.emitToSockets('request', {
      type: 'inbound',
      url: req.url,
      method: req.method,
      headers: req.headers,
      body: req.body
    });

    const authorization = req.headers.authorization?.replace('Bearer ', '');

    if (!authorization) {
      res.status(401).send('unauthorized');
      return;
    }

    const token = new JsonWebToken(authorization);
    const activity: Activity = req.body;
    const args: HttpReceiverActivityArgs = {
      req,
      token,
      activity,
    };

    const cb =
      this._events.activity ||
      (() => {
        return { status: 200, body: null };
      });

    return await cb(args);
  }

  protected emit<Event extends keyof HttpReceiverEvents>(event: Event, data?: any) {
    if (!this._events[event]) return;
    return this._events[event](data as never);
  }

  protected emitToSockets(event: string, data: any) {
    for (const id in this._sockets) {
      const socket = this._sockets[id];
      if (!socket || socket.disconnected) continue;
      socket.emit(event, data);
    }
  }

  protected onError(err: Error) {
    this._log.error(err);
  }

  protected onDevtools(socket: io.Socket) {
    this._sockets[socket.id] = socket;

    socket.on('disconnect', () => {
      delete this._sockets[socket.id];
    });
  }
}
