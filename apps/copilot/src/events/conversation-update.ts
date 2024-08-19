import { ConversationUpdateActivity } from '@teams/api';
import { ActivityEventArgs } from '@teams/apps';

export async function conversationUpdate({
  activity,
  signin,
}: ActivityEventArgs<ConversationUpdateActivity>) {
  if (!activity.membersAdded?.length) return;
  if (!activity.membersAdded?.some((m) => m.id === activity.from.id)) return;
  await signin('graph-connection');
}
