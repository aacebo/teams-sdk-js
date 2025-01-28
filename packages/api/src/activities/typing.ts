import { ActivityBase, ActivityBuilder } from './base';

export interface TypingActivity extends ActivityBase {
  readonly type: 'typing';

  /**
   * The text content of the message.
   */
  text?: string;
}

export class TypingActivityBuilder extends ActivityBuilder {
  activity: Pick<TypingActivity, 'type'> & Partial<TypingActivity>;

  constructor(options?: Omit<Partial<TypingActivity>, 'type'>) {
    super();
    this.activity = {
      ...options,
      type: 'typing'
    };
  }

  /**
   * The text content of the message.
   */
  text(value: string) {
    this.activity.text = value;
    return this;
  }

  build() {
    return this.activity;
  }
}

export function TypingActivity(options?: Omit<Partial<TypingActivity>, 'type'>) {
  return new TypingActivityBuilder(options);
}
