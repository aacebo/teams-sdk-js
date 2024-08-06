import { ConfigResponse, ConversationReference } from '../models';

import { ActivityBase } from './base';

export type InvokeActivityName = keyof InvokeActivityValues;

export interface InvokeActivity<Name extends InvokeActivityName = any, Data = any>
  extends ActivityBase<Data> {
  readonly type: 'invoke';

  /**
   * The name of the operation associated with an invoke or event activity.
   */
  name: Name;

  /**
   * A value that is associated with the activity.
   */
  value: InvokeActivityValues[Name];

  /**
   * A reference to another conversation or activity.
   */
  relatesTo?: ConversationReference;
}

interface InvokeActivityValues {
  'config/fetch': ConfigResponse;
  'config/submit': ConfigResponse;
}
