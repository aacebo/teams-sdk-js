import { Activity, Credentials, Resource } from '@teams.sdk/api';

import { ActivityContext } from '../activity-context';

export type SenderContext = Credentials & ActivityContext;

/**
 * anything that can send activities
 */
export interface Sender {
  /**
   * send an activity
   * @param activity the activity to send
   */
  send(activity: Partial<Activity>): Promise<Resource>;

  /**
   * reploy to an activity
   * @param activity the activity to send
   */
  reply(activity: Partial<Activity>): Promise<Resource>;

  /**
   * trigger user signin flow for the activity sender
   * @param name auth connection name
   * @param text card text to display
   */
  signin(name: string, text?: string): Promise<Resource>;
}
