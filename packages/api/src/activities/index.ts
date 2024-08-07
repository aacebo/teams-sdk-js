import { EventActivity } from './event';
import { InvokeActivity } from './invoke';
import { TraceActivity } from './trace';
import { TypingActivity } from './typing';
import { HandoffActivity } from './handoff';
import { ConversationActivity } from './conversation';
import { MessageActivity } from './message';
import { CommandActivity } from './command';
import { InvokeResponseActivity } from './invoke-response';

export type Activity<D = any> =
  | MessageActivity<D>
  | EventActivity<D>
  | InvokeActivity<D>
  | TraceActivity<D>
  | TypingActivity<D>
  | HandoffActivity<D>
  | ConversationActivity<D>
  | CommandActivity<D>
  | InvokeResponseActivity<any, D>;

export * from './message';
export * from './event';
export * from './invoke';
export * from './trace';
export * from './typing';
export * from './handoff';
export * from './conversation';
export * from './command';
export * from './invoke-response';
