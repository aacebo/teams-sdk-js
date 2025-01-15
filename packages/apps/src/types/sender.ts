import { Activity, Resource } from '@teams.sdk/api';

/**
 * component that can send an activity
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
