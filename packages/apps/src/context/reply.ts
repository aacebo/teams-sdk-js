import { Activity, ConversationActivityClient } from '@teams.sdk/api';

export function reply(api: ConversationActivityClient) {
  return (id: string, activity: Partial<Activity>) => {
    return api.reply(id, activity);
  };
}
