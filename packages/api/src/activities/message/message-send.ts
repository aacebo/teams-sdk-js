import {
  Attachment,
  AttachmentLayout,
  DeliveryMode,
  Importance,
  InputHint,
  SuggestedActions,
  TextFormat,
} from '../../models';

import { ActivityBase } from '../base';

export interface MessageSendActivity extends ActivityBase {
  readonly type: 'message';

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
   * Indicates whether your bot is accepting,
   * expecting, or ignoring user input after the message is delivered to the client. Possible
   * values include: 'acceptingInput', 'ignoringInput', 'expectingInput'
   */
  inputHint?: InputHint;

  /**
   * The text to display if the channel cannot render cards.
   */
  summary?: string;

  /**
   * Format of text fields Default:markdown. Possible values include: 'markdown', 'plain', 'xml'
   */
  textFormat?: TextFormat;

  /**
   * The layout hint for multiple attachments. Default: list. Possible values include: 'list',
   * 'carousel'
   */
  attachmentLayout?: AttachmentLayout;

  /**
   * Attachments
   */
  attachments?: Attachment[];

  /**
   * The suggested actions for the activity.
   */
  suggestedActions?: SuggestedActions;

  /**
   * The importance of the activity. Possible values include: 'low', 'normal', 'high'
   */
  importance?: Importance;

  /**
   * A delivery hint to signal to the recipient alternate delivery paths for the activity.
   * The default delivery mode is "default". Possible values include: 'normal', 'notification'
   */
  deliveryMode?: DeliveryMode;

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
