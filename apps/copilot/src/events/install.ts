import { InstalledActivity } from '@teams.sdk/api';
import { Context } from '@teams.sdk/apps';

import { State } from '../state';

export async function install({ activity, signin }: Context<InstalledActivity>) {
  const state = new State(activity);
  state.chat.id = activity.channelData?.settings?.selectedChannel.id;

  if (!state.user.auth?.token) {
    await signin('graph-connection');
  }

  state.save();
}
