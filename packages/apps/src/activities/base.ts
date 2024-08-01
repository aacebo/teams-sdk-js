import { Account, ConversationAccount, Entity } from '@teams/schema';

export interface ActivityBase<D = any> {
  /**
   * Contains an ID that uniquely identifies the activity on the channel.
   */
  id?: string;

  /**
   * Contains the URL that specifies the channel's service endpoint. Set by the channel.
   */
  serviceUrl: string;

  /**
   * Contains the date and time that the message was sent, in UTC, expressed in ISO-8601 format.
   */
  timestamp?: Date;

  /**
   * Contains the local date and time of the message, expressed in ISO-8601 format.
   *
   * For example, 2016-09-23T13:07:49.4714686-07:00.
   */
  localTimestamp?: Date;

  /**
   * Contains an ID that uniquely identifies the channel. Set by the channel.
   */
  channelId: string;

  /**
   * Identifies the sender of the message.
   */
  from: Account;

  /**
   * Identifies the conversation to which the activity belongs.
   */
  conversation: ConversationAccount;

  /**
   * Identifies the recipient of the message.
   */
  recipient: Account;

  /**
   * Contains the ID of the message to which this message is a reply.
   */
  replyToId?: string;

  /**
   * Represents the entities that were mentioned in the message.
   */
  entities?: Entity[];

  /**
   * Contains channel-specific content.
   */
  channelData?: D;
}
