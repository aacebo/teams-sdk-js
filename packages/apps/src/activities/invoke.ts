import { ConversationReference } from '@teams/schema';

import { ActivityBase } from './base';

export interface InvokeActivity<D = any> extends ActivityBase<D> {
  readonly type: 'invoke';

  /**
   * The name of the operation associated with an invoke or event activity.
   */
  name?: string;

  /**
   * A value that is associated with the activity.
   */
  value?: any;

  /**
   * A reference to another conversation or activity.
   */
  relatesTo?: ConversationReference;
}
