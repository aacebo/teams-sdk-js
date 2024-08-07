import { TabFetchInvokeActivity } from './tab-fetch';
import { TabSubmitInvokeActivity } from './tab-submit';

export type TabInvokeActivity<D = any> = TabFetchInvokeActivity<D> | TabSubmitInvokeActivity<D>;

export * from './tab-fetch';
export * from './tab-submit';
