import qs from 'qs';
import * as http from '@teams.sdk/common/http';

import pkg from 'src/../package.json';
import type { Endpoints } from './value-types.d.ts';

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
 * /teams/{team-id}/primaryChannel/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}/value
 * Provides operations to manage the media for the team entity.
 */
export class ValueClient {
  protected baseUrl =
    '/teams/{team-id}/primaryChannel/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}/value';
  protected http: http.Client;

  constructor(
    protected readonly chatMessageHostedContentId: string,
    options?: http.Client | http.ClientOptions
  ) {
    if (!options) {
      this.http = new http.Client({
        baseUrl: 'https://graph.microsoft.com/v1.0',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': `teams[graph]/${pkg.version}`,
        },
      });
    } else if ('request' in options) {
      this.http = options;
    } else {
      this.http = new http.Client({
        ...options,
        baseUrl: 'https://graph.microsoft.com/v1.0',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': `teams[graph]/${pkg.version}`,
          ...options.headers,
        },
      });
    }
  }

  /**
   * `DELETE /teams/{team-id}/primaryChannel/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}/$value`
   *
   * The unique identifier for an entity. Read-only.
   */
  async delete(
    params?: Endpoints['DELETE /teams/{team-id}/primaryChannel/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}/$value']['parameters'],
    config?: http.RequestConfig
  ) {
    const url = getInjectedUrl(
      '/teams/{team-id}/primaryChannel/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}/$value',
      [
        { name: 'If-Match', in: 'header' },
        { name: 'team-id', in: 'path' },
        { name: 'chatMessage-id', in: 'path' },
        { name: 'chatMessageHostedContent-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'chatMessageHostedContent-id': this.chatMessageHostedContentId,
      }
    );

    return this.http
      .delete(url, config)
      .then(
        (res) =>
          res.data as Endpoints['DELETE /teams/{team-id}/primaryChannel/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}/$value']['response']
      );
  }

  /**
   * `GET /teams/{team-id}/primaryChannel/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}/$value`
   *
   * The unique identifier for an entity. Read-only.
   */
  async get(
    params?: Endpoints['GET /teams/{team-id}/primaryChannel/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}/$value']['parameters'],
    config?: http.RequestConfig
  ) {
    const url = getInjectedUrl(
      '/teams/{team-id}/primaryChannel/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}/$value',
      [
        { name: 'team-id', in: 'path' },
        { name: 'chatMessage-id', in: 'path' },
        { name: 'chatMessageHostedContent-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'chatMessageHostedContent-id': this.chatMessageHostedContentId,
      }
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints['GET /teams/{team-id}/primaryChannel/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}/$value']['response']
      );
  }

  /**
   * `PUT /teams/{team-id}/primaryChannel/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}/$value`
   *
   * The unique identifier for an entity. Read-only.
   */
  async set(
    body: Endpoints['PUT /teams/{team-id}/primaryChannel/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}/$value']['body'],
    params?: Endpoints['PUT /teams/{team-id}/primaryChannel/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}/$value']['parameters'],
    config?: http.RequestConfig
  ) {
    const url = getInjectedUrl(
      '/teams/{team-id}/primaryChannel/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}/$value',
      [
        { name: 'team-id', in: 'path' },
        { name: 'chatMessage-id', in: 'path' },
        { name: 'chatMessageHostedContent-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'chatMessageHostedContent-id': this.chatMessageHostedContentId,
      }
    );

    return this.http
      .put(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints['PUT /teams/{team-id}/primaryChannel/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}/$value']['response']
      );
  }
}
