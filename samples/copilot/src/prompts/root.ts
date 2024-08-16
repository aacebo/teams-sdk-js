import { ChatPrompt } from '@teams/ai';
import { OpenAIChatModel } from '@teams/openai';
import * as MSGraph from '@microsoft/microsoft-graph-types';

import { State } from '../storage';
import { graph } from '../graph';

interface CreateCalendarEventArgs {
  readonly subject: string;
  readonly body: string;
  readonly start: string;
  readonly end: string;
}

export function root(state: State) {
  if (!state.auth?.token) throw new Error('auth token is required');
  if (!state.user) throw new Error('user is required');

  const msgraph = graph(state.auth.token);

  return new ChatPrompt({
    history: state.history,
    instructions: [
      'You are an ai assistant that runs in Microsoft Teams.',
      'You are great at helping users.',
    ].join('\n'),
    model: new OpenAIChatModel({
      model: 'gpt-4o',
      apiKey: process.env.OPENAI_API_KEY,
    }),
  })
    .function('get_user', 'get the user account of the user speaking with you', async () => {
      return state.user;
    })
    .function('get_user_calendar', 'get the users calendar events', async () => {
      const res: Record<'value', MSGraph.Event[]> = await msgraph.api('/me/calendar/events').get();
      return res.value;
    })
    .function(
      'create_user_calendar_event',
      'create a new calendar event for the user',
      {
        type: 'object',
        properties: {
          subject: {
            type: 'string',
            description: 'the event subject',
          },
          body: {
            type: 'string',
            description: 'the event body (supports HTML)',
          },
          start: {
            type: 'string',
            format: 'date-time',
            description: 'when the event starts',
          },
          end: {
            type: 'string',
            format: 'date-time',
            description: 'when the event ends',
          },
        },
        required: ['subject', 'body', 'start', 'end'],
      },
      async (args: CreateCalendarEventArgs) => {
        await msgraph.api('/me/calendar/events').create({
          subject: args.subject,
          body: {
            contentType: 'HTML',
            content: args.body,
          },
          start: {
            dateTime: args.start,
            timezone: 'Pacific Standard Time',
          },
          end: {
            dateTime: args.end,
            timezone: 'Pacific Standard Time',
          },
          isOnlineMeeting: true,
          onlineMeetingProvider: 'teamsForBusiness',
        });

        return '';
      }
    );
}
