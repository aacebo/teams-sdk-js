import { ChannelData } from '../../models';
import { ActivityBase, ActivityBuilder } from '../base';

export interface MessageDeleteActivity extends ActivityBase {
  readonly type: 'messageDelete';

  channelData: ChannelData & {
    eventType: 'softDeleteMessage';
  };
}

export class MessageDeleteActivityBuilder extends ActivityBuilder {
  value: Pick<MessageDeleteActivity, 'type'> & Partial<MessageDeleteActivity>;

  constructor(options?: Omit<Partial<MessageDeleteActivity>, 'type'>) {
    super();
    this.value = {
      ...options,
      type: 'messageDelete',
      channelData: {
        ...options?.channelData,
        eventType: 'softDeleteMessage'
      }
    };
  }
}

export function MessageDeleteActivity(options?: Omit<Partial<MessageDeleteActivity>, 'type'>) {
  return new MessageDeleteActivityBuilder(options);
}
