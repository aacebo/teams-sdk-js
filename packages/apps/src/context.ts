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

export interface Context<T extends Activity> {
  /**
   * the inbound activity
   */
  readonly activity: T;

  /**
   * the inbound activity conversation reference
   */
  readonly conversation: ConversationReference;

  /**
   * the inbound request
   */
  readonly req: HttpRequest;

  /**
   * the app logger instance
   */
  readonly log: Logger;

  /**
   * the bot api client
   */
  readonly api: Client;

  /**
   * the apps tokens
   */
  readonly tokens: AppTokens;

  /**
   * send an activity to the conversation
   * @param activity activity to send
   */
  readonly say: (activity: Partial<Activity>) => Promise<Resource>;

  /**
   * reply to an activity
   * @param id the id of the activity to reply to
   * @param activity activity to send
   */
  readonly reply: (id: string, activity: Partial<Activity>) => Promise<Resource>;

  /**
   * trigger user signin flow for the activity sender
   * @param name auth connection name
   * @param text card text to display
   */
  readonly signin: (name: string, text?: string) => Promise<Resource>;
}

export type MentionContext = Context<MessageSendActivity> & {
  readonly mention: MentionEntity;
};

export type SignInContext = Context<Activity> & {
  readonly tokenResponse: TokenResponse;
};
