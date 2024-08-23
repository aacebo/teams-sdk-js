import { ChatPrompt, ContentPart } from '@teams/ai';
import { Attachment, cardAttachment } from '@teams/api';
import { OpenAIChatModel } from '@teams/openai';
import { ConsoleLogger, Logger } from '@teams/common/logging';

import { Client } from '@microsoft/microsoft-graph-client';
import * as MSGraph from '@microsoft/microsoft-graph-types';

import { State } from '../state';
import { graph } from '../graph';
import * as cards from '../cards';

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
        'A pdf (PDF) file/document will end in ".pdf"',
        'A word file/document will end in ".doc" or ".docx"',
        'An image file/document will end in ".png", ".jpg", or ".jpeg"',
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
      const thumbnails: Record<'value', MSGraph.ThumbnailSet[]> = await this._graph
        .api(`/me/drive/items/${item.id}/thumbnails`)
        .get();
      const link: Record<'link', MSGraph.SharingLink> = await this._graph
        .api(`/me/drive/items/${item.id}/createLink`)
        .post({
          type: 'view',
          scope: 'organization',
        });

      this._attachments.push(
        cardAttachment(
          'adaptive',
          cards.driveItem({
            item,
            link: link.link,
            thumbnails: thumbnails.value[0],
          })
        )
      );
    }

    return `${res.value.length} files/documents have been sent to the user`;
  }
}
