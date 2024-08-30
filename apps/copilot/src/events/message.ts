import { MessageSendActivity } from '@teams.sdk/api';
import { Context } from '@teams.sdk/apps';

import { State } from '../state';
import { RootPrompt } from '../prompts';

export async function message({ activity, log, signin, say }: Context<MessageSendActivity>) {
  if (activity.conversation.isGroup) return;

  const start = new Date();
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

  log.debug(`elapse: ${Date.now() - start.getTime()}ms`);
}
