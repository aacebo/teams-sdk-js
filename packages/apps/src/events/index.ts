import { Activity } from '@teams.sdk/api';

import { Context, MentionContext, SignInContext } from '../context';
import { EventHandler } from '../types';

import { ActivityEvents } from './activity';
import { InvokeActivityEvents } from './invoke';
import { InstallActivityEvents } from './install';
import { ConversationUpdateActivityEvents } from './conversation-update';
import { MessageUpdateActivityEvents } from './message-update';
import { MessageDeleteActivityEvents } from './message-delete';
import { EventActivityEvents } from './event';

export interface Events
  extends ActivityEvents,
    InvokeActivityEvents,
    InstallActivityEvents,
    ConversationUpdateActivityEvents,
    MessageUpdateActivityEvents,
    MessageDeleteActivityEvents,
    EventActivityEvents {
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
export * from './event';
