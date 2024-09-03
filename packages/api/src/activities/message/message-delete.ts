import { ChannelData } from '../../models';
import { ActivityBase } from '../base';

export interface MessageDeleteActivity extends ActivityBase {
  readonly type: 'messageDelete';

  channelData: ChannelData & {
    eventType: 'softDeleteMessage';
  };
}
