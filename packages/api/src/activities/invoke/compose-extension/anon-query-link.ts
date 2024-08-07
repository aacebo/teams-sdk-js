import { AppBasedLinkQuery, ConversationReference } from '../../../models';

import { ActivityBase } from '../../base';

export interface AnonQueryLinkInvokeActivity<Data = any> extends ActivityBase<Data> {
  readonly type: 'invoke';

  /**
   * The name of the operation associated with an invoke or event activity.
   */
  name: 'composeExtension/anonymousQueryLink';

  /**
   * A value that is associated with the activity.
   */
  value: AppBasedLinkQuery;

  /**
   * A reference to another conversation or activity.
   */
  relatesTo?: ConversationReference;
}
