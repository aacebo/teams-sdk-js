import { Account } from '../../models';

import { ActivityBase } from '../base';

export interface ConversationUpdateActivity<D = any> extends ActivityBase<D> {
  readonly type: 'conversationUpdate';

  /**
   * The collection of members added to the conversation.
   */
  membersAdded?: Account[];

  /**
   * The collection of members removed from the conversation.
   */
  membersRemoved?: Account[];

  /**
   * The updated topic name of the conversation.
   */
  topicName?: string;

  /**
   * Indicates whether the prior history of the channel is disclosed.
   */
  historyDisclosed?: boolean;
}
