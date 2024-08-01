import { ActivityBase } from './base';

export interface HandoffActivity<D = any> extends ActivityBase<D> {
  readonly type: 'handoff';
}
