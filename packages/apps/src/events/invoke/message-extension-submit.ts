import { MessageExtensionSubmitActionInvokeActivity, InvokeResponse } from '@teams.sdk/api';

import { Context } from '../../context';
import { EventHandler } from '../../types';

export type MessageExtensionSubmitActivityEvents = {
  [K in MessageExtensionSubmitActionInvokeActivity['value']['botMessagePreviewAction'] as `message.ext.${K}`]?: EventHandler<
    Context<Extract<MessageExtensionSubmitActionInvokeActivity, { action: K }>>,
    InvokeResponse<'composeExtension/submitAction'>
  >;
};
