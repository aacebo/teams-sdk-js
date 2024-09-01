import { InstallUpdateActivity } from '@teams.sdk/api';

import { Context } from '../context';

type EventHandler<In = any, Out = void> = (value: In) => Out | Promise<Out>;

export type InstallActivityEvents = {
  [K in InstallUpdateActivity['action'] as InstallAliases[K]]?: EventHandler<
    Context<Extract<InstallUpdateActivity, { action: K }>>,
    void
  >;
};

interface InstallAliases {
  add: 'install';
  remove: 'uninstall';
}

export const INSTALL_ALIASES: InstallAliases = {
  add: 'install',
  remove: 'uninstall',
};
