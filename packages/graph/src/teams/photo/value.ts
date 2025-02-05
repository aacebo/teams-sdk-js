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
 * /teams/{team-id}/photo/value
 * Provides operations to manage the media for the team entity.
 */
export class ValueClient {
  protected baseUrl = '/teams/{team-id}/photo/value';
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
   * `DELETE /teams/{team-id}/photo/$value`
   *
   * The profile photo for the team.
   */
  async delete(
    params?: Endpoints['DELETE /teams/{team-id}/photo/$value']['parameters'],
    config?: http.RequestConfig
  ) {
    const url = getInjectedUrl(
      '/teams/{team-id}/photo/$value',
      [
        { name: 'If-Match', in: 'header' },
        { name: 'team-id', in: 'path' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .delete(url, config)
      .then((res) => res.data as Endpoints['DELETE /teams/{team-id}/photo/$value']['response']);
  }

  /**
   * `GET /teams/{team-id}/photo/$value`
   *
   * Get the specified profilePhoto or its metadata (profilePhoto properties). The supported sizes of HD photos on Microsoft 365 are as follows: 48x48, 64x64, 96x96, 120x120, 240x240,
360x360, 432x432, 504x504, and 648x648. Photos can be any dimension if they&#x27;re stored in Microsoft Entra ID. You can get the metadata of the largest available photo or specify a size to get the metadata for that photo size.
If the size you request is unavailable, you can still get a smaller size that the user has uploaded and made available.
For example, if the user uploads a photo that is 504x504 pixels, all but the 648x648 size of the photo is available for download.
   */
  async get(
    params?: Endpoints['GET /teams/{team-id}/photo/$value']['parameters'],
    config?: http.RequestConfig
  ) {
    const url = getInjectedUrl('/teams/{team-id}/photo/$value', [{ name: 'team-id', in: 'path' }], {
      ...(params || {}),
    });

    return this.http
      .get(url, config)
      .then((res) => res.data as Endpoints['GET /teams/{team-id}/photo/$value']['response']);
  }

  /**
   * `PUT /teams/{team-id}/photo/$value`
   *
   * Update the photo for the specified contact, group, team, or user in a tenant. The size of the photo you can update to is limited to 4 MB. You can use either PATCH or PUT for this operation.
   */
  async set(
    body: Endpoints['PUT /teams/{team-id}/photo/$value']['body'],
    params?: Endpoints['PUT /teams/{team-id}/photo/$value']['parameters'],
    config?: http.RequestConfig
  ) {
    const url = getInjectedUrl('/teams/{team-id}/photo/$value', [{ name: 'team-id', in: 'path' }], {
      ...(params || {}),
    });

    return this.http
      .put(url, body, config)
      .then((res) => res.data as Endpoints['PUT /teams/{team-id}/photo/$value']['response']);
  }
}
