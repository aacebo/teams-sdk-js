import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './snoozeReminder-types.d.ts';

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
 * /me/calendars/{calendar-id}/events/{event-id}/snoozeReminder
 * Provides operations to call the snoozeReminder method.
 */
export class SnoozeReminderClient {
  protected baseUrl = '/me/calendars/{calendar-id}/events/{event-id}/snoozeReminder';
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
   * `POST /me/calendars/{calendar-id}/events/{event-id}/snoozeReminder`
   *
   * Postpone a reminder for an event in a user calendar until a new time.
   */
  async create(
    body: Endpoints['POST /me/calendars/{calendar-id}/events/{event-id}/snoozeReminder']['body'],
    params?: Endpoints['POST /me/calendars/{calendar-id}/events/{event-id}/snoozeReminder']['parameters']
  ) {
    const url = getInjectedUrl(
      '/me/calendars/{calendar-id}/events/{event-id}/snoozeReminder',
      [
        { name: 'calendar-id', in: 'path' },
        { name: 'event-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'event-id': this.eventId,
      }
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints['POST /me/calendars/{calendar-id}/events/{event-id}/snoozeReminder']['response']
      );
  }
}
