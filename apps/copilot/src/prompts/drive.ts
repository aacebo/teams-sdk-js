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

interface GetDriveItemContentArgs {
  readonly id: string;
}

export class DrivePrompt {
  private readonly _prompt: ChatPrompt;
  private readonly _state: State;
  private readonly _log: Logger;
  private readonly _graph: Client;

  private _attachments: Attachment[] = [];

  constructor(state: State) {
    const log = new ConsoleLogger('@apps/copilot/prompts/drive', {
      level: 'debug',
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
      this._debug('get_user', this.getUser.bind(this))
    );

    this._prompt.function(
      'get_drive_item_content',
      'get a file/documents content by id',
      {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'the id of the file/document',
          },
        },
        required: ['id'],
      },
      this._debug('get_drive_item_content', this.getDriveItemContent.bind(this))
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
      this._debug('search_user_drive', this.searchUserDrive.bind(this))
    );
  }

  async chat(input: string | ContentPart[]) {
    this._attachments = [];
    const text = await this._prompt.chat(input);
    return { text, attachments: this._attachments };
  }

  protected getUser() {
    return this._state.user;
  }

  protected async getDriveItemContent({ id }: GetDriveItemContentArgs) {
    const driveItem: MSGraph.DriveItem & {
      '@microsoft.graph.downloadUrl': string;
    } = await this._graph.api(`/me/drive/items/${id}`).get();

    if (driveItem.file?.mimeType?.includes('image')) {
      return driveItem.webUrl;
    }

    const stream: ReadableStream<Uint8Array> = await this._graph
      .api(driveItem['@microsoft.graph.downloadUrl'])
      .get();

    const chunks: Buffer[] = [];

    for await (const chunk of stream) {
      chunks.push(Buffer.from(chunk));
    }

    const content = Buffer.concat(chunks).toString('utf-8');
    return content;
  }

  protected async searchUserDrive({ query }: SearchDriveItemsArgs) {
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
