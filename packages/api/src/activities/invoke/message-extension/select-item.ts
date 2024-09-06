import { ConversationReference } from '../../../models';

import { ActivityBase } from '../../base';

export interface MessageExtensionSelectItemInvokeActivity extends ActivityBase {
  readonly type: 'invoke';

  /**
   * The name of the operation associated with an invoke or event activity.
   */
  name: 'composeExtension/selectItem';

  /**
   * A value that is associated with the activity.
   */
  value: any;

  /**
   * A reference to another conversation or activity.
   */
  relatesTo?: ConversationReference;
}