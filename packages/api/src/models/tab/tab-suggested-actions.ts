import { CardAction } from '../card-action';

/**
 * @interface
 * Tab SuggestedActions (Only when type is 'auth' or 'silentAuth').
 *
 */
export interface TabSuggestedActions {
  /**
   * @member {CardAction[]} [actions] Actions to show in the card response.
   */
  actions: CardAction[];
}
