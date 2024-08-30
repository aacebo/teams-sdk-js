import { Activity, InvokeResponse, Token } from '@teams.sdk/api';

export interface ReceiverActivityArgs {
  /**
   * inbound request token
   */
  readonly token: Token;

  /**
   * inbound request activity payload
   */
  readonly activity: Activity;
}

export interface ReceiverEvents {
  error?: (err: Error) => void | Promise<void>;
  activity?: (args: ReceiverActivityArgs) => InvokeResponse | Promise<InvokeResponse>;
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
