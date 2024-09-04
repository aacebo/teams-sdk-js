import { UnInstalledActivity } from '@teams.sdk/api';
import { Context } from '@teams.sdk/apps';

import { State } from '../state';

export async function uninstall({ activity }: Context<UnInstalledActivity>) {
  const state = new State(activity);
  state.delete();
}
