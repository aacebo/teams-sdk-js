import { ConversationReference, TaskModuleRequest } from '../../../models';

import { ActivityBase } from '../../base';

export interface TaskSubmitInvokeActivity<Data = any> extends ActivityBase<Data> {
  readonly type: 'invoke';

  /**
   * The name of the operation associated with an invoke or event activity.
   */
  name: 'task/submit';

  /**
   * A value that is associated with the activity.
   */
  value: TaskModuleRequest;

  /**
   * A reference to another conversation or activity.
   */
  relatesTo?: ConversationReference;
}
