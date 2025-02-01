import qs from 'qs';
import axios, { AxiosInstance, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './value-types.d.ts';

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
 * /me/photo/value
 * Provides operations to manage the media for the user entity.
 */
export class ValueClient {
  protected baseUrl = '/me/photo/value';
  protected http: AxiosInstance;

  constructor(options?: GraphClientOptions) {
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
   * `DELETE /me/photo/$value`
   *
   * Delete the photo for the signed-in user or the specified group.
   */
  async delete(
    params?: Endpoints['DELETE /me/photo/$value']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl('/me/photo/$value', [{ name: 'If-Match', in: 'header' }], {
      ...(params || {}),
    });

    return this.http
      .delete(url, config)
      .then((res) => res.data as Endpoints['DELETE /me/photo/$value']['response']);
  }

  /**
   * `GET /me/photo/$value`
   *
   * Get the specified profilePhoto or its metadata (profilePhoto properties). The supported sizes of HD photos on Microsoft 365 are as follows: 48x48, 64x64, 96x96, 120x120, 240x240,
360x360, 432x432, 504x504, and 648x648. Photos can be any dimension if they&#x27;re stored in Microsoft Entra ID. You can get the metadata of the largest available photo or specify a size to get the metadata for that photo size.
If the size you request is unavailable, you can still get a smaller size that the user has uploaded and made available.
For example, if the user uploads a photo that is 504x504 pixels, all but the 648x648 size of the photo is available for download.
   */
  async get(params?: Endpoints['GET /me/photo/$value']['parameters'], config?: AxiosRequestConfig) {
    const url = getInjectedUrl('/me/photo/$value', [], {
      ...(params || {}),
    });

    return this.http
      .get(url, config)
      .then((res) => res.data as Endpoints['GET /me/photo/$value']['response']);
  }

  /**
   * `PUT /me/photo/$value`
   *
   * Update the photo for the specified contact, group, team, or user in a tenant. The size of the photo you can update to is limited to 4 MB. You can use either PATCH or PUT for this operation.
   */
  async set(
    body: Endpoints['PUT /me/photo/$value']['body'],
    params?: Endpoints['PUT /me/photo/$value']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl('/me/photo/$value', [], {
      ...(params || {}),
    });

    return this.http
      .put(url, body, config)
      .then((res) => res.data as Endpoints['PUT /me/photo/$value']['response']);
  }
}
