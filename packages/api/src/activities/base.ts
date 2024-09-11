import {
  Account,
  ChannelData,
  ConversationAccount,
  ConversationReference,
  Entity,
} from '../models';

export interface ActivityBase {
  /**
   * Contains an ID that uniquely identifies the activity on the channel.
   */
  id: string;

  /**
   * Contains the URL that specifies the channel's service endpoint. Set by the channel.
   */
  serviceUrl: string;

  /**
   * Contains the date and time that the message was sent, in UTC, expressed in ISO-8601 format.
   */
  timestamp?: Date;

  /**
   * A locale name for the contents of the text field.
   * The locale name is a combination of an ISO 639 two- or three-letter culture code associated
   * with a language
   * and an ISO 3166 two-letter subculture code associated with a country or region.
   * The locale name can also correspond to a valid BCP-47 language tag.
   */
  locale?: string;

  /**
   * Contains the local date and time of the message, expressed in ISO-8601 format.
   *
   * For example, 2016-09-23T13:07:49.4714686-07:00.
   */
  localTimestamp?: Date;

  /**
   * A string containing a URI identifying the caller of a bot. This field is not intended to be transmitted over
   * the wire, but is instead populated by bots and clients based on cryptographically verifiable data that asserts
   * the identity of the callers (e.g. tokens).
   */
  callerId: string;

  /**
   * Contains an ID that uniquely identifies the channel. Set by the channel.
   */
  channelId: 'webchat' | 'msteams' | Omit<string, 'webchat' | 'msteams'>;

  /**
   * Identifies the sender of the message.
   */
  from: Account;

  /**
   * Identifies the conversation to which the activity belongs.
   */
  conversation: ConversationAccount;

  /**
   * A reference to another conversation or activity.
   */
  relatesTo?: ConversationReference;

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
  channelData?: ChannelData;
}
