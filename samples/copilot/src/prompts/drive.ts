import { ChatPrompt } from '@teams/ai';
import { OpenAIChatModel } from '@teams/openai';
import { ConsoleLogger, Logger } from '@teams/common/logging';
import { Client } from '@microsoft/microsoft-graph-client';
import * as MSGraph from '@microsoft/microsoft-graph-types';

import { State } from '../state';
import { graph } from '../graph';

interface SearchDriveItemsArgs {
  readonly query: string;
}

export class DrivePrompt extends ChatPrompt {
  private readonly _state: State;
  private readonly _log: Logger;
  private readonly _graph: Client;

  constructor(state: State) {
    const log = new ConsoleLogger({
      level: 'debug',
      name: '@samples/copilot/prompts/drive',
    });

    super({
      instructions: [
        'You are an ai assistant that runs in Microsoft Teams.',
        'You are great at helping users search their drive for files/documents.',
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

    this.function(
      'get_user',
      'get the user account of the user speaking with you',
      this.getUser.bind(this)
    );

    this.function(
      'search_user_drive',
      'search the users drive for files/documents',
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
      this.searchUserDrive.bind(this)
    );
  }

  protected getUser() {
    this._log.debug('get_user');
    return this._state.user;
  }

  protected async searchUserDrive({ query }: SearchDriveItemsArgs) {
    this._log.debug('search_user_drive');
    const res: Record<'value', MSGraph.DriveItem[]> = await this._graph
      .api('/me/drive/root/search')
      .query({ q: query, $top: 10 })
      .get();

    return res.value;
  }
}
