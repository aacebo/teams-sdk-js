import { MessageUpdateActivity } from '@teams.sdk/api';

import { Context } from '../context';
import { EventHandler } from '../types';

export type MessageUpdateActivityEvents = {
  [K in MessageUpdateActivity['channelData']['eventType'] as `message.${K}`]?: EventHandler<
    Context<MessageUpdateActivity>,
    void
  >;
};
