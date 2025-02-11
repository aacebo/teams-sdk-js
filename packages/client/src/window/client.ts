import * as uuid from 'uuid';
import { ConsoleLogger, EventEmitter, Logger } from '@teams.sdk/common';

import { MessageTypes, Path, PathValue } from './message-types';
import { ErrorMessageResponse, MessageRequest, MessageResponse } from './message';

type TMessageTypes = typeof MessageTypes;

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
  call<Name extends Path<TMessageTypes>>(
    name: Name,
    args: Parameters<PathValue<TMessageTypes, Name>['input']>
  ): Promise<ReturnType<PathValue<TMessageTypes, Name>['output']>> {
    const path = name.split('.');
    let messageType: Record<string, any> = MessageTypes;

    while (path.length) {
      const part = path.shift();

      if (!part) continue;

      messageType = messageType[part];

      if (!messageType) {
        throw new Error('invalid function name');
      }
    }

    this.log.info(messageType);
    const input: any[] = messageType.input(...(args || []));

    return new Promise((resolve, reject) => {
      const id = uuid.v4();
      const request: MessageRequest = {
        id: this.id++,
        uuidAsString: id,
        func: name,
        args: input,
        timestamp: Date.now(),
        monotonicTimestamp: performance?.now(),
      };

      this.requests[id] = request;
      this.log.debug(request);
      window.parent.postMessage(request, '*');

      const subId = this.events.once(`message.${id}`, (res) => {
        delete this.requests[id];
        const output = messageType.output(res.args);
        resolve(output);
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
