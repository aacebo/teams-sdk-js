import { Activity, Resource } from '@teams.sdk/api';

import { ActivityContext } from '../activity-context';
import { Plugin, PluginEvents } from './plugin';

/**
 * plugin that can send activities
 */
export interface SenderPlugin extends Plugin<PluginEvents> {
  /**
   * create a sender instance
   * @param ctx the activity context
   */
  create(ctx: ActivityContext): Sender;
}

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
