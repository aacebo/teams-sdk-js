import { InstallUpdateActivity } from '@teams.sdk/api';

import { Context } from '../context';
import { EventHandler } from '../types';

export type InstallActivityEvents = {
  [K in InstallUpdateActivity['action'] as `install.${K}`]?: EventHandler<
    Context<Extract<InstallUpdateActivity, { action: K }>>,
    void
  >;
};
