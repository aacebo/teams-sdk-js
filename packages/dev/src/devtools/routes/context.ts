import { InvokeResponse } from '@teams.sdk/api';
import { ProcessActivityArgs } from '@teams.sdk/apps';
import { Logger } from '@teams.sdk/common/logging';

export interface RouteContext {
  readonly port: number;
  readonly log: Logger;
  readonly process: (args: ProcessActivityArgs) => Promise<InvokeResponse>;
}
