import { Activity } from '@teams.sdk/api';

import { RouteHandler } from '../types';
import { Context } from '../context';

export type ActivityRoutes = {
  [K in Activity['type']]?: RouteHandler<Context<Extract<Activity, { type: K }>>>;
};
