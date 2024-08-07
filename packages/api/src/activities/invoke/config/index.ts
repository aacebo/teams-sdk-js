import { ConfigFetchInvokeActivity } from './config-fetch';
import { ConfigSubmitInvokeActivity } from './config-submit';

export type ConfigInvokeActivity<D = any> =
  | ConfigFetchInvokeActivity<D>
  | ConfigSubmitInvokeActivity<D>;

export * from './config-fetch';
export * from './config-submit';
