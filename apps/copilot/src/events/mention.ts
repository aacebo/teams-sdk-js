import { MentionEventArgs } from '@teams/apps';

import { State } from '../state';
import { RootPrompt } from '../prompts';

export async function mention({ activity, signin, say }: MentionEventArgs) {
  const state = new State(activity);

  // if not authenticated, set the conversation
  // where the auth flow began and prompt user to
  // to sign in.
  if (!state.user.auth?.token) {
    state.user.auth = {
      conversationId: activity.conversation.id,
    };

    state.save();
    await signin('graph-connection');
    return;
  }

  if (activity.text === '/history') {
    await say({
      type: 'message',
      text:
        state.chat.history.length > 0
          ? state.chat.history
              .map((m) => `- **${m.role}**: ${JSON.stringify(m.content)}`)
              .join('\n')
          : '<empty>',
    });

    return;
  }

  const prompt = new RootPrompt(state);
  const { text, attachments } = await prompt.chat(activity.text);
  state.save();
  await say({
    type: 'message',
    text,
    attachments,
  });
}