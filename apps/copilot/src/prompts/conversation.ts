import { ChatPrompt, ContentPart } from '@teams.sdk/ai';
import { Attachment } from '@teams.sdk/api';
import { OpenAIChatModel } from '@teams.sdk/openai';
import { ConsoleLogger, Logger } from '@teams.sdk/common/logging';
import { subDays } from 'date-fns';

import { Client } from '@microsoft/microsoft-graph-client';
import * as MSGraph from '@microsoft/microsoft-graph-types';

import { State } from '../state';
import { graph } from '../graph';

interface GetMessagesArgs {
  readonly count?: number;
  readonly start?: string;
  readonly end?: string;
}

export class ConversationPrompt {
  private readonly _prompt: ChatPrompt;
  private readonly _state: State;
  private readonly _log: Logger;
  private readonly _graph: Client;

  private _attachments: Attachment[] = [];

  constructor(state: State) {
    const log = new ConsoleLogger('@apps/copilot/prompts/conversation', {
      level: 'debug',
    });

    this._prompt = new ChatPrompt({
      instructions: [
        'You are an ai assistant that runs in Microsoft Teams.',
        'You are great at helping users by summarizing or answering questions about their Teams Conversation/Messages.',
      ].join('\n'),
      model: new OpenAIChatModel({
        model: 'gpt-4o',
        logger: log,
        apiKey: process.env.OPENAI_API_KEY,
      }),
    });

    this._state = state;
    this._log = log;
    this._graph = graph(state.user.auth?.token || '');

    this._prompt.function(
      'get_user',
      'get the user account of the user speaking with you',
      this._debug('get_user', this.getUser.bind(this))
    );

    this._prompt.function(
      'get_messages',
      'get the conversations messages',
      {
        type: 'object',
        properties: {
          count: {
            type: 'number',
            min: 1,
            max: 50,
            description: 'the number of messages to return',
          },
          start: {
            type: 'string',
            format: 'date-time',
            description: 'the minimum date/time of messages to include',
          },
          end: {
            type: 'string',
            format: 'date-time',
            description: 'the maximum date/time of messages to include',
          },
        },
        required: [],
      },
      this._debug('get_messages', this.getMessages.bind(this))
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

  protected async getMessages({ count, start, end }: GetMessagesArgs) {
    if (!this._state.chat.id) {
      return 'chat not found';
    }

    if (!start) {
      start = subDays(new Date(), 1).toISOString();
    }

    if (!end) {
      end = new Date().toISOString();
    }

    const res: Record<'value', MSGraph.Message[]> = await this._graph
      .api(`/me/chats/${this._state.chat.id}/messages`)
      .filter(`lastModifiedDateTime gt ${start} and lastModifiedDateTime lt ${end}`)
      .orderby('lastModifiedDateTime desc')
      .top(count || 10)
      .get();

    return res.value;
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
