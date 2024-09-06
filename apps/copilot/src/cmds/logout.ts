import { MessageSendActivity } from '@teams.sdk/api';
import { Context } from '@teams.sdk/apps';

import { State } from '../state';

export async function logout({ activity, storage }: Context<MessageSendActivity>) {
  const state = await State.fromActivity(activity, storage);
  state.user = {};
  await state.save(activity, storage);
}
