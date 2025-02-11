import { ActivityBuilder, ActivityParams, isActivityBuilder, MessageSendActivityBuilder } from '@teams.sdk/api';
import { Card, isCard } from '@teams.sdk/cards';

export function toActivityParams(activity: ActivityParams | string | ActivityBuilder | Card): ActivityParams {
  if (typeof activity === 'string') {
    activity = {
      type: 'message',
      text: activity,
    };
  } else if (isActivityBuilder(activity)) {
    activity = activity.build();
  } else if (isCard(activity)) {
    activity = new MessageSendActivityBuilder('').card('adaptive', activity).build();
  }
  return activity;
}
