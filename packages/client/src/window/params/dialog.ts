import { DialogSize } from '../types/dialog';

/**
 * Shared Dialog Properties
 */
interface BaseDialogParams {
  /**
   * Title of the dialog module.
   */
  title?: string;

  /**
   * The requested size of the dialog
   */
  size: DialogSize;
}

/**
 * Data structure to describe dialog information needed to open an Adaptive Card-based dialog.
 */
export interface AdaptiveCardDialogParams extends BaseDialogParams {
  /**
   * JSON defining an Adaptive Card.
   */
  card: string;
}

/**
 * Data structure to describe dialog information needed to open a bot-based Adaptive Card-based dialog.
 */
export interface BotAdaptiveCardDialogParams extends AdaptiveCardDialogParams {
  /**
   * Specifies a bot ID to send the result of the user's interaction with the dialog module.
   * The bot will receive a task/complete invoke event with a JSON object
   * in the event payload.
   */
  completionBotId: string;
}

/**
 * Data structure to describe dialog information needed to open a url-based dialog.
 */
export interface UrlDialogParams extends BaseDialogParams {
  /**
   * The url to be rendered in the webview/iframe.
   *
   * @remarks
   * The domain of the url must match at least one of the
   * valid domains specified in the [validDomains block](https://learn.microsoft.com/microsoftteams/platform/resources/schema/manifest-schema#validdomains) of the app manifest
   */
  url: string;

  /**
   * If client doesnt support the URL, the URL that needs to be opened in the browser.
   */
  fallbackUrl?: string;
}

/**
 * Data structure to describe dialog information needed to open a bot based dialog.
 */
export interface BotUrlDialogParams extends UrlDialogParams {
  /**
   * Specifies a bot ID to send the result of the user's interaction with the task module.
   * The bot will receive a task/complete invoke event with a JSON object
   * in the event payload.
   */
  completionBotId: string;
}

export type DialogParams =
  | AdaptiveCardDialogParams
  | BotAdaptiveCardDialogParams
  | UrlDialogParams
  | BotUrlDialogParams;
