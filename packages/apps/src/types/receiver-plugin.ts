import { Activity } from '@teams.sdk/api';

import { Plugin, PluginEvents } from './plugin';

export interface ReceiverEvents extends PluginEvents {
  start: null;
  activity: Activity;
}

/**
 * plugin that can receive activities
 */
export interface ReceiverPlugin extends Plugin<ReceiverEvents> {
  /**
   * start receiving activities
   */
  start(...args: any[]): void | Promise<void>;
}
