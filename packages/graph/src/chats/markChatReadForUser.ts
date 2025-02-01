import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './markChatReadForUser-types.d.ts';

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
 * /chats/{chat-id}/markChatReadForUser
 * Provides operations to call the markChatReadForUser method.
 */
export class MarkChatReadForUserClient {
  protected baseUrl = '/chats/{chat-id}/markChatReadForUser';
  protected http: AxiosInstance;

  constructor(
    protected readonly chatId: string,
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
   * `POST /chats/{chat-id}/markChatReadForUser`
   *
   * Mark a chat as read for a user.
   */
  async create(
    body: Endpoints['POST /chats/{chat-id}/markChatReadForUser']['body'],
    params?: Endpoints['POST /chats/{chat-id}/markChatReadForUser']['parameters']
  ) {
    const url = getInjectedUrl(
      '/chats/{chat-id}/markChatReadForUser',
      [{ name: 'chat-id', in: 'path' }],
      {
        ...(params || {}),
        'chat-id': this.chatId,
      }
    );

    return this.http
      .post(url, body)
      .then(
        (res) => res.data as Endpoints['POST /chats/{chat-id}/markChatReadForUser']['response']
      );
  }
}
