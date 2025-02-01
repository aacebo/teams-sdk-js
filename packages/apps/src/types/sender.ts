import { ActivityParams, MessageSendActivity, Resource, TypingActivity } from '@teams.sdk/api';

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
  send(activity: ActivityParams | string): Promise<Resource>;

  /**
   * reploy to an activity
   * @param activity the activity to send
   */
  reply(activity: ActivityParams | string): Promise<Resource>;

  /**
   * trigger user signin flow for the activity sender
   * @param name auth connection name, defaults to `graph`
   * @param text card text to display
   */
  signin(name?: string, text?: string): Promise<string | undefined>;
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
