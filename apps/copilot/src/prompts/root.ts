import { ChatPrompt, ContentPart } from '@teams.sdk/ai';
import { Attachment } from '@teams.sdk/api';
import { OpenAIChatModel } from '@teams.sdk/openai';
import { ConsoleLogger, Logger } from '@teams.sdk/common/logging';

import { State } from '../state';
import { CalendarPrompt } from './calendar';
import { DrivePrompt } from './drive';
import { ConversationPrompt } from './conversation';
import { GifPrompt } from './gif';

interface AssistantArgs {
  readonly text: string;
}

export class RootPrompt {
  private readonly _prompt: ChatPrompt;
  private readonly _state: State;
  private readonly _log: Logger;
  private readonly _calendar: CalendarPrompt;
  private readonly _drive: DrivePrompt;
  private readonly _conversation: ConversationPrompt;
  private readonly _gif: GifPrompt;

  private _attachments: Attachment[] = [];

  constructor(state: State) {
    const log = new ConsoleLogger('@apps/copilot/prompts/root', {
      level: 'debug',
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
    this._conversation = new ConversationPrompt(state);
    this._gif = new GifPrompt();

    this._prompt.function(
      'get_user',
      'get the user account of the user speaking with you',
      this._debug('get_user', this.getUser.bind(this))
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
      this._debug('calendar_assistant', this.calendarAssistant.bind(this))
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
      this._debug('drive_assistant', this.driveAssistant.bind(this))
    );

    this._prompt.function(
      'conversation_assistant',
      'ask the conversation assistant a question or to summarize your conversation messages',
      {
        type: 'object',
        properties: {
          text: { type: 'string' },
        },
        required: ['text'],
      },
      this._debug('conversation_assistant', this.conversationAssistant.bind(this))
    );

    this._prompt.function(
      'gif_assistant',
      'ask the GIF assistant a question or to search for GIFs',
      {
        type: 'object',
        properties: {
          text: { type: 'string' },
        },
        required: ['text'],
      },
      this._debug('gif_assistant', this.gifAssistant.bind(this))
    );
  }

  async chat(input: string | ContentPart[]) {
    this._attachments = [];
    const text = await this._prompt.chat(input);
    return { text, attachments: this._attachments };
  }

  protected getUser() {
    return this._state.user.user;
  }

  protected async calendarAssistant({ text }: AssistantArgs) {
    const res = await this._calendar.chat(text);
    this._attachments = this._attachments.concat(res.attachments);
    return res.text;
  }

  protected async driveAssistant({ text }: AssistantArgs) {
    const res = await this._drive.chat(text);
    this._attachments = this._attachments.concat(res.attachments);
    return res.text;
  }

  protected async conversationAssistant({ text }: AssistantArgs) {
    const res = await this._conversation.chat(text);
    this._attachments = this._attachments.concat(res.attachments);
    return res.text;
  }

  protected async gifAssistant({ text }: AssistantArgs) {
    const res = await this._gif.chat(text);
    this._attachments = this._attachments.concat(res.attachments);
    return res.text;
  }

  private _debug(name: string, cb: (args: any) => any | Promise<any>) {
    return async (args: any) => {
      const start = new Date();
      this._log.debug(`${name}...`);
      const res = await cb(args);
      this._log.debug(`${name}: ${Date.now() - start.getTime()}ms`);
      return res;
    };
  }
}
