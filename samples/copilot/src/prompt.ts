import { ChatPrompt } from '@teams/ai';
import { OpenAIChatModel } from '@teams/openai';

import { State } from './storage';

export function prompt(state: State) {
  if (!state.auth?.token) throw new Error('auth token is required');
  if (!state.user) throw new Error('user is required');

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
  }).function('get_user', 'get the user account of the user speaking with you', async () => {
    return state.user;
  });
}
