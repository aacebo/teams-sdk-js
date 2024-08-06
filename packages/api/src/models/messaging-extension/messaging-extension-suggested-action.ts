import { CardAction } from '../card-action';

/**
 * @interface
 * An interface representing MessagingExtensionSuggestedAction.
 * Messaging extension Actions (Only when type is auth or config)
 *
 */
export interface MessagingExtensionSuggestedAction {
  /**
   * @member {CardAction[]} [actions] Actions
   */
  actions?: CardAction[];
}
