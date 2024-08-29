import http from 'http';
import url from 'url';

import { Activity, InvokeResponse, Token } from '@teams.sdk/api';
import { ConsoleLogger, Logger } from '@teams.sdk/common/logging';
import { HttpRequest, StatusCodes } from '@teams.sdk/common/http';

import { Receiver, ReceiverActivityArgs, ReceiverEvents } from './receiver';

/**
 * Http Receiver Options
 */
export interface HttpReceiverOptions {
  /**
   * logger instance to use
   */
  readonly logger?: Logger;
}

/**
 * Http Receiver Activity Arguments
 */
export interface HttpReceiverActivityArgs extends ReceiverActivityArgs {
  /**
   * inbound http request
   */
  readonly req: HttpRequest;
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
      readonly req: HttpRequest;
    }
  ) => void | Promise<void>;
  response?: (
    args: HttpReceiverEventArgs & {
      readonly res: InvokeResponse;
      readonly elapse: number;
    }
  ) => void | Promise<void>;
  activity?: (args: HttpReceiverActivityArgs) => InvokeResponse | Promise<InvokeResponse>;
};

/**
 * Can receive activities via http
 */
export class HttpReceiver implements Receiver {
  readonly log: Logger;

  private readonly _server: http.Server;
  private readonly _events: HttpReceiverEvents = {};

  constructor(readonly options: HttpReceiverOptions) {
    this.log = this.options.logger?.child('receiver') || new ConsoleLogger('@teams.sdk/app/receiver');
    this._server = http.createServer();
    this.on('error', this.onError.bind(this));
  }

  /**
   * start listening
   * @param port port to listen on
   */
  async start(port = 3000) {
    return await new Promise<void>((resolve, reject) => {
      this._server.on('request', this.onIncomingRequest.bind(this));
      this._server.on('error', (err) => {
        reject(err);
      });

      this._server.listen(port, undefined, undefined, () => {
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
  protected onIncomingRequest(
    req: http.IncomingMessage,
    res: http.ServerResponse<http.IncomingMessage>
  ) {
    const start = Date.now();

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
        const response = await this.onRequest(
          new HttpRequest({
            method: req.method!,
            url: req.url!,
            headers: req.headers,
            body: JSON.parse(Buffer.concat(chunks).toString()),
          }),
          res
        );

        this.emit('response', {
          log: this.log,
          res: response,
          elapse: Date.now() - start,
        });

        res.statusCode = response?.status || 200;
        res.end(JSON.stringify(response?.body || null));
      });
    } catch (err) {
      res.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
      res.end('internal server error');
    }
  }

  /**
   * request handler called when an inbound http request is received
   * @param req the inbound http request
   * @param res the http response
   */
  protected async onRequest(req: HttpRequest, res: http.ServerResponse<http.IncomingMessage>) {
    this.emit('request', { log: this.log, req });
    const authorization = req.headers['authorization']?.replace('Bearer ', '');

    if (!authorization) {
      res.statusCode = StatusCodes.UNAUTHORIZED;
      res.end('unauthorized');
      return;
    }

    const token = new Token(authorization);
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
    this.log.error(err);
  }
}
