import { ActivityBase } from './base';

export interface TypingActivity extends ActivityBase {
  readonly type: 'typing';

  /**
   * The text content of the message.
   */
  text: string;
}
