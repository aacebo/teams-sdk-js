import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './index-types.d.ts';
import { AttendanceReportsClient } from './attendanceReports';
import { CountClient } from './count';

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
 * /solutions/virtualEvents/events/{virtualEvent-id}/sessions
 * Provides operations to manage the sessions property of the microsoft.graph.virtualEvent entity.
 */
export class SessionsClient {
  protected baseUrl = '/solutions/virtualEvents/events/{virtualEvent-id}/sessions';
  protected http: AxiosInstance;

  constructor(
    protected readonly virtualEventId: string,
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
   * `/solutions/virtualEvents/events/{virtualEvent-id}/sessions/{virtualEventSession-id}/attendanceReports`
   *
   * Provides operations to manage the attendanceReports property of the microsoft.graph.onlineMeetingBase entity.
   */
  attendanceReports(virtualEventSessionId: string) {
    return new AttendanceReportsClient(virtualEventSessionId, this.http);
  }

  /**
   * `/solutions/virtualEvents/events/{virtualEvent-id}/sessions/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `DELETE /solutions/virtualEvents/events/{virtualEvent-id}/sessions/{virtualEventSession-id}`
   *
   */
  async delete(
    body: Endpoints['DELETE /solutions/virtualEvents/events/{virtualEvent-id}/sessions/{virtualEventSession-id}']['body'],
    params?: Endpoints['DELETE /solutions/virtualEvents/events/{virtualEvent-id}/sessions/{virtualEventSession-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/solutions/virtualEvents/events/{virtualEvent-id}/sessions/{virtualEventSession-id}',
      [
        { name: 'If-Match', in: 'header' },
        { name: 'virtualEvent-id', in: 'path' },
        { name: 'virtualEventSession-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'virtualEvent-id': this.virtualEventId,
      }
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints['DELETE /solutions/virtualEvents/events/{virtualEvent-id}/sessions/{virtualEventSession-id}']['response']
      );
  }

  /**
   * `GET /solutions/virtualEvents/events/{virtualEvent-id}/sessions`
   *
   * The sessions for the virtual event.
   */
  async list(
    params?: Endpoints['GET /solutions/virtualEvents/events/{virtualEvent-id}/sessions']['parameters']
  ) {
    const url = getInjectedUrl(
      '/solutions/virtualEvents/events/{virtualEvent-id}/sessions',
      [
        { name: '$orderby', in: 'query' },
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'virtualEvent-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'virtualEvent-id': this.virtualEventId,
      }
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints['GET /solutions/virtualEvents/events/{virtualEvent-id}/sessions']['response']
      );
  }

  /**
   * `GET /solutions/virtualEvents/events/{virtualEvent-id}/sessions/{virtualEventSession-id}`
   *
   * The sessions for the virtual event.
   */
  async get(
    params?: Endpoints['GET /solutions/virtualEvents/events/{virtualEvent-id}/sessions/{virtualEventSession-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/solutions/virtualEvents/events/{virtualEvent-id}/sessions/{virtualEventSession-id}',
      [
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'virtualEvent-id', in: 'path' },
        { name: 'virtualEventSession-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'virtualEvent-id': this.virtualEventId,
      }
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints['GET /solutions/virtualEvents/events/{virtualEvent-id}/sessions/{virtualEventSession-id}']['response']
      );
  }

  /**
   * `PATCH /solutions/virtualEvents/events/{virtualEvent-id}/sessions/{virtualEventSession-id}`
   *
   */
  async update(
    body: Endpoints['PATCH /solutions/virtualEvents/events/{virtualEvent-id}/sessions/{virtualEventSession-id}']['body'],
    params?: Endpoints['PATCH /solutions/virtualEvents/events/{virtualEvent-id}/sessions/{virtualEventSession-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/solutions/virtualEvents/events/{virtualEvent-id}/sessions/{virtualEventSession-id}',
      [
        { name: 'virtualEvent-id', in: 'path' },
        { name: 'virtualEventSession-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'virtualEvent-id': this.virtualEventId,
      }
    );

    return this.http
      .patch(url, body)
      .then(
        (res) =>
          res.data as Endpoints['PATCH /solutions/virtualEvents/events/{virtualEvent-id}/sessions/{virtualEventSession-id}']['response']
      );
  }

  /**
   * `POST /solutions/virtualEvents/events/{virtualEvent-id}/sessions`
   *
   */
  async create(
    body: Endpoints['POST /solutions/virtualEvents/events/{virtualEvent-id}/sessions']['body'],
    params?: Endpoints['POST /solutions/virtualEvents/events/{virtualEvent-id}/sessions']['parameters']
  ) {
    const url = getInjectedUrl(
      '/solutions/virtualEvents/events/{virtualEvent-id}/sessions',
      [{ name: 'virtualEvent-id', in: 'path' }],
      {
        ...(params || {}),
        'virtualEvent-id': this.virtualEventId,
      }
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints['POST /solutions/virtualEvents/events/{virtualEvent-id}/sessions']['response']
      );
  }
}
