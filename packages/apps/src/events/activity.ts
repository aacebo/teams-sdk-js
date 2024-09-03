import { Activity } from '@teams.sdk/api';

import { Context } from '../context';
import { EventHandler } from '../types';

export type ActivityEvents = {
  [K in Activity['type']]?: EventHandler<Context<Extract<Activity, { type: K }>>>;
};
