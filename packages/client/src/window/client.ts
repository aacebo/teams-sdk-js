import * as uuid from 'uuid';
import { ConsoleLogger, EventEmitter, Logger } from '@teams.sdk/common';

import { Methods } from './methods';
import { MessageRequest, MessageResponse } from './message';

export interface ClientError<T extends Error = Error> {
  readonly errorCode: number;
  readonly message: T;
}

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
  protected events: EventEmitter<Record<string, MessageResponse>>;
  protected requests: Record<string, MessageRequest> = {};

  constructor(logger?: Logger) {
    this.id = 0;
    this.log = logger?.child('window') || new ConsoleLogger('@teams.sdk/client/window');
    this.events = new EventEmitter();
    window.addEventListener('message', this.onMessage.bind(this));
  }

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

        if (res.args && res.args[0]['errorCode']) {
          this.log.error(res);
          return reject(res.args[0].message);
        }

        this.log.debug(res);
        resolve(res.args as Methods[Name]['out']);
      });

      setTimeout(() => {
        this.events.off(subId);
        reject('response timeout');
      }, 20000);
    });
  }

  protected onMessage(e: MessageEvent) {
    const message: MessageResponse = e.data;
    this.events.emit(`message.${message.uuidAsString}`, message);
  }
}
