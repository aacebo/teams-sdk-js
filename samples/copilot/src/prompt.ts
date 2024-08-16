import { ChatPrompt } from '@teams/ai';
import { OpenAIChatModel } from '@teams/openai';
import * as MSGraph from '@microsoft/microsoft-graph-types';

import { State } from './storage';
import { graph } from './graph';

export function prompt(state: State) {
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
    .function('get_user_calendar', 'get the users calendar', async () => {
      const res: Record<'value', MSGraph.Event[]> = await msgraph.api('/me/calendar/events').get();
      return res.value;
    });
}
