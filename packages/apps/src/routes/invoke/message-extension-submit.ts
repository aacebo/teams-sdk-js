import { MessageExtensionSubmitActionInvokeActivity, InvokeResponse } from '@teams.sdk/api';

import { RouteHandler } from '../../types';
import { Context } from '../../context';

export type MessageExtensionSubmitActivityRoutes = {
  [K in MessageExtensionSubmitActionInvokeActivity['value']['botMessagePreviewAction'] as `message.ext.${K}`]?: RouteHandler<
    Context<MessageExtensionSubmitActionInvokeActivity>,
    InvokeResponse<'composeExtension/submitAction'>
  >;
};
