import { Activity } from '@teams.sdk/api';

export function withAIContentLabel(activity: Partial<Activity>): Partial<Activity> {
  return {
    ...activity,
    entities: [
      ...(activity.entities || []),
      {
        type: 'https://schema.org/Message',
        '@type': 'Message',
        '@context': 'https://schema.org',
        additionalType: ['AIGeneratedContent'],
      },
    ],
  };
}
