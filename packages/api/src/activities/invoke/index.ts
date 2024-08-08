import { ComposeExtensionInvokeActivity } from './compose-extension';
import { ConfigInvokeActivity } from './config';
import { ExecuteActionInvokeActivity } from './execute-action';
import { FileConsentInvokeActivity } from './file-consent';
import { HandoffActionInvokeActivity } from './handoff-action';
import { MessageInvokeActivity } from './message';
import { SignInInvokeActivity } from './sign-in';
import { TabInvokeActivity } from './tab';
import { TaskInvokeActivity } from './task';

export type InvokeActivity<D = any> =
  | FileConsentInvokeActivity<D>
  | ExecuteActionInvokeActivity<D>
  | ComposeExtensionInvokeActivity<D>
  | ConfigInvokeActivity<D>
  | TabInvokeActivity<D>
  | TaskInvokeActivity<D>
  | MessageInvokeActivity<D>
  | HandoffActionInvokeActivity<D>
  | SignInInvokeActivity<D>;

export * from './file-consent';
export * from './execute-action';
export * from './compose-extension';
export * from './config';
export * from './tab';
export * from './task';
export * from './message';
export * from './handoff-action';
export * from './sign-in';
