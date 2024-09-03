import { ActivityBase } from '../base';

export interface MessageDeleteActivity extends ActivityBase {
  readonly type: 'messageDelete';
}
