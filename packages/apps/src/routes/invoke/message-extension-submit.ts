import { MessageExtensionSubmitActionInvokeActivity, InvokeResponse } from '@teams.sdk/api';

import { RouteHandler } from '../../types';
import { MiddlewareContext } from '../../middleware-context';

export type MessageExtensionSubmitActivityRoutes = {
  [K in MessageExtensionSubmitActionInvokeActivity['value']['botMessagePreviewAction'] as `message.ext.${K}`]?: RouteHandler<
    MiddlewareContext<MessageExtensionSubmitActionInvokeActivity>,
    InvokeResponse<'composeExtension/submitAction'>
  >;
};
