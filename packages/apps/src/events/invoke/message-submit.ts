import { MessageSubmitActionInvokeActivity, InvokeResponse } from '@teams.sdk/api';

import { Context } from '../../context';
import { EventHandler } from '../../types';

export type MessageSubmitActivityEvents = {
  [K in MessageSubmitActionInvokeActivity['value']['actionName'] as `message.submit.${K}`]?: EventHandler<
    Context<Extract<MessageSubmitActionInvokeActivity, { value: { actionName: K } }>>,
    InvokeResponse<'message/submitAction'>
  >;
};
