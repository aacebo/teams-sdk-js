import { ActivityBase } from './base';

export interface TypingActivity<D = any> extends ActivityBase<D> {
  readonly type: 'typing';
}
