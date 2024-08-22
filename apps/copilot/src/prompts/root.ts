import { ChatPrompt, ContentPart } from '@teams/ai';
import { Attachment } from '@teams/api';
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

export class RootPrompt {
  private readonly _prompt: ChatPrompt;
  private readonly _state: State;
  private readonly _log: Logger;
  private readonly _calendar: CalendarPrompt;
  private readonly _drive: DrivePrompt;

  private _attachments: Attachment[] = [];

  constructor(state: State) {
    const log = new ConsoleLogger({
      level: 'debug',
      name: '@apps/copilot/prompts/root',
    });

    this._prompt = new ChatPrompt({
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

    this._prompt.function(
      'get_user',
      'get the user account of the user speaking with you',
      this.getUser.bind(this)
    );

    this._prompt.function(
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

    this._prompt.function(
      'drive_assistant',
      'ask the drive assistant a question or to perform a task',
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

  async chat(input: string | ContentPart[]) {
    this._attachments = [];
    const text = await this._prompt.chat(input);
    return { text, attachments: this._attachments };
  }

  protected getUser() {
    this._log.debug('get_user');
    return this._state.user.user;
  }

  protected async calendarAssistant({ text }: ChatCalendarAssistantArgs) {
    this._log.debug('calendar_assistant');
    const res = await this._calendar.chat(text);
    this._attachments = this._attachments.concat(res.attachments);
    return res.text;
  }

  protected async driveAssistant({ text }: ChatDriveAssistantArgs) {
    this._log.debug('drive_assistant');
    const res = await this._drive.chat(text);
    this._attachments = this._attachments.concat(res.attachments);
    return res.text;
  }
}
