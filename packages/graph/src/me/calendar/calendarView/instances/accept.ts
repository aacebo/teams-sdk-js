import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './accept-types.d.ts';

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
 * /me/calendar/calendarView/{event-id}/instances/{event-id1}/accept
 * Provides operations to call the accept method.
 */
export class AcceptClient {
  protected baseUrl = '/me/calendar/calendarView/{event-id}/instances/{event-id1}/accept';
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
   * `POST /me/calendar/calendarView/{event-id}/instances/{event-id1}/accept`
   *
   * Accept the specified event in a user calendar.
   */
  async create(
    body: Endpoints['POST /me/calendar/calendarView/{event-id}/instances/{event-id1}/accept']['body'],
    params?: Endpoints['POST /me/calendar/calendarView/{event-id}/instances/{event-id1}/accept']['parameters']
  ) {
    const url = getInjectedUrl(
      '/me/calendar/calendarView/{event-id}/instances/{event-id1}/accept',
      [
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
          res.data as Endpoints['POST /me/calendar/calendarView/{event-id}/instances/{event-id1}/accept']['response']
      );
  }
}
