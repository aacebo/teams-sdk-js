import { UnInstalledActivity } from '@teams.sdk/api';
import { MiddlewareContext } from '@teams.sdk/apps';

import { State } from '../state';

export async function uninstall({ activity, storage }: MiddlewareContext<UnInstalledActivity>) {
  const state = await State.fromActivity(activity, storage);
  await state.delete(activity, storage);
}
