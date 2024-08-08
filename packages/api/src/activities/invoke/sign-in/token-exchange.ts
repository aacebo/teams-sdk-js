import { SignInExchangeToken } from '../../../models';
import { ActivityBase } from '../../base';

export interface SignInTokenExchangeInvokeActivity<D = any> extends ActivityBase<D> {
  readonly type: 'invoke';

  /**
   * The name of the operation associated with an invoke or event activity.
   */
  name: 'signin/tokenExchange';

  /**
   * A value that is associated with the activity.
   */
  value: SignInExchangeToken;
}
