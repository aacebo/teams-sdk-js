import { AIMessageEntity } from './ai-message-entity';
import { ClientInfoEntity } from './client-info-entity';
import { MentionEntity } from './mention-entity';
import { MessageEntity } from './message-entity';

export type Entity = ClientInfoEntity | MentionEntity | MessageEntity | AIMessageEntity;

export * from './client-info-entity';
export * from './mention-entity';
export * from './message-entity';
export * from './ai-message-entity';
