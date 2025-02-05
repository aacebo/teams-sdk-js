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
 * /communications/callRecords/{callRecord-id}/participantsv2
 * Provides operations to manage the participants_v2 property of the microsoft.graph.callRecords.callRecord entity.
 */
export class Participantsv2Client {
  protected baseUrl = '/communications/callRecords/{callRecord-id}/participantsv2';
  protected http: http.Client;

  constructor(
    protected readonly callRecordId: string,
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
      this.http = options.clone({
        baseUrl: 'https://graph.microsoft.com/v1.0',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': `teams[graph]/${pkg.version}`,
        },
      });
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
   * `/communications/callRecords/{callRecord-id}/participantsv2/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `DELETE /communications/callRecords/{callRecord-id}/participants_v2/{participant-id}`
   *
   */
  async delete(
    params?: Endpoints['DELETE /communications/callRecords/{callRecord-id}/participants_v2/{participant-id}']['parameters'],
    config?: http.RequestConfig
  ) {
    const url = getInjectedUrl(
      '/communications/callRecords/{callRecord-id}/participants_v2/{participant-id}',
      [
        { name: 'If-Match', in: 'header' },
        { name: 'callRecord-id', in: 'path' },
        { name: 'participant-id', in: 'path' },
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
          res.data as Endpoints['DELETE /communications/callRecords/{callRecord-id}/participants_v2/{participant-id}']['response']
      );
  }

  /**
   * `GET /communications/callRecords/{callRecord-id}/participants_v2`
   *
   * Get the list of participant objects associated with a callRecord.
   */
  async get(
    params?: Endpoints['GET /communications/callRecords/{callRecord-id}/participants_v2']['parameters'],
    config?: http.RequestConfig
  ) {
    const url = getInjectedUrl(
      '/communications/callRecords/{callRecord-id}/participants_v2',
      [
        { name: '$orderby', in: 'query' },
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
          res.data as Endpoints['GET /communications/callRecords/{callRecord-id}/participants_v2']['response']
      );
  }

  /**
   * `GET /communications/callRecords/{callRecord-id}/participants_v2/{participant-id}`
   *
   * List of distinct participants in the call.
   */
  async get$1(
    params?: Endpoints['GET /communications/callRecords/{callRecord-id}/participants_v2/{participant-id}']['parameters'],
    config?: http.RequestConfig
  ) {
    const url = getInjectedUrl(
      '/communications/callRecords/{callRecord-id}/participants_v2/{participant-id}',
      [
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'callRecord-id', in: 'path' },
        { name: 'participant-id', in: 'path' },
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
          res.data as Endpoints['GET /communications/callRecords/{callRecord-id}/participants_v2/{participant-id}']['response']
      );
  }

  /**
   * `PATCH /communications/callRecords/{callRecord-id}/participants_v2/{participant-id}`
   *
   */
  async update(
    body: Endpoints['PATCH /communications/callRecords/{callRecord-id}/participants_v2/{participant-id}']['body'],
    params?: Endpoints['PATCH /communications/callRecords/{callRecord-id}/participants_v2/{participant-id}']['parameters'],
    config?: http.RequestConfig
  ) {
    const url = getInjectedUrl(
      '/communications/callRecords/{callRecord-id}/participants_v2/{participant-id}',
      [
        { name: 'callRecord-id', in: 'path' },
        { name: 'participant-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'callRecord-id': this.callRecordId,
      }
    );

    return this.http
      .patch(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints['PATCH /communications/callRecords/{callRecord-id}/participants_v2/{participant-id}']['response']
      );
  }

  /**
   * `POST /communications/callRecords/{callRecord-id}/participants_v2`
   *
   */
  async create(
    body: Endpoints['POST /communications/callRecords/{callRecord-id}/participants_v2']['body'],
    params?: Endpoints['POST /communications/callRecords/{callRecord-id}/participants_v2']['parameters'],
    config?: http.RequestConfig
  ) {
    const url = getInjectedUrl(
      '/communications/callRecords/{callRecord-id}/participants_v2',
      [{ name: 'callRecord-id', in: 'path' }],
      {
        ...(params || {}),
        'callRecord-id': this.callRecordId,
      }
    );

    return this.http
      .post(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints['POST /communications/callRecords/{callRecord-id}/participants_v2']['response']
      );
  }
}
