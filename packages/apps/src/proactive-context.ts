import { Logger } from '@teams.sdk/common/logging';
import { Storage } from '@teams.sdk/common/storage';
import { ConversationReference } from '@teams.sdk/api';

import { AppClient } from './api';

export interface ProactiveContext {
  /**
   * the app id of the bot
   */
  appId: string;

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
  api: AppClient;

  /**
   * app storage instance
   */
  storage: Storage;

  /**
   * extra data
   */
  [key: string]: any;
}
