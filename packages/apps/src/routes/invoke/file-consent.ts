import { FileConsentInvokeActivity, InvokeResponse } from '@teams.sdk/api';

import { RouteHandler } from '../../types';
import { Context } from '../../context';

export type FileConsentActivityRoutes = {
  [K in FileConsentInvokeActivity['value']['action'] as `file.consent.${K}`]?: RouteHandler<
    Context<FileConsentInvokeActivity>,
    InvokeResponse<'fileConsent/invoke'>
  >;
};
