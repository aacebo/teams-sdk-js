import { Activity, InvokeResponse, Token } from '@teams/api';

export interface ReceiverActivityArgs {
  readonly token: Token;
  readonly activity: Activity;
}

export interface ReceiverEvents {
  error?: (err: Error) => void | Promise<void>;
  activity?: (args: ReceiverActivityArgs) => InvokeResponse | Promise<InvokeResponse>;
}

export interface Receiver {
  start(port?: number): Promise<void>;
  on<Event extends keyof ReceiverEvents>(event: Event, cb: ReceiverEvents[Event]): this;
}
