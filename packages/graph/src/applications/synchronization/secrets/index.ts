import qs from 'qs';
import * as http from '@teams.sdk/common/http';

import pkg from 'src/../package.json';
import type { Endpoints } from './index-types.d.ts';
import { CountClient } from './count';

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
 * /applications/{application-id}/synchronization/secrets
 */
export class SecretsClient {
  protected baseUrl = '/applications/{application-id}/synchronization/secrets';
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
   * `/applications/{application-id}/synchronization/secrets/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `PUT /applications/{application-id}/synchronization/secrets`
   *
   */
  async set(
    body: Endpoints['PUT /applications/{application-id}/synchronization/secrets']['body'],
    params?: Endpoints['PUT /applications/{application-id}/synchronization/secrets']['parameters'],
    config?: http.RequestConfig
  ) {
    const url = getInjectedUrl(
      '/applications/{application-id}/synchronization/secrets',
      [{ name: 'application-id', in: 'path' }],
      {
        ...(params || {}),
      }
    );

    return this.http
      .put(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints['PUT /applications/{application-id}/synchronization/secrets']['response']
      );
  }
}
