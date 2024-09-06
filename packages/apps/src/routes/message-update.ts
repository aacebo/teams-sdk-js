import { MessageUpdateActivity } from '@teams.sdk/api';

import { RouteHandler } from '../types';
import { Context } from '../context';

export type MessageUpdateActivityRoutes = {
  [K in MessageUpdateActivity['channelData']['eventType'] as K]?: RouteHandler<
    Context<MessageUpdateActivity>,
    void
  >;
};
