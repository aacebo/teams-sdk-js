import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './undoDelete-types.d.ts';

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
 * /teamwork/deletedChats/{deletedChat-id}/undoDelete
 * Provides operations to call the undoDelete method.
 */
export class UndoDeleteClient {
  protected baseUrl = '/teamwork/deletedChats/{deletedChat-id}/undoDelete';
  protected http: AxiosInstance;

  constructor(
    protected readonly deletedChatId: string,
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
   * `POST /teamwork/deletedChats/{deletedChat-id}/undoDelete`
   *
   * Restore a  deletedChat to an active chat.
   */
  async create(
    body: Endpoints['POST /teamwork/deletedChats/{deletedChat-id}/undoDelete']['body'],
    params?: Endpoints['POST /teamwork/deletedChats/{deletedChat-id}/undoDelete']['parameters']
  ) {
    const url = getInjectedUrl(
      '/teamwork/deletedChats/{deletedChat-id}/undoDelete',
      [{ name: 'deletedChat-id', in: 'path' }],
      {
        ...(params || {}),
        'deletedChat-id': this.deletedChatId,
      }
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints['POST /teamwork/deletedChats/{deletedChat-id}/undoDelete']['response']
      );
  }
}
