import { InstallUpdateActivity } from '@teams.sdk/api';

import { RouteHandler } from '../types';
import { Context } from '../context';

export type InstallActivityRoutes = {
  [K in InstallUpdateActivity['action'] as `install.${K}`]?: RouteHandler<
    Context<Extract<InstallUpdateActivity, { action: K }>>,
    void
  >;
};
