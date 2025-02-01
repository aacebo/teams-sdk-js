import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './undoSoftDelete-types.d.ts';

type GraphClientOptions = CreateAxiosDefaults | AxiosInstance;

interface Param {
  readonly in: string;
  readonly name: string;
}

function getInjectedUrl(url: string, params: Array<Param>, data: Record<string, any>) {
  for (const param of params) {
    if (param.in !== 'path') continue;
    url = url.replace(`{${param.name}}`, data[param.name]);
  }

  return url;
}

/**
 * /teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/undoSoftDelete
 * Provides operations to call the undoSoftDelete method.
 */
export class UndoSoftDeleteClient {
  protected baseUrl =
    '/teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/undoSoftDelete';
  protected http: AxiosInstance;

  constructor(
    protected readonly chatMessageId: string,
    options?: GraphClientOptions
  ) {
    if (!options) {
      this.http = axios.create({
        baseURL: 'https://graph.microsoft.com/v1.0',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': `teams[graph]/${pkg.version}`,
        },
      });
    } else if ('get' in options) {
      this.http = options;
    } else {
      this.http = axios.create({
        ...options,
        baseURL: 'https://graph.microsoft.com/v1.0',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': `teams[graph]/${pkg.version}`,
          ...options.headers,
        },
      });
    }
  }

  /**
   * `POST /teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/undoSoftDelete`
   *
   * Undo soft deletion of a single chatMessage or a chat message reply in a channel or a chat.
   */
  async create(
    body: Endpoints['POST /teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/undoSoftDelete']['body'],
    params?: Endpoints['POST /teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/undoSoftDelete']['parameters']
  ) {
    const url = getInjectedUrl(
      '/teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/undoSoftDelete',
      [
        { name: 'team-id', in: 'path' },
        { name: 'channel-id', in: 'path' },
        { name: 'chatMessage-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'chatMessage-id': this.chatMessageId,
      }
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints['POST /teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/undoSoftDelete']['response']
      );
  }
}
