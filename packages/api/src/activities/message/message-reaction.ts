import { MessageReaction } from '../../models';

import { ActivityBase } from '../base';

export interface MessageReactionActivity extends ActivityBase {
  readonly type: 'messageReaction';

  /**
   * The collection of reactions added to the conversation.
   */
  reactionsAdded?: MessageReaction[];

  /**
   * The collection of reactions removed from the conversation.
   */
  reactionsRemoved?: MessageReaction[];
}
