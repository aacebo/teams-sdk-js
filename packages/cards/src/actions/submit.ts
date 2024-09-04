import { AssociatedInputs } from '../common';

import { BaseAction } from './base';

/**
 * Gathers input fields, merges with optional data field, and sends an event to the client. It is up to the client to determine how this data is processed. For example: With BotFramework bots, the client would send an activity through the messaging medium to the bot. The inputs that are gathered are those on the current card, and in the case of a show card those on any parent cards. See https://docs.microsoft.com/en-us/adaptive-cards/authoring-cards/input-validation for more details.
 */
export interface SubmitAction extends BaseAction {
  type: 'Action.Submit';

  /**
   * Controls which inputs are associated with the action.
   */
  associatedInputs?: AssociatedInputs;

  /**
   * Initial data that input fields will be combined with. These are essentially ‘hidden’ properties.
   */
  data?:
    | string
    | {
        msteams?:
          | MessageBackActionData
          | IMBackActionData
          | SignInActionData
          | TaskFetchActionData
          | InvokeActionData;

        [key: string]: any;
      };
}

export interface MessageBackActionData {
  type: 'messageBack';

  /**
   * Sent to your bot when the action is performed.
   */
  text: string;

  /**
   * Used by the user in the chat stream when the action is performed.
   * This text isn't sent to your bot.
   */
  displayText?: string;

  /**
   * Sent to your bot when the action is performed. You can encode context
   * for the action, such as unique identifiers or a `JSON` object.
   */
  value: string;
}

export interface IMBackActionData {
  type: 'imBack';

  /**
   * String that needs to be echoed back in the chat.
   */
  value: string;
}

export interface SignInActionData {
  type: 'signin';

  /**
   * Set to the `URL` where you want to redirect.
   */
  value: string;
}

export interface TaskFetchActionData {
  type: 'task/fetch';

  /**
   * The data value sent with the `task/fetch` invoke.
   */
  data?: any;
}

export interface InvokeActionData {
  type: 'invoke';

  /**
   * Set the value to send with the invoke
   */
  value?: any;
}
