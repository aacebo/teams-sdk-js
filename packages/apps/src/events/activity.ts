import { Activity } from '@teams.sdk/api';

import { Context } from '../context';

type EventHandler<In = any, Out = void> = (value: In) => Out | Promise<Out>;

export type ActivityEvents = {
  [K in Activity['type']]?: EventHandler<Context<Extract<Activity, { type: K }>>>;
};
