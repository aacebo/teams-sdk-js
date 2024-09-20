import { Account, Activity } from '@teams.sdk/api';

export function withMention(activity: Partial<Activity>, account: Account): Partial<Activity> {
  return {
    ...activity,
    entities: [
      ...(activity.entities || []),
      {
        type: 'mention',
        mentioned: account,
        text: `<at>${account.name}</at>`,
      },
    ],
  };
}
