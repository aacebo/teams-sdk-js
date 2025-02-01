import qs from 'qs';
import axios, { AxiosInstance, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './index-types.d.ts';
import { CalendarsClient } from './calendars';
import { CountClient } from './count';

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
 * /me/calendarGroups
 * Provides operations to manage the calendarGroups property of the microsoft.graph.user entity.
 */
export class CalendarGroupsClient {
  protected baseUrl = '/me/calendarGroups';
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
   * `/me/calendarGroups/{calendarGroup-id}/calendars`
   *
   * Provides operations to call the allowedCalendarSharingRoles method.
   */
  calendars(calendarGroupId: string) {
    return new CalendarsClient(calendarGroupId, this.http);
  }

  /**
   * `/me/calendarGroups/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `DELETE /me/calendarGroups/{calendarGroup-id}`
   *
   * Delete a calendar group other than the default calendar group.
   */
  async delete(
    params?: Endpoints['DELETE /me/calendarGroups/{calendarGroup-id}']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl(
      '/me/calendarGroups/{calendarGroup-id}',
      [
        { name: 'If-Match', in: 'header' },
        { name: 'calendarGroup-id', in: 'path' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .delete(url, config)
      .then(
        (res) => res.data as Endpoints['DELETE /me/calendarGroups/{calendarGroup-id}']['response']
      );
  }

  /**
   * `GET /me/calendarGroups`
   *
   * Get the user&#x27;s calendar groups.
   */
  async list(
    params?: Endpoints['GET /me/calendarGroups']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl(
      '/me/calendarGroups',
      [
        { name: '$orderby', in: 'query' },
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .get(url, config)
      .then((res) => res.data as Endpoints['GET /me/calendarGroups']['response']);
  }

  /**
   * `GET /me/calendarGroups/{calendarGroup-id}`
   *
   * Retrieve the properties and relationships of a calendar group object.
   */
  async get(
    params?: Endpoints['GET /me/calendarGroups/{calendarGroup-id}']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl(
      '/me/calendarGroups/{calendarGroup-id}',
      [
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'calendarGroup-id', in: 'path' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .get(url, config)
      .then(
        (res) => res.data as Endpoints['GET /me/calendarGroups/{calendarGroup-id}']['response']
      );
  }

  /**
   * `PATCH /me/calendarGroups/{calendarGroup-id}`
   *
   * Update the properties of calendargroup object.
   */
  async update(
    body: Endpoints['PATCH /me/calendarGroups/{calendarGroup-id}']['body'],
    params?: Endpoints['PATCH /me/calendarGroups/{calendarGroup-id}']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl(
      '/me/calendarGroups/{calendarGroup-id}',
      [{ name: 'calendarGroup-id', in: 'path' }],
      {
        ...(params || {}),
      }
    );

    return this.http
      .patch(url, body, config)
      .then(
        (res) => res.data as Endpoints['PATCH /me/calendarGroups/{calendarGroup-id}']['response']
      );
  }

  /**
   * `POST /me/calendarGroups`
   *
   * Use this API to create a new CalendarGroup.
   */
  async create(
    body: Endpoints['POST /me/calendarGroups']['body'],
    params?: Endpoints['POST /me/calendarGroups']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl('/me/calendarGroups', [], {
      ...(params || {}),
    });

    return this.http
      .post(url, body, config)
      .then((res) => res.data as Endpoints['POST /me/calendarGroups']['response']);
  }
}
