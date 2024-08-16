import { MentionEntity } from './mention-entity';
import { MessageEntity } from './message-entity';

export type Entity = MentionEntity | MessageEntity;

export * from './mention-entity';
export * from './message-entity';
