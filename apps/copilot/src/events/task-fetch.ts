import { cardAttachment, InvokeResponse, TaskFetchInvokeActivity } from '@teams/api';
import { ActivityEventArgs } from '@teams/apps';

import { State } from '../state';
import { DrivePrompt } from '../prompts';

export async function taskFetch({
  activity,
}: ActivityEventArgs<TaskFetchInvokeActivity>): Promise<InvokeResponse<'task/fetch'>> {
  const id: string = activity.value.data.id;
  const name: string = activity.value.data.name;
  const state = new State(activity);

  if (!state.user.auth?.token) {
    return { status: 401 };
  }

  const prompt = new DrivePrompt(state);

  if (name === 'summarize') {
    const { text } = await prompt.chat(`summarize the file/document with id "${id}"`);

    return {
      status: 200,
      body: {
        task: {
          type: 'continue',
          value: {
            width: 'large',
            card: cardAttachment('adaptive', {
              type: 'AdaptiveCard',
              version: '1.6',
              body: [
                {
                  type: 'TextBlock',
                  wrap: true,
                  text,
                },
              ],
            }),
          },
        },
      },
    };
  }

  return { status: 200 };
}
