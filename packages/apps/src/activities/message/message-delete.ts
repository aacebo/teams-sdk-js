import { ActivityBase } from '../base';

export interface MessageDeleteActivity<D = any> extends ActivityBase<D> {
  readonly type: 'messageDelete';
}
