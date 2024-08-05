import { Activity, Client, Token } from '@teams/api';
import { HttpRequest } from '@teams/common/http';
import { Logger } from '@teams/common/logging';

type Prefixed<T, P extends string | undefined = undefined> = {
  [K in Extract<keyof T, string> as P extends string ? `${P}${K}` : K]?: T[K];
};

type EventHandler<T = any> = (value: T) => void | Promise<void>;

export interface ActivityEventArgs {
  readonly req: HttpRequest;
  readonly log: Logger;
  readonly api: Client;
  readonly token: Token;
}

export interface Events extends ActivityEvents {
  error?: EventHandler<Error>;
  auth?: EventHandler<string>;
  start?: EventHandler<void>;
  activity?: EventHandler<
    ActivityEventArgs & {
      readonly activity: Activity;
    }
  >;
}

export type ActivityEvents = Prefixed<
  {
    [K in Activity['type']]?: EventHandler<
      ActivityEventArgs & {
        readonly activity: Extract<Activity, { type: K }>;
      }
    >;
  },
  'activity.'
>;
