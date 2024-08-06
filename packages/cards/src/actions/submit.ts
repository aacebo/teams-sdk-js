import { AssociatedInputs } from '../common';

import { BaseAction } from './base';

/**
 * Gathers input fields, merges with optional data field, and sends an event to the client. It is up to the client to determine how this data is processed. For example: With BotFramework bots, the client would send an activity through the messaging medium to the bot. The inputs that are gathered are those on the current card, and in the case of a show card those on any parent cards. See https://docs.microsoft.com/en-us/adaptive-cards/authoring-cards/input-validation for more details.
 */
export interface SubmitAction extends BaseAction {
  type: 'Action.Submit';

  /**
   * Initial data that input fields will be combined with. These are essentially ‘hidden’ properties.
   */
  data?: string | Record<string, any>;

  /**
   * Controls which inputs are associated with the action.
   */
  associatedInputs?: AssociatedInputs;
}
