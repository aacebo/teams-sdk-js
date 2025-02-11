import {
  ActivityBuilder,
  ActivityParams,
  MessageSendActivity,
  Resource,
  TypingActivity,
} from '@teams.sdk/api';
import { Card } from '@teams.sdk/cards';

/**
 * component that can send an activity
 */
export interface Sender {
  /**
   * a stream, used to send activity chunks
   */
  stream?: Streamer;

  /**
   * send an activity
   * @param activity the activity to send
   */
  send(activity: ActivityParams | string | ActivityBuilder | Card): Promise<Resource>;

  /**
   * reploy to an activity
   * @param activity the activity to send
   */
  reply(activity: ActivityParams | string | ActivityBuilder | Card): Promise<Resource>;

  /**
   * trigger user signin flow for the activity sender
   * @param name auth connection name, defaults to `graph`
   * @param text card text to display
   */
  signin(name?: string, text?: string): Promise<string | undefined>;

  /**
   * sign the activity sender out
   * @param name auth connection name, defaults to `graph`
   */
  signout: (name?: string) => Promise<void>;
}

/**
 * component that can send streamed chunks of an activity
 */
export interface Streamer {
  /**
   * emit an activity chunk
   * @param activity the activity to send
   */
  emit(activity: Partial<MessageSendActivity | TypingActivity> | string): void;

  /**
   * close the stream
   */
  close(): void | Promise<void>;
}
