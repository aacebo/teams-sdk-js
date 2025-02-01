import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './index-types.d.ts';
import { CountClient } from './count';
import { DeltaClient } from './delta';
import { HostedContentsClient } from './hostedContents';
import { SetReactionClient } from './setReaction';
import { SoftDeleteClient } from './softDelete';
import { UndoSoftDeleteClient } from './undoSoftDelete';
import { UnsetReactionClient } from './unsetReaction';

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
 * /teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/replies
 * Provides operations to manage the replies property of the microsoft.graph.chatMessage entity.
 */
export class RepliesClient {
  protected baseUrl = '/teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/replies';
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
   * `/teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/replies/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `/teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/replies/delta`
   *
   * Provides operations to call the delta method.
   */
  get delta() {
    return new DeltaClient(this.http);
  }

  /**
   * `/teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/replies/{chatMessage-id1}/hostedContents`
   *
   * Provides operations to manage the hostedContents property of the microsoft.graph.chatMessage entity.
   */
  hostedContents(chatMessageId1: string) {
    return new HostedContentsClient(chatMessageId1, this.http);
  }

  /**
   * `/teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/replies/{chatMessage-id1}/setReaction`
   *
   * Provides operations to call the setReaction method.
   */
  setReaction(chatMessageId1: string) {
    return new SetReactionClient(chatMessageId1, this.http);
  }

  /**
   * `/teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/replies/{chatMessage-id1}/softDelete`
   *
   * Provides operations to call the softDelete method.
   */
  softDelete(chatMessageId1: string) {
    return new SoftDeleteClient(chatMessageId1, this.http);
  }

  /**
   * `/teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/replies/{chatMessage-id1}/undoSoftDelete`
   *
   * Provides operations to call the undoSoftDelete method.
   */
  undoSoftDelete(chatMessageId1: string) {
    return new UndoSoftDeleteClient(chatMessageId1, this.http);
  }

  /**
   * `/teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/replies/{chatMessage-id1}/unsetReaction`
   *
   * Provides operations to call the unsetReaction method.
   */
  unsetReaction(chatMessageId1: string) {
    return new UnsetReactionClient(chatMessageId1, this.http);
  }

  /**
   * `DELETE /teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/replies/{chatMessage-id1}`
   *
   */
  async delete(
    body: Endpoints['DELETE /teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/replies/{chatMessage-id1}']['body'],
    params?: Endpoints['DELETE /teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/replies/{chatMessage-id1}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/replies/{chatMessage-id1}',
      [
        { name: 'If-Match', in: 'header' },
        { name: 'team-id', in: 'path' },
        { name: 'channel-id', in: 'path' },
        { name: 'chatMessage-id', in: 'path' },
        { name: 'chatMessage-id1', in: 'path' },
      ],
      {
        ...(params || {}),
        'chatMessage-id': this.chatMessageId,
      }
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints['DELETE /teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/replies/{chatMessage-id1}']['response']
      );
  }

  /**
   * `GET /teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/replies`
   *
   * List all the replies to a message in a channel of a team. This method lists only the replies of the specified message, if any. To get the message itself, call get channel message.
   */
  async list(
    params?: Endpoints['GET /teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/replies']['parameters']
  ) {
    const url = getInjectedUrl(
      '/teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/replies',
      [
        { name: '$orderby', in: 'query' },
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
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
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints['GET /teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/replies']['response']
      );
  }

  /**
   * `GET /teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/replies/{chatMessage-id1}`
   *
   * Retrieve a single message or a message reply in a channel or a chat.
   */
  async get(
    params?: Endpoints['GET /teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/replies/{chatMessage-id1}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/replies/{chatMessage-id1}',
      [
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'team-id', in: 'path' },
        { name: 'channel-id', in: 'path' },
        { name: 'chatMessage-id', in: 'path' },
        { name: 'chatMessage-id1', in: 'path' },
      ],
      {
        ...(params || {}),
        'chatMessage-id': this.chatMessageId,
      }
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints['GET /teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/replies/{chatMessage-id1}']['response']
      );
  }

  /**
   * `PATCH /teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/replies/{chatMessage-id1}`
   *
   */
  async update(
    body: Endpoints['PATCH /teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/replies/{chatMessage-id1}']['body'],
    params?: Endpoints['PATCH /teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/replies/{chatMessage-id1}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/replies/{chatMessage-id1}',
      [
        { name: 'team-id', in: 'path' },
        { name: 'channel-id', in: 'path' },
        { name: 'chatMessage-id', in: 'path' },
        { name: 'chatMessage-id1', in: 'path' },
      ],
      {
        ...(params || {}),
        'chatMessage-id': this.chatMessageId,
      }
    );

    return this.http
      .patch(url, body)
      .then(
        (res) =>
          res.data as Endpoints['PATCH /teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/replies/{chatMessage-id1}']['response']
      );
  }

  /**
   * `POST /teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/replies`
   *
   * Send a new reply to a chatMessage in a specified channel.
   */
  async create(
    body: Endpoints['POST /teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/replies']['body'],
    params?: Endpoints['POST /teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/replies']['parameters']
  ) {
    const url = getInjectedUrl(
      '/teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/replies',
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
          res.data as Endpoints['POST /teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/replies']['response']
      );
  }
}
