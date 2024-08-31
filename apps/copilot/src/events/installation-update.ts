import { InstallUpdateActivity } from '@teams.sdk/api';
import { Context } from '@teams.sdk/apps';

import { State } from '../state';

export function installationUpdate({ activity }: Context<InstallUpdateActivity>) {
  const state = new State(activity);

  if (activity.action === 'add') {
    state.chat.id = activity.channelData?.settings.selectedChannel.id;
    state.save();
  } else {
    state.delete();
  }
}
