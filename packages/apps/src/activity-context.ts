import { Logger } from '@teams.sdk/common/logging';
import { Storage } from '@teams.sdk/common/storage';
import { Activity, Client, ConversationReference } from '@teams.sdk/api';

export interface ActivityContext<T extends Activity = Activity> {
  /**
   * the app id of the bot
   */
  appId: string;

  /**
   * the inbound activity
   */
  activity: T;

  /**
   * the inbound activity conversation reference
   */
  conversation: ConversationReference;

  /**
   * the app logger instance
   */
  log: Logger;

  /**
   * the bot api client
   */
  api: Client;

  /**
   * app storage instance
   */
  storage: Storage;

  /**
   * extra data
   */
  [key: string]: any;
}
