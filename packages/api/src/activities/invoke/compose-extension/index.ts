import { AnonQueryLinkInvokeActivity } from './anon-query-link';
import { CardButtonClickedInvokeActivity } from './card-button-clicked';
import { FetchTaskInvokeActivity } from './fetch-task';
import { QueryInvokeActivity } from './query';
import { QueryLinkInvokeActivity } from './query-link';
import { QuerySettingUrlInvokeActivity } from './query-setting-url';
import { SelectItemInvokeActivity } from './select-item';
import { SettingInvokeActivity } from './setting';
import { SubmitActionInvokeActivity } from './submit-action';

export type ComposeExtensionInvokeActivity<D = any> =
  | AnonQueryLinkInvokeActivity<D>
  | FetchTaskInvokeActivity<D>
  | CardButtonClickedInvokeActivity<D>
  | QueryLinkInvokeActivity<D>
  | QuerySettingUrlInvokeActivity<D>
  | QueryInvokeActivity<D>
  | SelectItemInvokeActivity<D>
  | SettingInvokeActivity<D>
  | SubmitActionInvokeActivity<D>;

export * from './anon-query-link';
export * from './card-button-clicked';
export * from './fetch-task';
export * from './query';
export * from './query-link';
export * from './query-setting-url';
export * from './select-item';
export * from './setting';
export * from './submit-action';
