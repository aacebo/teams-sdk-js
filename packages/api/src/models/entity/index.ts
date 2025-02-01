import { AIMessageEntity } from './ai-message-entity';
import { ClientInfoEntity } from './client-info-entity';
import { MentionEntity } from './mention-entity';
import { MessageEntity } from './message-entity';
import { StreamInfoEntity } from './stream-info-entity';

export type Entity =
  | ClientInfoEntity
  | MentionEntity
  | MessageEntity
  | AIMessageEntity
  | StreamInfoEntity;

export * from './client-info-entity';
export * from './mention-entity';
export * from './message-entity';
export * from './ai-message-entity';
export * from './stream-info-entity';
