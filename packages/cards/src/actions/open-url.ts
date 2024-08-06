import { BaseAction } from './base';

/**
 * When invoked, show the given url either by launching it in an external web browser or showing within an embedded web browser.
 */
export interface OpenUrlAction extends BaseAction {
  type: 'Action.OpenUrl';

  /**
   * The URL to open.
   */
  url: string;
}
