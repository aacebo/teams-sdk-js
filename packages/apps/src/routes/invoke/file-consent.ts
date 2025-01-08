import { FileConsentInvokeActivity, InvokeResponse } from '@teams.sdk/api';

import { RouteHandler } from '../../types';
import { MiddlewareContext } from '../../middleware-context';

export type FileConsentActivityRoutes = {
  [K in FileConsentInvokeActivity['value']['action'] as `file.consent.${K}`]?: RouteHandler<
    MiddlewareContext<FileConsentInvokeActivity>,
    InvokeResponse<'fileConsent/invoke'>
  >;
};
