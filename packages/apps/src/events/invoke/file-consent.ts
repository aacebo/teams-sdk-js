import { FileConsentInvokeActivity, InvokeResponse } from '@teams.sdk/api';

import { Context } from '../../context';
import { EventHandler } from '../../types';

export type FileConsentActivityEvents = {
  [K in FileConsentInvokeActivity['value']['action'] as `file.consent.${K}`]?: EventHandler<
    Context<Extract<FileConsentInvokeActivity, { action: K }>>,
    InvokeResponse<'fileConsent/invoke'>
  >;
};
