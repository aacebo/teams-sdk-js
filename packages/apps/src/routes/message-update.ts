import { MessageUpdateActivity } from '@teams.sdk/api';

import { RouteHandler } from '../types';
import { MiddlewareContext } from '../middleware-context';

export type MessageUpdateActivityRoutes = {
  [K in MessageUpdateActivity['channelData']['eventType'] as K]?: RouteHandler<
    MiddlewareContext<MessageUpdateActivity>,
    void
  >;
};
