export type MessageReactionType =
  'like' |
  'plusOne';

export interface MessageReaction {
  /**
   * Message reaction type. Possible values include: 'like', 'plusOne'
   */
  type: MessageReactionType;
}
