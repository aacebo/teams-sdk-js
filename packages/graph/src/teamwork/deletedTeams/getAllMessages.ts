import qs from 'qs';
import * as http from '@teams.sdk/common/http';

import pkg from 'src/../package.json';
import type { Endpoints } from './getAllMessages-types.d.ts';

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
 * /teamwork/deletedTeams/getAllMessages
 * Provides operations to call the getAllMessages method.
 */
export class GetAllMessagesClient {
  protected baseUrl = '/teamwork/deletedTeams/getAllMessages';
  protected http: http.Client;

  constructor(options?: http.Client | http.ClientOptions) {
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
   * `GET /teamwork/deletedTeams/getAllMessages()`
   *
   */
  async get(
    params?: Endpoints['GET /teamwork/deletedTeams/getAllMessages()']['parameters'],
    config?: http.RequestConfig
  ) {
    const url = getInjectedUrl(
      '/teamwork/deletedTeams/getAllMessages()',
      [
        { name: 'model', in: 'query' },
        { name: '$select', in: 'query' },
        { name: '$orderby', in: 'query' },
        { name: '$expand', in: 'query' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .get(url, config)
      .then(
        (res) => res.data as Endpoints['GET /teamwork/deletedTeams/getAllMessages()']['response']
      );
  }
}
