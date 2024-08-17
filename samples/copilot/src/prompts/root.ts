import { ChatPrompt } from '@teams/ai';
import { OpenAIChatModel } from '@teams/openai';
import { ConsoleLogger, Logger } from '@teams/common/logging';

import { State } from '../state';
import { CalendarPrompt } from './calendar';

interface ChatCalendarAssistantArgs {
  readonly text: string;
}

export class RootPrompt extends ChatPrompt {
  private readonly _state: State;
  private readonly _calendar: CalendarPrompt;
  private readonly _log: Logger;

  constructor(state: State) {
    super({
      history: state.history,
      instructions: [
        'You are an ai assistant that runs in Microsoft Teams.',
        'You are great at helping users.',
        'Use the users local timezone.',
      ].join('\n'),
      model: new OpenAIChatModel({
        model: 'gpt-4o',
        apiKey: process.env.OPENAI_API_KEY,
        stream: true,
      }),
    });

    this._state = state;
    this._calendar = new CalendarPrompt({
      ...state,
      history: [
        {
          role: 'user',
          content: `my timezone is "${state.user?.timezone || 'Pacific Standard Time'}"`,
        },
      ],
    });

    this._log = new ConsoleLogger({
      level: 'debug',
      name: '@samples/copilot/prompts/root',
    });

    this.function(
      'get_user',
      'get the user account of the user speaking with you',
      this.getUser.bind(this)
    );

    this.function(
      'chat_calendar_assistant',
      'ask the calendar assistant a question or to perform a task',
      {
        type: 'object',
        properties: {
          text: { type: 'string' },
        },
        required: ['text'],
      },
      this.chatCalendarAssistant.bind(this)
    );
  }

  protected getUser() {
    this._log.debug('get_user');
    return this._state.user;
  }

  protected chatCalendarAssistant({ text }: ChatCalendarAssistantArgs) {
    this._log.debug('chat_calendar_assistant');
    return this._calendar.chat(text);
  }
}
