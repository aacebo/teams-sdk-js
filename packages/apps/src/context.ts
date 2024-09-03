import {
  Activity,
  Client,
  ConversationReference,
  MentionEntity,
  MessageSendActivity,
  Resource,
  TokenResponse,
} from '@teams.sdk/api';

import { HttpRequest } from '@teams.sdk/common/http';
import { Logger } from '@teams.sdk/common/logging';

import { AppTokens } from './tokens';
import { AppResponse } from './response';

export interface Context<T extends Activity> {
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
   * the apps tokens
   */
  tokens: AppTokens;

  /**
   * the inbound http request
   */
  req?: HttpRequest;

  /**
   * the apps response to the activity
   */
  res?: AppResponse;

  /**
   * any extra context data
   */
  data: Map<string, any>;

  /**
   * send an activity to the conversation
   * @param activity activity to send
   */
  say: (activity: Partial<Activity>) => Promise<Resource>;

  /**
   * reply to an activity
   * @param id the id of the activity to reply to
   * @param activity activity to send
   */
  reply: (id: string, activity: Partial<Activity>) => Promise<Resource>;

  /**
   * trigger user signin flow for the activity sender
   * @param name auth connection name
   * @param text card text to display
   */
  signin: (name: string, text?: string) => Promise<Resource>;
}

export type MentionContext = Context<MessageSendActivity> & {
  /**
   * the mention entity that references your app
   */
  mention: MentionEntity;
};

export type SignInContext = Context<Activity> & {
  /**
   * the token response of the signin request
   */
  tokenResponse: TokenResponse;
};
