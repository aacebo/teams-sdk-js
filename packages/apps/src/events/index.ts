import { Activity } from '@teams.sdk/api';

import { Context, MentionContext, SignInContext } from '../context';
import { ActivityEvents } from './activity';
import { InvokeActivityEvents } from './invoke';
import { InstallActivityEvents } from './install';
import { ConversationUpdateActivityEvents } from './conversation-update';
import { MessageUpdateActivityEvents } from './message-update';
import { MessageDeleteActivityEvents } from './message-delete';

export type Prefixed<T, P extends string | undefined = undefined> = {
  [K in Extract<keyof T, string> as P extends string ? `${P}${K}` : K]?: T[K];
};

export type Suffixed<T, S extends string | undefined = undefined> = {
  [K in Extract<keyof T, string> as S extends string ? `${K}${S}` : K]?: T[K];
};

type EventHandler<In = any, Out = void> = (value: In) => Out | Promise<Out>;

export interface Events
  extends ActivityEvents,
    InvokeActivityEvents,
    InstallActivityEvents,
    ConversationUpdateActivityEvents,
    MessageUpdateActivityEvents,
    MessageDeleteActivityEvents {
  error?: EventHandler<Error>;
  start?: EventHandler<void>;
  signin?: EventHandler<SignInContext>;
  mention?: EventHandler<MentionContext>;
  activity?: EventHandler<Context<Activity>>;
}

export * from './activity';
export * from './install';
export * from './invoke';
export * from './conversation-update';
export * from './message-update';
export * from './message-delete';
