import { ChatPrompt, ContentPart, LocalMemory } from '@teams.sdk/ai';
import { Context } from '@teams.sdk/apps';
import { Attachment, cardAttachment } from '@teams.sdk/api';
import { OpenAIChatModel } from '@teams.sdk/openai';
import { ConsoleLogger, Logger } from '@teams.sdk/common/logging';
import { Card } from '@teams.sdk/cards';

import { State } from '../state';
import { CalendarPrompt } from './calendar';
import { DrivePrompt } from './drive';
import { ConversationPrompt } from './conversation';
import { GifPrompt } from './gif';

interface AssistantArgs {
  readonly text: string;
}

interface SendChatMessageArgs {
  readonly text: string;
  readonly cards?: Card[];
}

export class RootPrompt {
  private readonly _say: Context['say'];
  private readonly _prompt: ChatPrompt;
  private readonly _state: State;
  private readonly _log: Logger;
  private readonly _calendar: CalendarPrompt;
  private readonly _drive: DrivePrompt;
  private readonly _conversation: ConversationPrompt;
  private readonly _gif: GifPrompt;

  private _attachments: Attachment[] = [];

  constructor(say: Context['say'], state: State) {
    const log = new ConsoleLogger('@apps/copilot/prompts/root', {
      level: 'debug',
    });

    const model = new OpenAIChatModel({
      model: 'gpt-4o',
      apiKey: process.env.OPENAI_API_KEY,
      logger: log,
    });

    this._say = say;
    this._prompt = new ChatPrompt({
      model,
      messages: new LocalMemory({
        max: 10,
        messages: state.chat.messages,
        collapse: {
          model,
          strategy: 'half',
        },
      }),
      instructions: [
        'You are an ai assistant that runs in Microsoft Teams.',
        'You are great at helping users.',
        'Use the users local timezone.',
        'When the user references the conversation or chat or messages, assume they are referring to their Teams Chat/Conversation.',
        'Whenever you want to respond to the user you MUST use the `send_chat_message` function.',
      ].join('\n'),
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
      'send_chat_message',
      'send a chat message to the user',
      {
        type: 'object',
        properties: {
          text: {
            type: 'string',
            description: 'the text of the message',
          },
          cards: {
            type: 'array',
            description:
              'an array of adaptive cards https://adaptivecards.io/schemas/adaptive-card.json',
            items: {
              type: 'object',
              description:
                'an adaptive card that follows the official adaptive cards JSON schema https://adaptivecards.io/schemas/adaptive-card.json',
            },
          },
        },
        required: ['text'],
      },
      this._debug('send_chat_message', this.sendChatMessage.bind(this))
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

  protected async sendChatMessage({ text, cards }: SendChatMessageArgs) {
    await this._say({
      type: 'message',
      text,
      attachments: cards?.map((c) => cardAttachment('adaptive', c)),
    });

    return 'the message has been sent.';
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
