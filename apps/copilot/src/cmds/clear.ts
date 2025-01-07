import { MessageSendActivity } from '@teams.sdk/api';
import { MiddlewareContext } from '@teams.sdk/apps';

import { State } from '../state';

export async function clear({ activity, storage }: MiddlewareContext<MessageSendActivity>) {
  const state = await State.fromActivity(activity, storage);
  state.chat.messages = [];
  await state.save(activity, storage);
}
