import http from 'node:http';
import readline from 'node:readline';

import { HttpServer, NextFunction, Request } from '@teams.sdk/common/http';
import { ConsoleLogger, Logger } from '@teams.sdk/common/logging';
import { Receiver, ReceiverEvents } from '@teams.sdk/apps';
import { MessageSendActivity, Token } from '@teams.sdk/api';

/**
 * Console Receiver Options
 */
export interface ConsoleReceiverOptions {
  /**
   * logger instance to use
   */
  readonly logger?: Logger;

  /**
   * input stream
   * defaults to `process.stdin`
   */
  readonly stream?: NodeJS.ReadableStream;
}

/**
 * Can receive activities via the console
 */
export class ConsoleReceiver implements Receiver {
  private readonly _log: Logger;
  private readonly _events: ReceiverEvents = {};
  private readonly _reader: readline.Interface;
  private readonly _server: HttpServer;

  constructor(protected options: ConsoleReceiverOptions) {
    this._log = options.logger?.child('receiver') || new ConsoleLogger('@teams.sdk/app/receiver');
    this._server = new HttpServer();
    this._reader = readline.createInterface({
      input: this.options.stream || process.stdin,
      terminal: false,
    });

    this._server.get('/auth/redirect', this.onAuthRedirect.bind(this));
  }

  async start(port?: number) {
    this._server.listen(port, undefined, undefined, () => {
      this.emit('start', { tokens: {} });
      this._reader.on('line', async (text) => {
        const activity: MessageSendActivity = {
          id: '1',
          type: 'message',
          text,
          callerId: '',
          serviceUrl: '',
          channelId: 'msteams',
          conversation: {
            id: '1',
            conversationType: 'oneOnOne',
            isGroup: false,
            name: '',
            role: 'bot',
          },
          from: {
            id: '1',
            name: 'user',
            role: 'user',
          },
          recipient: {
            id: '2',
            name: 'bot',
            role: 'bot',
          },
        };

        const token: Token = {
          appId: '1',
          from: 'azure',
          fromId: 'azure',
          serviceUrl: '',
        };

        const cb =
          this._events.activity ||
          (() => {
            return { status: 200, body: null };
          });

        try {
          const res = await cb({ token, activity });

          if (res.body) {
            this._log.debug(res);
          }
        } catch (err) {
          this._log.error(err);
          this.emit('error', err);
        }
      });
    });
  }

  on<Event extends keyof ReceiverEvents>(event: Event, cb: ReceiverEvents[Event]) {
    this._events[event] = cb;
    return this;
  }

  protected onAuthRedirect(req: Request, res: http.ServerResponse, _next: NextFunction) {
    console.log(req.url);
    console.log(req.query);
    res.statusCode = 200;
    res.end();
  }

  protected emit<Event extends keyof ReceiverEvents>(event: Event, data?: any) {
    if (!this._events[event]) return;
    return this._events[event](data as never);
  }
}
