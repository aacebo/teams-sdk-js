import { ConversationUpdateActivity } from '@teams.sdk/api';

import { RouteHandler } from '../types';
import { Context } from '../context';

export type ConversationUpdateActivityRoutes = {
  [K in ConversationUpdateActivity['channelData']['eventType'] as K]?: RouteHandler<
    Context<ConversationUpdateActivity>,
    void
  >;
};
