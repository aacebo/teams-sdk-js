import { EventActivity } from './event';
import { InvokeActivity } from './invoke';
import { TraceActivity } from './trace';
import { TypingActivity, TypingActivityBuilder } from './typing';
import { HandoffActivity } from './handoff';
import { ConversationActivity } from './conversation';
import { MessageActivity, MessageDeleteActivityBuilder, MessageReactionActivityBuilder, MessageSendActivityBuilder, MessageUpdateActivityBuilder } from './message';
import { CommandActivity } from './command';
import { InstallUpdateActivity } from './install-update';
import { ActivityBaseBuilder } from './base';

export type Activity =
  | MessageActivity
  | EventActivity
  | InvokeActivity
  | TraceActivity
  | TypingActivity
  | HandoffActivity
  | ConversationActivity
  | CommandActivity
  | InstallUpdateActivity;

export type ActivityBuilder = 
  | MessageDeleteActivityBuilder
  | MessageReactionActivityBuilder
  | MessageSendActivityBuilder
  | MessageUpdateActivityBuilder
  | TypingActivityBuilder;

/**
 * @hidden
 * @internal
 */
export function isActivityBuilder(value: any): value is ActivityBuilder {
  return value instanceof ActivityBaseBuilder;
}

export * from './message';
export * from './event';
export * from './invoke';
export * from './trace';
export * from './typing';
export * from './handoff';
export * from './conversation';
export * from './command';
export * from './install-update';
