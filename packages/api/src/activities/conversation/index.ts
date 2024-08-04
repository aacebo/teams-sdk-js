import { ConversationUpdateActivity } from './conversation-update';
import { EndOfConversationActivity } from './end-of-conversation';

export type ConversationActivity<D = any> =
  | ConversationUpdateActivity<D>
  | EndOfConversationActivity<D>;

export * from './conversation-update';
export * from './end-of-conversation';
