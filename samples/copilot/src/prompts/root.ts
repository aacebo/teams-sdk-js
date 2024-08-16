import { ChatPrompt } from '@teams/ai';
import { Activity } from '@teams/api';
import { OpenAIChatModel } from '@teams/openai';
import { ConsoleLogger } from '@teams/common/logging';

import { State } from '../storage';
import { calendar } from './calendar';

interface ChatCalendarAssistantArgs {
  readonly text: string;
}

export function root(activity: Activity, state: State) {
  if (!state.auth?.token) throw new Error('auth token is required');
  if (!state.user) throw new Error('user is required');

  const log = new ConsoleLogger({ level: 'debug', name: '@samples/copilot/prompts/root' });
  const calendarPrompt = calendar(activity, {
    ...state,
    history: [
      {
        role: 'user',
        content: `my timezone is "${state.user?.timezone || 'Pacific Standard Time'}"`,
      },
    ],
  });

  return new ChatPrompt({
    history: state.history,
    instructions: [
      'You are an ai assistant that runs in Microsoft Teams.',
      'You are great at helping users.',
      'Use the users local timezone.',
    ].join('\n'),
    model: new OpenAIChatModel({
      model: 'gpt-4o',
      apiKey: process.env.OPENAI_API_KEY,
    }),
  })
    .function('get_user', 'get the user account of the user speaking with you', async () => {
      log.debug('get_user');
      return state.user;
    })
    .function(
      'chat_calendar_assistant',
      'ask the calendar assistant a question or to perform a task',
      {
        type: 'object',
        properties: {
          text: { type: 'string' },
        },
        required: ['text'],
      },
      ({ text }: ChatCalendarAssistantArgs) => {
        log.debug('chat_calendar_assistant');
        return calendarPrompt.chat(text);
      }
    );
}
