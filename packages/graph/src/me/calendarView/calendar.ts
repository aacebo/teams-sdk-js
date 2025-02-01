import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './calendar-types.d.ts';

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
 * /me/calendarView/{event-id}/calendar
 * Provides operations to manage the calendar property of the microsoft.graph.event entity.
 */
export class CalendarClient {
  protected baseUrl = '/me/calendarView/{event-id}/calendar';
  protected http: AxiosInstance;

  constructor(
    protected readonly eventId: string,
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
   * `GET /me/calendarView/{event-id}/calendar`
   *
   * The calendar that contains the event. Navigation property. Read-only.
   */
  async get(params?: Endpoints['GET /me/calendarView/{event-id}/calendar']['parameters']) {
    const url = getInjectedUrl(
      '/me/calendarView/{event-id}/calendar',
      [
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'event-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'event-id': this.eventId,
      }
    );

    return this.http
      .get(url)
      .then((res) => res.data as Endpoints['GET /me/calendarView/{event-id}/calendar']['response']);
  }
}
