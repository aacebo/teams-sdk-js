import { SigninStateVerifyQuery } from '../../../models';
import { ActivityBase } from '../../base';

export interface SignInVerifyStateInvokeActivity<D = any> extends ActivityBase<D> {
  readonly type: 'invoke';

  /**
   * The name of the operation associated with an invoke or event activity.
   */
  name: 'signin/verifyState';

  /**
   * A value that is associated with the activity.
   */
  value: SigninStateVerifyQuery;
}
