import { InstalledActivity } from '@teams.sdk/api';
import { Context } from '@teams.sdk/apps';

import { State } from '../state';

export async function install({ activity, storage, signin }: Context<InstalledActivity>) {
  const state = await State.fromActivity(activity, storage);
  state.chat.id = activity.channelData?.settings?.selectedChannel.id;

  if (!state.user.auth?.token) {
    await signin('graph-connection');
  }

  await state.save(activity, storage);
}
