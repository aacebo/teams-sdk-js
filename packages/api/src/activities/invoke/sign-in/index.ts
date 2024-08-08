import { SignInTokenExchangeInvokeActivity } from './token-exchange';
import { SignInVerifyStateInvokeActivity } from './verify-state';

export type SignInInvokeActivity<D = any> =
  | SignInTokenExchangeInvokeActivity<D>
  | SignInVerifyStateInvokeActivity<D>;

export * from './token-exchange';
export * from './verify-state';
