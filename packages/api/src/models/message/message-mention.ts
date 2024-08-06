import { MessageFrom } from './message-from';

/**
 * @interface
 * An interface representing MessageActionsPayloadMention.
 * Represents the entity that was mentioned in the message.
 *
 */
export interface MessageMention {
  /**
   * @member {number} [id] The id of the mentioned entity.
   */
  id: number;

  /**
   * @member {string} [mentionText] The plaintext display name of the mentioned
   * entity.
   */
  mentionText?: string;

  /**
   * @member {MessageActionsPayloadFrom} [mentioned] Provides more details on
   * the mentioned entity.
   */
  mentioned?: MessageFrom;
}
