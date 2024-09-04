import { SignInContext } from '@teams.sdk/apps';
import * as MSGraph from '@microsoft/microsoft-graph-types';

import { graph } from '../graph';
import { State } from '../state';

export async function signin({ activity, api, tokenResponse }: SignInContext) {
  const state = new State(activity);

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

  state.save();
  await api.conversations.activities(conversationId).create({
    type: 'message',
    text: `Welcome <at>${activity.from.name}</at>, how may I assist you?`,
    entities: [
      {
        type: 'mention',
        mentioned: activity.from,
        text: `<at>${activity.from.name}</at>`,
      },
    ],
  });
}
