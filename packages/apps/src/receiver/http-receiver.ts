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

  private readonly _log: Logger;
  private readonly _server: express.Application;
  private readonly _api?: Client;
  private readonly _events: HttpReceiverEvents = {};

  constructor(protected options: HttpReceiverOptions) {
    this._log = options.logger?.child('receiver') || new ConsoleLogger('@teams.sdk/app/receiver');
    this._api = options.api;
    this._server = express().use(express.json());
    this.on('error', this.onError.bind(this));
    this.get = this._server.get;
    this.post = this._server.post;
    this.patch = this._server.patch;
    this.put = this._server.put;
    this.delete = this._server.delete;
    this.route = this._server.route;
  }

  /**
   * start listening
   * @param port port to listen on
   */
  async start(port = 3000) {
    return await new Promise<void>((resolve, reject) => {
      this._server.post('/api/messages', this.onIncomingRequest.bind(this));
      this._server.on('error', (err) => {
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

      res.status(response?.status || 200).send(JSON.stringify(response?.body || null));
      return next();
    } catch (err) {
      this._log.error(err);
      res.status(500).send('internal server error');
    }
  }

  /**
   * request handler called when an inbound http request is received
   * @param req the inbound http request
   * @param res the http response
   */
  protected async onRequest(req: express.Request, res: express.Response) {
    this.emit('request', { log: this._log, req });
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

  protected onError(err: Error) {
    this._log.error(err);
  }
}
