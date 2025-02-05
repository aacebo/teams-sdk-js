import { EventEmitter } from '@teams.sdk/common/events';

import { App } from '../app';

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

  /**
   * lifecycle method called by the `App`
   * once during initialization
   */
  register(app: App): void | Promise<void>;

  /**
   * start the plugin
   */
  start?(...args: any[]): void | Promise<void>;
}
