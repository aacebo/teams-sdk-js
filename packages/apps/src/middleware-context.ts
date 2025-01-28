import {
  Activity,
  ActivityParams,
  MentionEntity,
  MessageSendActivity,
  Resource,
  SignInTokenExchangeInvokeActivity,
  SignInVerifyStateInvokeActivity,
  TokenResponse,
} from '@teams.sdk/api';

import { ActivityContext } from './activity-context';
import { Streamer } from './types';

export interface MiddlewareContext<T extends Activity = Activity> extends ActivityContext<T> {
  /**
   * a stream that can emit activity chunks
   */
  stream: Streamer;

  /**
   * call the next event/middleware handler
   */
  next: (ctx?: MiddlewareContext) => any | Promise<any>;

  /**
   * send an activity to the conversation
   * @param activity activity to send
   */
  send: (activity: ActivityParams | string) => Promise<Resource>;

  /**
   * reply to the inbound activity
   * @param activity activity to send
   */
  reply: (activity: ActivityParams | string) => Promise<Resource>;

  /**
   * trigger user signin flow for the activity sender
   * @param name auth connection name
   * @param text card text to display
   */
  signin: (name: string, text?: string) => Promise<Resource>;
}

export interface MentionMiddlewareContext extends MiddlewareContext<MessageSendActivity> {
  /**
   * the mention entity that references your app
   */
  mention: MentionEntity;
}

export interface SignInMiddlewareContext
  extends MiddlewareContext<SignInTokenExchangeInvokeActivity | SignInVerifyStateInvokeActivity> {
  /**
   * the token response of the signin request
   */
  token: TokenResponse;
}

export interface ErrorMiddlewareContext<T extends Activity = Activity>
  extends MiddlewareContext<T> {
  /**
   * the error
   */
  err: Error;
}
