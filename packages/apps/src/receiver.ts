import { Activity, InvokeResponse, Token } from '@teams/api';

export interface ReceiverActivityArgs {
  readonly token: Token;
  readonly activity: Activity;
}

export interface Receiver {
  start(port?: number): Promise<void>;
  onActivity(cb: (args: ReceiverActivityArgs) => InvokeResponse | Promise<InvokeResponse>): void;
}
