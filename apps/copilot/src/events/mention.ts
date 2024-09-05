import { MentionContext } from '@teams.sdk/apps';

import { State } from '../state';
import { RootPrompt } from '../prompts';

export async function mention({
  activity,
  log,
  storage,
  signin,
  say,
  withAIContentLabel,
}: MentionContext) {
  const start = new Date();
  const state = await State.fromActivity(activity, storage);

  // if not authenticated, set the conversation
  // where the auth flow began and prompt user to
  // to sign in.
  if (!state.user.auth?.token) {
    state.user.auth = {
      conversationId: activity.conversation.id,
    };

    await state.save(activity, storage);
    await signin('graph-connection');
    return;
  }

  await say({ type: 'typing' });
  const prompt = new RootPrompt(state);
  const { text, attachments } = await prompt.chat(activity.text);
  await state.save(activity, storage);

  await say(
    withAIContentLabel({
      type: 'message',
      text,
      attachments,
      channelData: {
        feedbackLoopEnabled: true,
      },
    })
  );

  log.debug(`elapse: ${Date.now() - start.getTime()}ms`);
}
