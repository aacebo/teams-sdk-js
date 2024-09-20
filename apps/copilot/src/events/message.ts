import { MessageSendActivity } from '@teams.sdk/api';
import { MiddlewareContext } from '@teams.sdk/apps';

import { State } from '../state';
import { RootPrompt } from '../prompts';

export async function message({
  activity,
  log,
  storage,
  signin,
  send,
  withAIContentLabel,
  next,
}: MiddlewareContext<MessageSendActivity>) {
  if (activity.conversation.isGroup) return;

  const start = new Date();
  const state = await State.fromActivity(activity, storage);

  // if not authenticated, set the conversation
  // where the auth flow began and prompt user to
  // to sign in.
  if (!state.authenticated) {
    state.user.auth = {
      conversationId: activity.conversation.id,
    };

    await state.save(activity, storage);
    await signin('graph-connection');
    return;
  }

  await send({ type: 'typing' });

  const prompt = new RootPrompt(state);
  const { text, attachments } = await prompt.chat(activity.text);

  await state.save(activity, storage);
  await send(
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
  return next();
}
