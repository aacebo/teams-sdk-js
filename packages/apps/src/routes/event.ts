import { EventActivity } from '@teams.sdk/api';

import { RouteHandler } from '../types';
import { Context } from '../context';

export type EventActivityRoutes = {
  [K in EventActivity['name'] as EventAliases[K]]?: RouteHandler<
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
