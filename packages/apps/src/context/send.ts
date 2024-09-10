import { Activity, ConversationActivityClient } from '@teams.sdk/api';

export function send(api: ConversationActivityClient) {
  return (activity: Partial<Activity>) => {
    if (activity.id) {
      return api.update(activity.id, activity);
    }

    return api.create(activity);
  };
}
