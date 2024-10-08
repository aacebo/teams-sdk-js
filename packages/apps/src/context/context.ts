import {
  Account,
  Activity,
  Client,
  ConversationReference,
  MentionEntity,
  MessageSendActivity,
  Resource,
  SignInTokenExchangeInvokeActivity,
  SignInVerifyStateInvokeActivity,
  TokenResponse,
} from '@teams.sdk/api';

import { HttpRequest } from '@teams.sdk/common/http';
import { Logger } from '@teams.sdk/common/logging';
import { Storage } from '@teams.sdk/common/storage';

import { AppTokens } from '../tokens';
import { ActivityStream } from './activity-stream';

export interface Context<T extends Activity = Activity> {
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
   * any extra context data
   */
  data: Map<string, any>;

  /**
   * app storage instance
   */
  storage: Storage;

  /**
   * activity stream
   */
  stream: ActivityStream;

  /**
   * call the next event/middleware handler
   */
  next: (ctx?: Context) => any | Promise<any>;

  /**
   * send an activity to the conversation
   * @param activity activity to send
   */
  send: (activity: Partial<Activity>) => Promise<Resource>;

  /**
   * reply to the inbound activity
   * @param activity activity to send
   */
  reply: (activity: Partial<Activity>) => Promise<Resource>;

  /**
   * trigger user signin flow for the activity sender
   * @param name auth connection name
   * @param text card text to display
   */
  signin: (name: string, text?: string) => Promise<Resource>;

  /**
   * "@mention" an account
   * @param activity the activity to add the mention to
   * @param account the account to mention
   */
  withMention: (activity: Partial<Activity>, account: Account) => Partial<Activity>;

  /**
   * add the "Generated By AI" label
   * @param activity activity to add label to
   */
  withAIContentLabel: (activity: Partial<Activity>) => Partial<Activity>;
}

export type MentionContext = Context<MessageSendActivity> & {
  /**
   * the mention entity that references your app
   */
  mention: MentionEntity;
};

export type SignInContext = Context<
  SignInTokenExchangeInvokeActivity | SignInVerifyStateInvokeActivity
> & {
  /**
   * the token response of the signin request
   */
  tokenResponse: TokenResponse;
};

export type ErrorContext = Context & {
  /**
   * the error
   */
  err: Error;
};
