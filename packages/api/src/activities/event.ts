import { ConversationReference } from '../models';

import { ActivityBase } from './base';

export interface EventActivity extends ActivityBase {
  readonly type: 'event';

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
