import { ActivityParams, Resource } from '@teams.sdk/api';
import { EventEmitter } from '@teams.sdk/common/events';

import { App } from '../app';
import { ActivityContext } from '../activity-context';
import { Streamer } from './streamer';
import { ProactiveContext } from '../proactive-context';

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
  onActivity?(ctx: ActivityContext): void | Promise<void>;

  /**
   * called by the `App`
   * to send an activity
   */
  onSend?(
    activity: ActivityParams,
    ctx: ActivityContext
  ): undefined | Resource | Promise<undefined | Resource>;

  /**
   * called by the `App`
   * to send an activity proactively
   */
  onSendProactive?(
    activity: ActivityParams,
    ctx: ProactiveContext
  ): undefined | Resource | Promise<undefined | Resource>;

  /**
   * called by the `App`
   * before an activity is sent
   */
  onBeforeSend?(activity: ActivityParams, ctx: ActivityContext): void | Promise<void>;

  /**
   * called by the `App`
   * after an activity is sent
   */
  onAfterSend?(activity: ActivityParams, ctx: ActivityContext): void | Promise<void>;

  /**
   * called by the `App`
   * to send an activity chunk
   */
  onStreamOpen?(ctx: ActivityContext): Streamer | Promise<Streamer>;
}

/**
 * a Plugin that
 */
export interface SenderPlugin<Events extends PluginEvents = PluginEvents> extends Plugin<Events> {
  /**
   * called by the `App`
   * to send an activity
   */
  onSend(activity: ActivityParams, ctx: ActivityContext): Resource | Promise<Resource>;
}

/**
 * a Plugin that
 */
export interface StreamerPlugin<Events extends PluginEvents = PluginEvents> extends Plugin<Events> {
  /**
   * called by the `App`
   * to send an activity chunk
   */
  onStreamOpen(ctx: ActivityContext): Streamer | Promise<Streamer>;
}
