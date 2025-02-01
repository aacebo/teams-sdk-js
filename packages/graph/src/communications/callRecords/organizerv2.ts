import qs from 'qs';
import axios, { AxiosInstance, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './organizerv2-types.d.ts';

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
 * /communications/callRecords/{callRecord-id}/organizerv2
 * Provides operations to manage the organizer_v2 property of the microsoft.graph.callRecords.callRecord entity.
 */
export class Organizerv2Client {
  protected baseUrl = '/communications/callRecords/{callRecord-id}/organizerv2';
  protected http: AxiosInstance;

  constructor(
    protected readonly callRecordId: string,
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
   * `DELETE /communications/callRecords/{callRecord-id}/organizer_v2`
   *
   */
  async delete(
    params?: Endpoints['DELETE /communications/callRecords/{callRecord-id}/organizer_v2']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl(
      '/communications/callRecords/{callRecord-id}/organizer_v2',
      [
        { name: 'If-Match', in: 'header' },
        { name: 'callRecord-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'callRecord-id': this.callRecordId,
      }
    );

    return this.http
      .delete(url, config)
      .then(
        (res) =>
          res.data as Endpoints['DELETE /communications/callRecords/{callRecord-id}/organizer_v2']['response']
      );
  }

  /**
   * `GET /communications/callRecords/{callRecord-id}/organizer_v2`
   *
   * Identity of the organizer of the call. This relationship is expanded by default in callRecord methods.
   */
  async get(
    params?: Endpoints['GET /communications/callRecords/{callRecord-id}/organizer_v2']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl(
      '/communications/callRecords/{callRecord-id}/organizer_v2',
      [
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'callRecord-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'callRecord-id': this.callRecordId,
      }
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints['GET /communications/callRecords/{callRecord-id}/organizer_v2']['response']
      );
  }

  /**
   * `PATCH /communications/callRecords/{callRecord-id}/organizer_v2`
   *
   */
  async update(
    body: Endpoints['PATCH /communications/callRecords/{callRecord-id}/organizer_v2']['body'],
    params?: Endpoints['PATCH /communications/callRecords/{callRecord-id}/organizer_v2']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl(
      '/communications/callRecords/{callRecord-id}/organizer_v2',
      [{ name: 'callRecord-id', in: 'path' }],
      {
        ...(params || {}),
        'callRecord-id': this.callRecordId,
      }
    );

    return this.http
      .patch(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints['PATCH /communications/callRecords/{callRecord-id}/organizer_v2']['response']
      );
  }
}
