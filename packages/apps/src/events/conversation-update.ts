import { ConversationUpdateActivity } from '@teams.sdk/api';

import { Context } from '../context';
import { EventHandler } from '../types';

export type ConversationUpdateActivityEvents = {
  [K in ConversationUpdateActivity['channelData']['eventType'] as `conversation.${K}`]?: EventHandler<
    Context<ConversationUpdateActivity>,
    void
  >;
};
