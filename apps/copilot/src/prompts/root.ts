import { ChatPrompt } from '@teams/ai';
import { OpenAIChatModel } from '@teams/openai';
import { ConsoleLogger, Logger } from '@teams/common/logging';

import { State } from '../state';
import { CalendarPrompt } from './calendar';
import { DrivePrompt } from './drive';

interface ChatCalendarAssistantArgs {
  readonly text: string;
}

interface ChatDriveAssistantArgs {
  readonly text: string;
}

export class RootPrompt extends ChatPrompt {
  private readonly _state: State;
  private readonly _log: Logger;
  private readonly _calendar: CalendarPrompt;
  private readonly _drive: DrivePrompt;

  constructor(state: State) {
    const log = new ConsoleLogger({
      level: 'debug',
      name: '@apps/copilot/prompts/root',
    });

    super({
      history: state.chat.history,
      instructions: [
        'You are an ai assistant that runs in Microsoft Teams.',
        'You are great at helping users.',
        'Use the users local timezone.',
      ].join('\n'),
      model: new OpenAIChatModel({
        model: 'gpt-4o',
        apiKey: process.env.OPENAI_API_KEY,
        logger: log,
      }),
    });

    this._state = state;
    this._log = log;
    this._calendar = new CalendarPrompt(state);
    this._drive = new DrivePrompt(state);

    this.function(
      'get_user',
      'get the user account of the user speaking with you',
      this.getUser.bind(this)
    );

    this.function(
      'calendar_assistant',
      'ask the calendar assistant a question or to perform a task for anything regarding the users calendar',
      {
        type: 'object',
        properties: {
          text: { type: 'string' },
        },
        required: ['text'],
      },
      this.calendarAssistant.bind(this)
    );

    this.function(
      'drive_assistant',
      'ask the drive assistant a question or to perform a task for anything regarding the users drive files/documents',
      {
        type: 'object',
        properties: {
          text: { type: 'string' },
        },
        required: ['text'],
      },
      this.driveAssistant.bind(this)
    );
  }

  protected getUser() {
    this._log.debug('get_user');
    return this._state.user.user;
  }

  protected calendarAssistant({ text }: ChatCalendarAssistantArgs) {
    this._log.debug('calendar_assistant');
    return this._calendar.chat(text);
  }

  protected driveAssistant({ text }: ChatDriveAssistantArgs) {
    this._log.debug('drive_assistant');
    return this._drive.chat(text);
  }
}
