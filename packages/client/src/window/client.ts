import * as uuid from 'uuid';
import { ConsoleLogger, EventEmitter, Logger } from '@teams.sdk/common';

import { Methods } from './methods';
import { ErrorMessageResponse, MessageRequest, MessageResponse } from './message';

/**
 * the window client used to execute
 * functions and receive events from the
 * parent window
 */
export class Client {
  /**
   * requests that are waiting
   * for a response
   */
  get pending() {
    return Object.values(this.requests);
  }

  protected id: number;
  protected log: Logger;
  protected events: EventEmitter<Record<string, MessageResponse | ErrorMessageResponse>>;
  protected requests: Record<string, MessageRequest> = {};

  constructor(logger?: Logger) {
    this.id = 0;
    this.log = logger?.child('window') || new ConsoleLogger('@teams.sdk/client/window');
    this.events = new EventEmitter();
    window.addEventListener('message', this.onMessage.bind(this));
  }

  /**
   * call a function in the parent window
   * @param name the function to call
   * @param args the functions arguments
   */
  call<Name extends keyof Methods>(
    name: Name,
    args?: Methods[Name]['in']
  ): Promise<Methods[Name]['out']> {
    return new Promise<Methods[Name]['out']>((resolve, reject) => {
      const id = uuid.v4();
      const request: MessageRequest = {
        id: this.id++,
        uuidAsString: id,
        func: name,
        args: args || [],
        timestamp: Date.now(),
        monotonicTimestamp: performance?.now(),
      };

      this.requests[id] = request;
      this.log.debug(request);
      window.parent.postMessage(request, '*');

      const subId = this.events.once(`message.${id}`, (res) => {
        delete this.requests[id];

        if (res.args.length) {
          const error = res.args.find((arg) => !!arg['errorCode']);

          if (error) {
            this.log.error(error);
            return reject(error);
          }
        }

        resolve(res.args as Methods[Name]['out']);
      });

      setTimeout(() => {
        this.events.off(subId);
        reject('response timeout');
      }, 60000);
    });
  }

  protected onMessage(e: MessageEvent) {
    const res: MessageResponse | ErrorMessageResponse = e.data;
    this.log.debug(res);

    if (res.args.length) {
      if (res.args.length === 2 && res.args[0] === false && typeof res.args[1] === 'string') {
        res.args = [{ errorCode: 500, message: res.args[1] }];
      }

      if (res.args.length === 2 && res.args[0] === false && typeof res.args[1] === 'object') {
        res.args = [res.args[1]];
      }
    }

    this.events.emit(`message.${res.uuidAsString}`, res);
  }
}
