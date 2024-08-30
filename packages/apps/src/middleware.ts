import { Activity } from '@teams.sdk/api';

import { Context } from './context';
import { AppResponse } from './response';

export type Middleware = (
  ctx: Context<Activity>
) => (AppResponse | void | undefined) | Promise<AppResponse | void | undefined>;

export interface AppMiddleware {
  readonly before: Middleware[];
  readonly after: Middleware[];
}
