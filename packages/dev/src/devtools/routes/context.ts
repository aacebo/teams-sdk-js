import { Activity, InvokeResponse, Token } from '@teams.sdk/api';
import { Logger } from '@teams.sdk/common/logging';

export interface RouteContext {
  readonly port: number;
  readonly log: Logger;
  readonly process: (token: Token, activity: Activity) => Promise<InvokeResponse>;
}
