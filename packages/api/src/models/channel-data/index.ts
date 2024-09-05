import { ChannelInfo } from './channel-info';
import { MeetingInfo } from './meeting-info';
import { NotificationInfo } from './notification-info';
import { ChannelDataSettings } from './settings';
import { TeamInfo } from './team-info';
import { TenantInfo } from './tenant-info';

/**
 * @interface
 * An interface representing ChannelData.
 * Channel data specific to messages received in Microsoft Teams
 *
 */
export interface ChannelData {
  /**
   * @member {ChannelInfo} [channel] Information about the channel in which the
   * message was sent.
   */
  channel?: ChannelInfo;

  /**
   * @member {string} [eventType] Type of event.
   */
  eventType?: unknown;

  /**
   * @member {TeamInfo} [team] Information about the team in which the message
   * was sent.
   */
  team?: TeamInfo;

  /**
   * @member {NotificationInfo} [notification] Notification settings for the
   * message.
   */
  notification?: NotificationInfo;

  /**
   * @member {TenantInfo} [tenant] Information about the tenant in which the
   * message was sent.
   */
  tenant?: TenantInfo;

  /**
   * @member {MeetingInfo} [meeting] Information about the tenant in which the
   * message was sent.
   */
  meeting?: MeetingInfo;

  /**
   * @member {ChannelDataSettings} [settings] Information about the settings in which the
   * message was sent.
   */
  settings?: ChannelDataSettings;

  /**
   * Whether or not the feedback loop feature is enabled.
   */
  feedbackLoopEnabled?: boolean;
}

export * from './channel-info';
export * from './meeting-info';
export * from './notification-info';
export * from './settings';
export * from './team-info';
export * from './tenant-info';
