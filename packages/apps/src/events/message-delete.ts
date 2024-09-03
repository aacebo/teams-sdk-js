import { MessageDeleteActivity } from '@teams.sdk/api';

import { Context } from '../context';
import { EventHandler } from '../types';

export type MessageDeleteActivityEvents = {
  [K in MessageDeleteActivity['channelData']['eventType'] as K]?: EventHandler<
    Context<MessageDeleteActivity>,
    void
  >;
};
