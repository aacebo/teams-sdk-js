import * as uuid from 'uuid';
import { EventEmitter } from '@teams.sdk/common';

import { Methods } from './methods';
import { MessageRequest, MessageResponse } from './message';

export class Client {
  /**
   * requests that are waiting
   * for a response
   */
  get pending() {
    return Object.values(this.requests);
  }

  protected id: number;
  protected events: EventEmitter<Record<string, MessageResponse>>;
  protected requests: Record<string, MessageRequest> = { };

  constructor() {
    this.id = 0;
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
        id: ++this.id,
        uuidAsString: id,
        func: name,
        args,
        timestamp: Date.now(),
        monotonicTimestamp: performance?.now(),
        apiVersionTag: `v2_${name}`
      };

      this.requests[id] = request;
      window.parent.postMessage(request, '*');

      const subId = this.events.once(`message.${id}`, (res) => {
        delete this.requests[id];
        resolve(res.args as Methods[Name]['out']);
      });

      setTimeout(() => {
        this.events.off(subId);
        reject('response timeout');
      }, 10000);
    });
  }

  protected onMessage(e: MessageEvent) {
    const message: MessageResponse = e.data;
    console.log(message);
    this.events.emit(`message.${message.uuidAsString}`, message);
  }
}
