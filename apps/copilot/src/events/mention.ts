import { MentionContext } from '@teams.sdk/apps';

import { State } from '../state';
import { RootPrompt } from '../prompts';

export async function mention({ activity, log, signin, say }: MentionContext) {
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
