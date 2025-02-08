import { ActivityParams } from '@teams.sdk/api';
import { EventEmitter } from '@teams.sdk/common/events';

import { App } from '../app';
import { MiddlewareContext } from '../middleware-context';

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
  onInit(app: App): void | Promise<void>;

  /**
   * lifecycle method called by the `App`
   * once during startup
   */
  onStart?(...args: any[]): void | Promise<void>;

  /**
   * called by the `App`
   * when an activity is received
   */
  onActivity?(ctx: MiddlewareContext): void | Promise<void>;

  /**
   * called by the `App`
   * before an activity is sent
   */
  onBeforeSend?(activity: ActivityParams, ctx: MiddlewareContext): void | Promise<void>;

  /**
   * called by the `App`
   * after an activity is sent
   */
  onAfterSend?(activity: ActivityParams, ctx: MiddlewareContext): void | Promise<void>;
}
