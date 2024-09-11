import { Activity, ConversationActivityClient } from '@teams.sdk/api';

export function reply(replyToId: string, api: ConversationActivityClient) {
  return (activity: Partial<Activity>) => {
    return api.reply(replyToId, activity);
  };
}
