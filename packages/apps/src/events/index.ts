import { Activity } from '@teams.sdk/api';

import { Context, MentionContext, SignInContext } from '../context';
import { ActivityEvents } from './activity';
import { InvokeActivityEvents } from './invoke-activity';
import { InstallActivityEvents } from './install-activity';

export type Prefixed<T, P extends string | undefined = undefined> = {
  [K in Extract<keyof T, string> as P extends string ? `${P}${K}` : K]?: T[K];
};

export type Suffixed<T, S extends string | undefined = undefined> = {
  [K in Extract<keyof T, string> as S extends string ? `${K}${S}` : K]?: T[K];
};

type EventHandler<In = any, Out = void> = (value: In) => Out | Promise<Out>;

export interface Events extends ActivityEvents, InvokeActivityEvents, InstallActivityEvents {
  error?: EventHandler<Error>;
  start?: EventHandler<void>;
  signin?: EventHandler<SignInContext>;
  mention?: EventHandler<MentionContext>;
  activity?: EventHandler<Context<Activity>>;
}

export * from './activity';
export * from './install-activity';
export * from './invoke-activity';
