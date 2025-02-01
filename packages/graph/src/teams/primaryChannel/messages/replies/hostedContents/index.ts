import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './index-types.d.ts';
import { CountClient } from './count';
import { ValueClient } from './value';

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
 * /teams/{team-id}/primaryChannel/messages/{chatMessage-id}/replies/{chatMessage-id1}/hostedContents
 * Provides operations to manage the hostedContents property of the microsoft.graph.chatMessage entity.
 */
export class HostedContentsClient {
  protected baseUrl =
    '/teams/{team-id}/primaryChannel/messages/{chatMessage-id}/replies/{chatMessage-id1}/hostedContents';
  protected http: AxiosInstance;

  constructor(
    protected readonly chatMessageId1: string,
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
   * `/teams/{team-id}/primaryChannel/messages/{chatMessage-id}/replies/{chatMessage-id1}/hostedContents/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `/teams/{team-id}/primaryChannel/messages/{chatMessage-id}/replies/{chatMessage-id1}/hostedContents/{chatMessageHostedContent-id}/value`
   *
   * Provides operations to manage the media for the team entity.
   */
  value(chatMessageHostedContentId: string) {
    return new ValueClient(chatMessageHostedContentId, this.http);
  }

  /**
   * `DELETE /teams/{team-id}/primaryChannel/messages/{chatMessage-id}/replies/{chatMessage-id1}/hostedContents/{chatMessageHostedContent-id}`
   *
   */
  async delete(
    body: Endpoints['DELETE /teams/{team-id}/primaryChannel/messages/{chatMessage-id}/replies/{chatMessage-id1}/hostedContents/{chatMessageHostedContent-id}']['body'],
    params?: Endpoints['DELETE /teams/{team-id}/primaryChannel/messages/{chatMessage-id}/replies/{chatMessage-id1}/hostedContents/{chatMessageHostedContent-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/teams/{team-id}/primaryChannel/messages/{chatMessage-id}/replies/{chatMessage-id1}/hostedContents/{chatMessageHostedContent-id}',
      [
        { name: 'If-Match', in: 'header' },
        { name: 'team-id', in: 'path' },
        { name: 'chatMessage-id', in: 'path' },
        { name: 'chatMessage-id1', in: 'path' },
        { name: 'chatMessageHostedContent-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'chatMessage-id1': this.chatMessageId1,
      }
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints['DELETE /teams/{team-id}/primaryChannel/messages/{chatMessage-id}/replies/{chatMessage-id1}/hostedContents/{chatMessageHostedContent-id}']['response']
      );
  }

  /**
   * `GET /teams/{team-id}/primaryChannel/messages/{chatMessage-id}/replies/{chatMessage-id1}/hostedContents`
   *
   * Content in a message hosted by Microsoft Teams - for example, images or code snippets.
   */
  async list(
    params?: Endpoints['GET /teams/{team-id}/primaryChannel/messages/{chatMessage-id}/replies/{chatMessage-id1}/hostedContents']['parameters']
  ) {
    const url = getInjectedUrl(
      '/teams/{team-id}/primaryChannel/messages/{chatMessage-id}/replies/{chatMessage-id1}/hostedContents',
      [
        { name: '$orderby', in: 'query' },
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'team-id', in: 'path' },
        { name: 'chatMessage-id', in: 'path' },
        { name: 'chatMessage-id1', in: 'path' },
      ],
      {
        ...(params || {}),
        'chatMessage-id1': this.chatMessageId1,
      }
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints['GET /teams/{team-id}/primaryChannel/messages/{chatMessage-id}/replies/{chatMessage-id1}/hostedContents']['response']
      );
  }

  /**
   * `GET /teams/{team-id}/primaryChannel/messages/{chatMessage-id}/replies/{chatMessage-id1}/hostedContents/{chatMessageHostedContent-id}`
   *
   * Content in a message hosted by Microsoft Teams - for example, images or code snippets.
   */
  async get(
    params?: Endpoints['GET /teams/{team-id}/primaryChannel/messages/{chatMessage-id}/replies/{chatMessage-id1}/hostedContents/{chatMessageHostedContent-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/teams/{team-id}/primaryChannel/messages/{chatMessage-id}/replies/{chatMessage-id1}/hostedContents/{chatMessageHostedContent-id}',
      [
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'team-id', in: 'path' },
        { name: 'chatMessage-id', in: 'path' },
        { name: 'chatMessage-id1', in: 'path' },
        { name: 'chatMessageHostedContent-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'chatMessage-id1': this.chatMessageId1,
      }
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints['GET /teams/{team-id}/primaryChannel/messages/{chatMessage-id}/replies/{chatMessage-id1}/hostedContents/{chatMessageHostedContent-id}']['response']
      );
  }

  /**
   * `PATCH /teams/{team-id}/primaryChannel/messages/{chatMessage-id}/replies/{chatMessage-id1}/hostedContents/{chatMessageHostedContent-id}`
   *
   */
  async update(
    body: Endpoints['PATCH /teams/{team-id}/primaryChannel/messages/{chatMessage-id}/replies/{chatMessage-id1}/hostedContents/{chatMessageHostedContent-id}']['body'],
    params?: Endpoints['PATCH /teams/{team-id}/primaryChannel/messages/{chatMessage-id}/replies/{chatMessage-id1}/hostedContents/{chatMessageHostedContent-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/teams/{team-id}/primaryChannel/messages/{chatMessage-id}/replies/{chatMessage-id1}/hostedContents/{chatMessageHostedContent-id}',
      [
        { name: 'team-id', in: 'path' },
        { name: 'chatMessage-id', in: 'path' },
        { name: 'chatMessage-id1', in: 'path' },
        { name: 'chatMessageHostedContent-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'chatMessage-id1': this.chatMessageId1,
      }
    );

    return this.http
      .patch(url, body)
      .then(
        (res) =>
          res.data as Endpoints['PATCH /teams/{team-id}/primaryChannel/messages/{chatMessage-id}/replies/{chatMessage-id1}/hostedContents/{chatMessageHostedContent-id}']['response']
      );
  }

  /**
   * `POST /teams/{team-id}/primaryChannel/messages/{chatMessage-id}/replies/{chatMessage-id1}/hostedContents`
   *
   */
  async create(
    body: Endpoints['POST /teams/{team-id}/primaryChannel/messages/{chatMessage-id}/replies/{chatMessage-id1}/hostedContents']['body'],
    params?: Endpoints['POST /teams/{team-id}/primaryChannel/messages/{chatMessage-id}/replies/{chatMessage-id1}/hostedContents']['parameters']
  ) {
    const url = getInjectedUrl(
      '/teams/{team-id}/primaryChannel/messages/{chatMessage-id}/replies/{chatMessage-id1}/hostedContents',
      [
        { name: 'team-id', in: 'path' },
        { name: 'chatMessage-id', in: 'path' },
        { name: 'chatMessage-id1', in: 'path' },
      ],
      {
        ...(params || {}),
        'chatMessage-id1': this.chatMessageId1,
      }
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints['POST /teams/{team-id}/primaryChannel/messages/{chatMessage-id}/replies/{chatMessage-id1}/hostedContents']['response']
      );
  }
}
