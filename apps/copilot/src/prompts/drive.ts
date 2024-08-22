import { ChatPrompt, ContentPart } from '@teams/ai';
import { Attachment, cardAttachment } from '@teams/api';
import { OpenAIChatModel } from '@teams/openai';
import { ConsoleLogger, Logger } from '@teams/common/logging';

import { Client } from '@microsoft/microsoft-graph-client';
import * as MSGraph from '@microsoft/microsoft-graph-types';

import { State } from '../state';
import { graph } from '../graph';

interface SearchDriveItemsArgs {
  readonly query: string;
}

export class DrivePrompt {
  private readonly _prompt: ChatPrompt;
  private readonly _state: State;
  private readonly _log: Logger;
  private readonly _graph: Client;

  private _attachments: Attachment[] = [];

  constructor(state: State) {
    const log = new ConsoleLogger({
      level: 'debug',
      name: '@apps/copilot/prompts/drive',
    });

    this._prompt = new ChatPrompt({
      instructions: [
        'You are an ai assistant that runs in Microsoft Teams.',
        'You are great at helping users search their drive for files/documents.',
        'You must use render functions to display files/documents.',
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
      this.getUser.bind(this)
    );

    this._prompt.function(
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

  async chat(input: string | ContentPart[]) {
    this._attachments = [];
    const text = await this._prompt.chat(input);
    return { text, attachments: this._attachments };
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

    for (const item of res.value) {
      this._attachments.push(
        cardAttachment('adaptive', {
          type: 'AdaptiveCard',
          version: '1.6',
          body: [
            {
              type: 'ColumnSet',
              columns: [
                {
                  type: 'Column',
                  items: [
                    {
                      type: 'Image',
                      width: '50px',
                      url: 'https://cdn-icons-png.flaticon.com/512/11180/11180756.png',
                    },
                  ],
                },
                {
                  type: 'Column',
                  items: [
                    {
                      type: 'TextBlock',
                      text: item.name || '<no name>',
                      style: 'heading',
                      weight: 'bolder',
                      horizontalAlignment: 'left',
                    },
                    {
                      type: 'TextBlock',
                      text: `${item.size || 0} bytes`,
                      horizontalAlignment: 'left',
                    },
                  ],
                },
              ],
            },
          ],
          actions: [
            {
              type: 'Action.OpenUrl',
              title: 'Open',
              url: item.webUrl || '#',
            },
          ],
        })
      );
    }

    return res.value;
  }
}
