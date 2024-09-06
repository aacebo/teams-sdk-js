import { MessageDeleteActivity } from '@teams.sdk/api';

import { RouteHandler } from '../types';
import { Context } from '../context';

export type MessageDeleteActivityRoutes = {
  [K in MessageDeleteActivity['channelData']['eventType'] as K]?: RouteHandler<
    Context<MessageDeleteActivity>,
    void
  >;
};
