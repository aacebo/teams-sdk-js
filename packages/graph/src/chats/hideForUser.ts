import qs from 'qs';
import axios, { AxiosInstance, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './hideForUser-types.d.ts';

type GraphClientOptions = CreateAxiosDefaults | AxiosInstance;

interface Param {
  readonly in: string;
  readonly name: string;
}

function getInjectedUrl(url: string, params: Array<Param>, data: Record<string, any>) {
  const query: Record<string, any> = {};

  for (const param of params) {
    if (param.in === 'query') {
      query[param.name] = data[param.name];
    }

    if (param.in !== 'path') {
      continue;
    }

    url = url.replace(`{${param.name}}`, data[param.name]);
  }

  return `${url}${qs.stringify(query, { addQueryPrefix: true })}`;
}

/**
 * /chats/{chat-id}/hideForUser
 * Provides operations to call the hideForUser method.
 */
export class HideForUserClient {
  protected baseUrl = '/chats/{chat-id}/hideForUser';
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
   * `POST /chats/{chat-id}/hideForUser`
   *
   * Hide a chat for a user.
   */
  async create(
    body: Endpoints['POST /chats/{chat-id}/hideForUser']['body'],
    params?: Endpoints['POST /chats/{chat-id}/hideForUser']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl('/chats/{chat-id}/hideForUser', [{ name: 'chat-id', in: 'path' }], {
      ...(params || {}),
      'chat-id': this.chatId,
    });

    return this.http
      .post(url, body, config)
      .then((res) => res.data as Endpoints['POST /chats/{chat-id}/hideForUser']['response']);
  }
}
