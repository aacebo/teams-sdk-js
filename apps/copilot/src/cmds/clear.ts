import { MessageSendActivity } from '@teams.sdk/api';
import { Context } from '@teams.sdk/apps';

import { State } from '../state';

export async function clear({ activity, storage }: Context<MessageSendActivity>) {
  const state = await State.fromActivity(activity, storage);
  state.chat.messages = [];
  await state.save(activity, storage);
}
