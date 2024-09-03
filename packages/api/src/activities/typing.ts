import { ActivityBase } from './base';

export interface TypingActivity extends ActivityBase {
  readonly type: 'typing';
}
