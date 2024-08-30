import { ConversationUpdateActivity } from '@teams.sdk/api';
import { Context } from '@teams.sdk/apps';

export async function conversationUpdate({
  activity,
  signin,
}: Context<ConversationUpdateActivity>) {
  if (!activity.membersAdded?.length) return;
  if (!activity.membersAdded?.some((m) => m.id === activity.from.id)) return;
  await signin('graph-connection');
}
