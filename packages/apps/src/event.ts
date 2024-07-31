import { Account, ConversationAccount } from '@teams/schema';

import { Entity } from './entity';

export type EventType =
  'message' |
  'event' |
  'typing' |
  'suggestion' |
  'trace' |
  'handoff' |
  'command' |
  'commandResult' |
  'invoke' |
  'invokeResponse' |
  'contactRelationUpdate' |
  'conversationUpdate' |
  'endOfConversation' |
  'deleteUserData' |
  'messageUpdate' |
  'messageDelete' |
  'messageReaction' |
  'installationUpdate';

export interface Event<D = any> {
  readonly id: string;
  readonly type: EventType;
  readonly channelId: string;
  readonly replyToId?: string;
  readonly serviceUrl: string;
  readonly from: Account;
  readonly recipient: Account;
  readonly conversation: ConversationAccount;
  readonly channelData?: D;
  readonly entities?: Entity[];
  readonly timestamp?: Date;
  readonly localTimestamp?: Date;
}
