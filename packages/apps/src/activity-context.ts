import { Logger } from '@teams.sdk/common/logging';
import { Storage } from '@teams.sdk/common/storage';
import { Activity, ConversationReference } from '@teams.sdk/api';

import { ApiClient } from './api';

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
  ref: ConversationReference;

  /**
   * the app logger instance
   */
  log: Logger;

  /**
   * the api client
   */
  api: ApiClient;

  /**
   * app storage instance
   */
  storage: Storage;

  /**
   * whether the user has provided
   * their MSGraph credentials for use
   * via `api.graph.*`
   */
  isSignedIn?: boolean;

  /**
   * extra data
   */
  [key: string]: any;
}
