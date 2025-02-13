import { ActivityParams, ConversationReference } from '@teams.sdk/api';

import { App } from '../app';
import { ActivityContext } from '../activity-context';
import { Streamer } from './streamer';

/**
 * represents an activity that was sent
 */
export type SentActivity = { id: string } & ActivityParams;

/**
 * a component for extending the base
 * `App` functionality
 */
export interface Plugin {
  /**
   * the unique plugin name
   */
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
    ref: ConversationReference
  ): undefined | SentActivity | Promise<undefined | SentActivity>;

  /**
   * called by the `App`
   * to send an activity proactively
   */
  onSendProactive?(
    activity: ActivityParams,
    ref: ConversationReference
  ): undefined | SentActivity | Promise<undefined | SentActivity>;

  /**
   * called by the `App`
   * before an activity is sent
   */
  onBeforeSend?(activity: ActivityParams, ref: ConversationReference): void | Promise<void>;

  /**
   * called by the `App`
   * after an activity is sent
   */
  onAfterSend?(activity: SentActivity, ref: ConversationReference): void | Promise<void>;

  /**
   * called by the `App`
   * to send an activity chunk
   */
  onStreamOpen?(ref: ConversationReference): Streamer | Promise<Streamer>;
}

/**
 * a Plugin that
 */
export interface SenderPlugin extends Plugin {
  /**
   * called by the `App`
   * to send an activity
   */
  onSend(
    activity: ActivityParams,
    ref: ConversationReference
  ): SentActivity | Promise<SentActivity>;
}

/**
 * a Plugin that
 */
export interface StreamerPlugin extends Plugin {
  /**
   * called by the `App`
   * to send an activity chunk
   */
  onStreamOpen(ref: ConversationReference): Streamer | Promise<Streamer>;
}
