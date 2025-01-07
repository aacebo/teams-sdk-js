import { Activity, Token } from '@teams.sdk/api';

import { AppResponse } from '../response';

export interface ReceiverActivityArgs {
  /**
   * inbound request token
   */
  readonly token: Token;

  /**
   * inbound request activity payload
   */
  readonly activity: Activity;

  /**
   * other
   */
  [key: string]: any;
}

export interface ReceiverStartArgs {
  /**
   * the bots tokens
   */
  readonly tokens: {
    /**
     * the token to use with botframework
     */
    readonly bot?: Token;

    /**
     * the token to use with graph
     */
    readonly graph?: Token;
  };
}

export interface ReceiverEvents {
  start?: (args: ReceiverStartArgs) => void | Promise<void>;
  error?: (err: Error) => void | Promise<void>;
  activity?: (args: ReceiverActivityArgs) => AppResponse | Promise<AppResponse>;
}

/**
 * anything that can receive and subscribe to activities
 */
export interface Receiver {
  /**
   * start listening for activities
   * @param port the port to listen on
   */
  start(port?: number): Promise<void>;

  /**
   * subscribe to an event
   * @param event the event to subscribe to
   * @param cb the callback to invoke
   */
  on<Event extends keyof ReceiverEvents>(event: Event, cb: ReceiverEvents[Event]): this;
}
