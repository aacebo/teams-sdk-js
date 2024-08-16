import { ChatPrompt } from '@teams/ai';
import { OpenAIChatModel } from '@teams/openai';

import { storage } from './storage';

export function prompt(key: string) {
  let state = storage.get(key);

  if (!state) {
    state = { status: false, history: [] };
    storage.set(key, state);
  }

  return new ChatPrompt({
    history: state.history,
    instructions: `The following is a conversation with an AI assistant.
  The assistant can turn a light on or off.
  The lights are currently off.`,
    model: new OpenAIChatModel({
      model: 'gpt-4o',
      apiKey: process.env.OPENAI_API_KEY,
    }),
  })
    .function('get_light_status', 'get the current light status', () => {
      return state.status;
    })
    .function('lights_on', 'turn the lights on', () => {
      state.status = true;
      storage.set(key, state);
    })
    .function('lights_off', 'turn the lights off', () => {
      state.status = false;
      storage.set(key, state);
    });
}
