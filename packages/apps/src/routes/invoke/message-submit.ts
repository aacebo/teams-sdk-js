import { MessageSubmitActionInvokeActivity, InvokeResponse } from '@teams.sdk/api';

import { RouteHandler } from '../../types';
import { Context } from '../../context';

export type MessageSubmitActivityRoutes = {
  [K in MessageSubmitActionInvokeActivity['value']['actionName'] as `message.submit.${K}`]?: RouteHandler<
    Context<Extract<MessageSubmitActionInvokeActivity, { value: { actionName: K } }>>,
    InvokeResponse<'message/submitAction'>
  >;
};
