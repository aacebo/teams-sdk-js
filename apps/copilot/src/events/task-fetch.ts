import { cardAttachment, InvokeResponse, TaskFetchInvokeActivity } from '@teams/api';
import { ActivityEventArgs } from '@teams/apps';

export async function taskFetch({
  activity,
  log,
}: ActivityEventArgs<TaskFetchInvokeActivity>): Promise<InvokeResponse<'task/fetch'>> {
  log.debug(activity);

  return {
    status: 200,
    body: {
      task: {
        type: 'continue',
        value: {
          card: cardAttachment('adaptive', {
            type: 'AdaptiveCard',
            version: '1.6',
            body: [
              {
                type: 'TextBlock',
                wrap: true,
                text: JSON.stringify(activity, null, 2),
              },
            ],
          }),
        },
      },
    },
  };
}
