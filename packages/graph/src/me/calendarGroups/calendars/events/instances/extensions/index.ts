import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './index-types.d.ts';
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
 * /me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/instances/{event-id1}/extensions
 * Provides operations to manage the extensions property of the microsoft.graph.event entity.
 */
export class ExtensionsClient {
  protected baseUrl =
    '/me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/instances/{event-id1}/extensions';
  protected http: AxiosInstance;

  constructor(
    protected readonly eventId1: string,
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
   * `/me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/instances/{event-id1}/extensions/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `DELETE /me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/instances/{event-id1}/extensions/{extension-id}`
   *
   */
  async delete(
    body: Endpoints['DELETE /me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/instances/{event-id1}/extensions/{extension-id}']['body'],
    params?: Endpoints['DELETE /me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/instances/{event-id1}/extensions/{extension-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/instances/{event-id1}/extensions/{extension-id}',
      [
        { name: 'If-Match', in: 'header' },
        { name: 'calendarGroup-id', in: 'path' },
        { name: 'calendar-id', in: 'path' },
        { name: 'event-id', in: 'path' },
        { name: 'event-id1', in: 'path' },
        { name: 'extension-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'event-id1': this.eventId1,
      }
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints['DELETE /me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/instances/{event-id1}/extensions/{extension-id}']['response']
      );
  }

  /**
   * `GET /me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/instances/{event-id1}/extensions`
   *
   * The collection of open extensions defined for the event. Nullable.
   */
  async list(
    params?: Endpoints['GET /me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/instances/{event-id1}/extensions']['parameters']
  ) {
    const url = getInjectedUrl(
      '/me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/instances/{event-id1}/extensions',
      [
        { name: '$orderby', in: 'query' },
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'calendarGroup-id', in: 'path' },
        { name: 'calendar-id', in: 'path' },
        { name: 'event-id', in: 'path' },
        { name: 'event-id1', in: 'path' },
      ],
      {
        ...(params || {}),
        'event-id1': this.eventId1,
      }
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints['GET /me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/instances/{event-id1}/extensions']['response']
      );
  }

  /**
   * `GET /me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/instances/{event-id1}/extensions/{extension-id}`
   *
   * The collection of open extensions defined for the event. Nullable.
   */
  async get(
    params?: Endpoints['GET /me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/instances/{event-id1}/extensions/{extension-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/instances/{event-id1}/extensions/{extension-id}',
      [
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'calendarGroup-id', in: 'path' },
        { name: 'calendar-id', in: 'path' },
        { name: 'event-id', in: 'path' },
        { name: 'event-id1', in: 'path' },
        { name: 'extension-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'event-id1': this.eventId1,
      }
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints['GET /me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/instances/{event-id1}/extensions/{extension-id}']['response']
      );
  }

  /**
   * `PATCH /me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/instances/{event-id1}/extensions/{extension-id}`
   *
   */
  async update(
    body: Endpoints['PATCH /me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/instances/{event-id1}/extensions/{extension-id}']['body'],
    params?: Endpoints['PATCH /me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/instances/{event-id1}/extensions/{extension-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/instances/{event-id1}/extensions/{extension-id}',
      [
        { name: 'calendarGroup-id', in: 'path' },
        { name: 'calendar-id', in: 'path' },
        { name: 'event-id', in: 'path' },
        { name: 'event-id1', in: 'path' },
        { name: 'extension-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'event-id1': this.eventId1,
      }
    );

    return this.http
      .patch(url, body)
      .then(
        (res) =>
          res.data as Endpoints['PATCH /me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/instances/{event-id1}/extensions/{extension-id}']['response']
      );
  }

  /**
   * `POST /me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/instances/{event-id1}/extensions`
   *
   */
  async create(
    body: Endpoints['POST /me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/instances/{event-id1}/extensions']['body'],
    params?: Endpoints['POST /me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/instances/{event-id1}/extensions']['parameters']
  ) {
    const url = getInjectedUrl(
      '/me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/instances/{event-id1}/extensions',
      [
        { name: 'calendarGroup-id', in: 'path' },
        { name: 'calendar-id', in: 'path' },
        { name: 'event-id', in: 'path' },
        { name: 'event-id1', in: 'path' },
      ],
      {
        ...(params || {}),
        'event-id1': this.eventId1,
      }
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints['POST /me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/instances/{event-id1}/extensions']['response']
      );
  }
}
