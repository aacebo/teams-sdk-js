import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './index-types.d.ts';
import { CountClient } from './count';
import { SegmentsClient } from './segments';

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
 * /communications/callRecords/{callRecord-id}/sessions
 * Provides operations to manage the sessions property of the microsoft.graph.callRecords.callRecord entity.
 */
export class SessionsClient {
  protected baseUrl = '/communications/callRecords/{callRecord-id}/sessions';
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
   * `/communications/callRecords/{callRecord-id}/sessions/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `/communications/callRecords/{callRecord-id}/sessions/{session-id}/segments`
   *
   * Provides operations to manage the segments property of the microsoft.graph.callRecords.session entity.
   */
  segments(sessionId: string) {
    return new SegmentsClient(sessionId, this.http);
  }

  /**
   * `DELETE /communications/callRecords/{callRecord-id}/sessions/{session-id}`
   *
   */
  async delete(
    body: Endpoints['DELETE /communications/callRecords/{callRecord-id}/sessions/{session-id}']['body'],
    params?: Endpoints['DELETE /communications/callRecords/{callRecord-id}/sessions/{session-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/communications/callRecords/{callRecord-id}/sessions/{session-id}',
      [
        { name: 'If-Match', in: 'header' },
        { name: 'callRecord-id', in: 'path' },
        { name: 'session-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'callRecord-id': this.callRecordId,
      }
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints['DELETE /communications/callRecords/{callRecord-id}/sessions/{session-id}']['response']
      );
  }

  /**
   * `GET /communications/callRecords/{callRecord-id}/sessions`
   *
   * Retrieve the list of sessions associated with a callRecord object. If the sessions list is truncated, a sessions@odata.nextLink value will be provided to retrieve the next page of sessions. The maximum page size for sessions is 60 entries.
   */
  async list(
    params?: Endpoints['GET /communications/callRecords/{callRecord-id}/sessions']['parameters']
  ) {
    const url = getInjectedUrl(
      '/communications/callRecords/{callRecord-id}/sessions',
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
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints['GET /communications/callRecords/{callRecord-id}/sessions']['response']
      );
  }

  /**
   * `GET /communications/callRecords/{callRecord-id}/sessions/{session-id}`
   *
   * List of sessions involved in the call. Peer-to-peer calls typically only have one session, whereas group calls typically have at least one session per participant. Read-only. Nullable.
   */
  async get(
    params?: Endpoints['GET /communications/callRecords/{callRecord-id}/sessions/{session-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/communications/callRecords/{callRecord-id}/sessions/{session-id}',
      [
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'callRecord-id', in: 'path' },
        { name: 'session-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'callRecord-id': this.callRecordId,
      }
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints['GET /communications/callRecords/{callRecord-id}/sessions/{session-id}']['response']
      );
  }

  /**
   * `PATCH /communications/callRecords/{callRecord-id}/sessions/{session-id}`
   *
   */
  async update(
    body: Endpoints['PATCH /communications/callRecords/{callRecord-id}/sessions/{session-id}']['body'],
    params?: Endpoints['PATCH /communications/callRecords/{callRecord-id}/sessions/{session-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/communications/callRecords/{callRecord-id}/sessions/{session-id}',
      [
        { name: 'callRecord-id', in: 'path' },
        { name: 'session-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'callRecord-id': this.callRecordId,
      }
    );

    return this.http
      .patch(url, body)
      .then(
        (res) =>
          res.data as Endpoints['PATCH /communications/callRecords/{callRecord-id}/sessions/{session-id}']['response']
      );
  }

  /**
   * `POST /communications/callRecords/{callRecord-id}/sessions`
   *
   */
  async create(
    body: Endpoints['POST /communications/callRecords/{callRecord-id}/sessions']['body'],
    params?: Endpoints['POST /communications/callRecords/{callRecord-id}/sessions']['parameters']
  ) {
    const url = getInjectedUrl(
      '/communications/callRecords/{callRecord-id}/sessions',
      [{ name: 'callRecord-id', in: 'path' }],
      {
        ...(params || {}),
        'callRecord-id': this.callRecordId,
      }
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints['POST /communications/callRecords/{callRecord-id}/sessions']['response']
      );
  }
}
