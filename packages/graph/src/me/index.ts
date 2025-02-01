import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './index-types.d.ts';
import { CalendarClient } from './calendar';
import { CalendarGroupsClient } from './calendarGroups';
import { CalendarViewClient } from './calendarView';
import { CalendarsClient } from './calendars';
import { PresenceClient } from './presence';

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
 * /me
 * Provides operations to manage the user singleton.
 */
export class MeClient {
  protected baseUrl = '/me';
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
   * `/me/calendar`
   *
   * Provides operations to call the allowedCalendarSharingRoles method.
   */
  get calendar() {
    return new CalendarClient(this.http);
  }

  /**
   * `/me/calendarGroups`
   *
   * Provides operations to manage the calendarGroups property of the microsoft.graph.user entity.
   */
  get calendarGroups() {
    return new CalendarGroupsClient(this.http);
  }

  /**
   * `/me/calendarView`
   *
   * Provides operations to manage the calendarView property of the microsoft.graph.user entity.
   */
  get calendarView() {
    return new CalendarViewClient(this.http);
  }

  /**
   * `/me/calendars`
   *
   * Provides operations to call the allowedCalendarSharingRoles method.
   */
  get calendars() {
    return new CalendarsClient(this.http);
  }

  /**
   * `/me/presence`
   *
   * Provides operations to manage the presence property of the microsoft.graph.user entity.
   */
  get presence() {
    return new PresenceClient(this.http);
  }

  /**
   * `GET /me`
   *
   * Retrieve the properties and relationships of user object. This operation returns by default only a subset of the more commonly used properties for each user. These default properties are noted in the Properties section. To get properties that are not returned by default, do a GET operation for the user and specify the properties in a $select OData query option. Because the user resource supports extensions, you can also use the GET operation to get custom properties and extension data in a user instance. Customers through Microsoft Entra ID for customers can also use this API operation to retrieve their details.
   */
  async get(params?: Endpoints['GET /me']['parameters']) {
    const url = getInjectedUrl(
      '/me',
      [
        { name: 'ConsistencyLevel', in: 'header' },
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http.get(url).then((res) => res.data as Endpoints['GET /me']['response']);
  }

  /**
   * `PATCH /me`
   *
   * Update the properties of a user object.
   */
  async update(
    body: Endpoints['PATCH /me']['body'],
    params?: Endpoints['PATCH /me']['parameters']
  ) {
    const url = getInjectedUrl('/me', [], {
      ...(params || {}),
    });

    return this.http.patch(url, body).then((res) => res.data as Endpoints['PATCH /me']['response']);
  }
}
