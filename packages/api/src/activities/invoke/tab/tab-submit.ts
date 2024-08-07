import { ConversationReference, TabRequest } from '../../../models';

import { ActivityBase } from '../../base';

export interface TabSubmitInvokeActivity<Data = any> extends ActivityBase<Data> {
  readonly type: 'invoke';

  /**
   * The name of the operation associated with an invoke or event activity.
   */
  name: 'tab/submit';

  /**
   * A value that is associated with the activity.
   */
  value: TabRequest;

  /**
   * A reference to another conversation or activity.
   */
  relatesTo?: ConversationReference;
}
