import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './forward-types.d.ts';

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
 * /me/calendars/{calendar-id}/calendarView/{event-id}/instances/{event-id1}/forward
 * Provides operations to call the forward method.
 */
export class ForwardClient {
  protected baseUrl =
    '/me/calendars/{calendar-id}/calendarView/{event-id}/instances/{event-id1}/forward';
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
   * `POST /me/calendars/{calendar-id}/calendarView/{event-id}/instances/{event-id1}/forward`
   *
   * This action allows the organizer or attendee of a meeting event to forward the
meeting request to a new recipient. If the meeting event is forwarded from an attendee&#x27;s Microsoft 365 mailbox to another recipient, this action
also sends a message to notify the organizer of the forwarding, and adds the recipient to the organizer&#x27;s
copy of the meeting event. This convenience is not available when forwarding from an Outlook.com account.
   */
  async create(
    body: Endpoints['POST /me/calendars/{calendar-id}/calendarView/{event-id}/instances/{event-id1}/forward']['body'],
    params?: Endpoints['POST /me/calendars/{calendar-id}/calendarView/{event-id}/instances/{event-id1}/forward']['parameters']
  ) {
    const url = getInjectedUrl(
      '/me/calendars/{calendar-id}/calendarView/{event-id}/instances/{event-id1}/forward',
      [
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
          res.data as Endpoints['POST /me/calendars/{calendar-id}/calendarView/{event-id}/instances/{event-id1}/forward']['response']
      );
  }
}
