import qs from 'qs';
import axios, { AxiosInstance, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './index-types.d.ts';
import { CountClient } from './count';
import { MessageClient } from './message';

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
 * /chats/{chat-id}/pinnedMessages
 * Provides operations to manage the pinnedMessages property of the microsoft.graph.chat entity.
 */
export class PinnedMessagesClient {
  protected baseUrl = '/chats/{chat-id}/pinnedMessages';
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
   * `/chats/{chat-id}/pinnedMessages/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `/chats/{chat-id}/pinnedMessages/{pinnedChatMessageInfo-id}/message`
   *
   * Provides operations to manage the message property of the microsoft.graph.pinnedChatMessageInfo entity.
   */
  message(pinnedChatMessageInfoId: string) {
    return new MessageClient(pinnedChatMessageInfoId, this.http);
  }

  /**
   * `DELETE /chats/{chat-id}/pinnedMessages/{pinnedChatMessageInfo-id}`
   *
   * Unpin a message from a chat.
   */
  async delete(
    params?: Endpoints['DELETE /chats/{chat-id}/pinnedMessages/{pinnedChatMessageInfo-id}']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl(
      '/chats/{chat-id}/pinnedMessages/{pinnedChatMessageInfo-id}',
      [
        { name: 'If-Match', in: 'header' },
        { name: 'chat-id', in: 'path' },
        { name: 'pinnedChatMessageInfo-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'chat-id': this.chatId,
      }
    );

    return this.http
      .delete(url, config)
      .then(
        (res) =>
          res.data as Endpoints['DELETE /chats/{chat-id}/pinnedMessages/{pinnedChatMessageInfo-id}']['response']
      );
  }

  /**
   * `GET /chats/{chat-id}/pinnedMessages`
   *
   * Get a list of pinnedChatMessages in a chat.
   */
  async list(
    params?: Endpoints['GET /chats/{chat-id}/pinnedMessages']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl(
      '/chats/{chat-id}/pinnedMessages',
      [
        { name: '$orderby', in: 'query' },
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'chat-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'chat-id': this.chatId,
      }
    );

    return this.http
      .get(url, config)
      .then((res) => res.data as Endpoints['GET /chats/{chat-id}/pinnedMessages']['response']);
  }

  /**
   * `GET /chats/{chat-id}/pinnedMessages/{pinnedChatMessageInfo-id}`
   *
   * A collection of all the pinned messages in the chat. Nullable.
   */
  async get(
    params?: Endpoints['GET /chats/{chat-id}/pinnedMessages/{pinnedChatMessageInfo-id}']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl(
      '/chats/{chat-id}/pinnedMessages/{pinnedChatMessageInfo-id}',
      [
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'chat-id', in: 'path' },
        { name: 'pinnedChatMessageInfo-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'chat-id': this.chatId,
      }
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints['GET /chats/{chat-id}/pinnedMessages/{pinnedChatMessageInfo-id}']['response']
      );
  }

  /**
   * `PATCH /chats/{chat-id}/pinnedMessages/{pinnedChatMessageInfo-id}`
   *
   */
  async update(
    body: Endpoints['PATCH /chats/{chat-id}/pinnedMessages/{pinnedChatMessageInfo-id}']['body'],
    params?: Endpoints['PATCH /chats/{chat-id}/pinnedMessages/{pinnedChatMessageInfo-id}']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl(
      '/chats/{chat-id}/pinnedMessages/{pinnedChatMessageInfo-id}',
      [
        { name: 'chat-id', in: 'path' },
        { name: 'pinnedChatMessageInfo-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'chat-id': this.chatId,
      }
    );

    return this.http
      .patch(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints['PATCH /chats/{chat-id}/pinnedMessages/{pinnedChatMessageInfo-id}']['response']
      );
  }

  /**
   * `POST /chats/{chat-id}/pinnedMessages`
   *
   * Pin a chat message in the specified chat. This API cannot create a new chat; you must use the list chats method to retrieve the ID of an existing chat before you can pin a chat message.
   */
  async create(
    body: Endpoints['POST /chats/{chat-id}/pinnedMessages']['body'],
    params?: Endpoints['POST /chats/{chat-id}/pinnedMessages']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl(
      '/chats/{chat-id}/pinnedMessages',
      [{ name: 'chat-id', in: 'path' }],
      {
        ...(params || {}),
        'chat-id': this.chatId,
      }
    );

    return this.http
      .post(url, body, config)
      .then((res) => res.data as Endpoints['POST /chats/{chat-id}/pinnedMessages']['response']);
  }
}
