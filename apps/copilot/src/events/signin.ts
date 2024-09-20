import { SignInMiddlewareContext } from '@teams.sdk/apps';
import * as MSGraph from '@microsoft/microsoft-graph-types';

import { graph } from '../graph';
import { State } from '../state';

export async function signin({
  activity,
  api,
  tokenResponse,
  storage,
  withMention,
}: SignInMiddlewareContext) {
  const state = await State.fromActivity(activity, storage);

  if (!state.user.auth) {
    return;
  }

  const conversationId = state.user.auth.conversationId || activity.conversation.id;
  const msgraph = graph(tokenResponse.token);
  const me: MSGraph.User = await msgraph.api('/me').get();
  const tz: { value?: string } = await msgraph.api('/me/mailboxSettings/timeZone').get();

  state.user.user = {
    ...me,
    timezone: tz.value,
  };

  state.user.auth = {
    token: tokenResponse.token,
    expiration: tokenResponse.expiration,
  };

  await state.save(activity, storage);
  await api.conversations.activities(conversationId).create(
    withMention(
      {
        type: 'message',
        text: `Welcome <at>${activity.from.name}</at>, how may I assist you?`,
      },
      activity.from
    )
  );
}
