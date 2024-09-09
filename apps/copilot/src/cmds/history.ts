import { cardAttachment, MessageSendActivity } from '@teams.sdk/api';
import { Context } from '@teams.sdk/apps';

import { State } from '../state';

export async function history({ activity, storage, send }: Context<MessageSendActivity>) {
  const state = await State.fromActivity(activity, storage);

  await send({
    type: 'message',
    attachments: [
      cardAttachment('adaptive', {
        type: 'AdaptiveCard',
        version: '1.6',
        body: [
          {
            type: 'CodeBlock',
            language: 'Json',
            codeSnippet: JSON.stringify(state.chat.messages, null, 2),
          },
        ],
      }),
    ],
  });
}
