import { MessageSendActivity } from '@teams.sdk/api';
import { Context } from '@teams.sdk/apps';

import { State } from '../state';
import { RootPrompt } from '../prompts';

export async function message({
  activity,
  log,
  signin,
  say,
  withAIContentLabel,
}: Context<MessageSendActivity>) {
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

  const prompt = new RootPrompt(state);
  const { text, attachments } = await prompt.chat(activity.text);
  state.save();

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
