import { ChatPrompt } from '@teams/ai';
import { AppTokens } from '@teams/apps';
import { OpenAIChatModel } from '@teams/openai';
import { ConsoleLogger, Logger } from '@teams/common/logging';

import { Client } from '@microsoft/microsoft-graph-client';
import * as MSGraph from '@microsoft/microsoft-graph-types';

import { State } from '../state';
import { graph } from '../graph';

interface SearchArgs {
  readonly query: string;
}

export class SearchPrompt extends ChatPrompt {
  private readonly _state: State;
  private readonly _log: Logger;
  private readonly _graph: Client;

  constructor(tokens: AppTokens, state: State) {
    const log = new ConsoleLogger({
      level: 'debug',
      name: '@apps/copilot/prompts/search',
    });

    super({
      instructions: [
        'You are an ai assistant that runs in Microsoft Teams.',
        'You are great at helping users search their drive/chats/emails/sharepoint.',
      ].join('\n'),
      model: new OpenAIChatModel({
        model: 'gpt-4o',
        logger: log,
        apiKey: process.env.OPENAI_API_KEY,
      }),
    });

    this._state = state;
    this._log = log;
    log.debug(tokens.graph?.toString());
    this._graph = graph(tokens.graph!.toString());

    this.function(
      'get_user',
      'get the user account of the user speaking with you',
      this.getUser.bind(this)
    );

    this.function(
      'search_user_chat_messages',
      'search the users chat messages',
      {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'the query text to search for',
          },
        },
        required: ['query'],
      },
      this.searchUserChatMessages.bind(this)
    );
  }

  protected getUser() {
    this._log.debug('get_user');
    return this._state.user;
  }

  protected async searchUserChatMessages({ query }: SearchArgs) {
    this._log.debug('search_user_chat_messages');
    const res: Record<'value', MSGraph.SearchResponse[]> = await this._graph
      .api('/search/query')
      .post({
        requests: [
          {
            entityTypes: ['chatMessage'],
            query: { queryString: query },
            from: 0,
            size: 25,
          },
        ],
      });

    return res.value;
  }
}
