import { EventActivity } from '@teams.sdk/api';

import { Context } from '../context';
import { EventHandler } from '../types';

export type EventActivityEvents = {
  [K in EventActivity['name'] as EventAliases[K]]?: EventHandler<
    Context<Extract<EventActivity, { name: K }>>,
    void
  >;
};

interface EventAliases {
  'application/vnd.microsoft.readReceipt': 'readReceipt';
  'application/vnd.microsoft.meetingStart': 'meetingStart';
  'application/vnd.microsoft.meetingEnd': 'meetingEnd';
  'application/vnd.microsoft.meetingParticipantJoin': 'meetingParticipantJoin';
  'application/vnd.microsoft.meetingParticipantLeave': 'meetingParticipantLeave';
}

export const EVENT_ALIASES: EventAliases = {
  'application/vnd.microsoft.readReceipt': 'readReceipt',
  'application/vnd.microsoft.meetingStart': 'meetingStart',
  'application/vnd.microsoft.meetingEnd': 'meetingEnd',
  'application/vnd.microsoft.meetingParticipantJoin': 'meetingParticipantJoin',
  'application/vnd.microsoft.meetingParticipantLeave': 'meetingParticipantLeave',
};
