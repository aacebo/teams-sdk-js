import { ActivityBase } from '../base';

export interface MessageUpdateActivity extends ActivityBase {
  readonly type: 'messageUpdate';

  /**
   * A locale name for the contents of the text field.
   * The locale name is a combination of an ISO 639 two- or three-letter culture code associated
   * with a language
   * and an ISO 3166 two-letter subculture code associated with a country or region.
   * The locale name can also correspond to a valid BCP-47 language tag.
   */
  locale?: string;

  /**
   * The text content of the message.
   */
  text: string;

  /**
   * The text to speak.
   */
  speak?: string;

  /**
   * The text to display if the channel cannot render cards.
   */
  summary?: string;

  /**
   * The time at which the activity should be considered to be "expired" and should not be
   * presented to the recipient.
   */
  expiration?: Date;

  /**
   * A value that is associated with the activity.
   */
  value?: any;
}
