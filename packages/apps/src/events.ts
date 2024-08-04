import { Activity } from '@teams/api';

type Prefixed<T, P extends string | undefined = undefined> = {
  [K in Extract<keyof T, string> as P extends string ? `${P}${K}` : K]?: T[K];
};

type EventHandler<T = any> = (value: T) => void | Promise<void>;

export interface Events extends ActivityEvents {
  error?: EventHandler<Error>;
  activity?: EventHandler<Activity>;
}

export type ActivityEvents = Prefixed<
  {
    [K in Activity['type']]?: EventHandler<Extract<Activity, { type: K }>>;
  },
  'activity.'
>;
