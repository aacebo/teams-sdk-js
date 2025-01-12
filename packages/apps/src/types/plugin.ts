import { EventEmitter } from '@teams.sdk/common/events';

import { App } from '../app';
import { ActivityContext } from '../activity-context';
import { Sender } from './sender';

export interface PluginEvents {
  error: any;
}

/**
 * a component for extending the base
 * `App` functionality
 */
export interface Plugin<Events extends PluginEvents = PluginEvents>
  extends Omit<EventEmitter<Events>, 'emit'> {
  readonly name: string;
  readonly version: string;

  /**
   * lifecycle method called by the `App`
   * once during initialization
   */
  register(app: App): void | Promise<void>;

  /**
   * start the plugin
   */
  start?(...args: any[]): void | Promise<void>;

  /**
   * create a sender instance
   * @param ctx the activity context
   */
  sender?(ctx: ActivityContext): Sender;
}
