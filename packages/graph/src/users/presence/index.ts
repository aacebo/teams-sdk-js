import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './index-types.d.ts';
import { ClearPresenceClient } from './clearPresence';
import { ClearUserPreferredPresenceClient } from './clearUserPreferredPresence';
import { SetPresenceClient } from './setPresence';
import { SetStatusMessageClient } from './setStatusMessage';
import { SetUserPreferredPresenceClient } from './setUserPreferredPresence';

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
 * /users/{user-id}/presence
 * Provides operations to manage the presence property of the microsoft.graph.user entity.
 */
export class PresenceClient {
  protected baseUrl = '/users/{user-id}/presence';
  protected http: AxiosInstance;

  constructor(
    protected readonly userId: string,
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
   * `/users/{user-id}/presence/clearPresence`
   *
   * Provides operations to call the clearPresence method.
   */
  get clearPresence() {
    return new ClearPresenceClient(this.http);
  }

  /**
   * `/users/{user-id}/presence/clearUserPreferredPresence`
   *
   * Provides operations to call the clearUserPreferredPresence method.
   */
  get clearUserPreferredPresence() {
    return new ClearUserPreferredPresenceClient(this.http);
  }

  /**
   * `/users/{user-id}/presence/setPresence`
   *
   * Provides operations to call the setPresence method.
   */
  get setPresence() {
    return new SetPresenceClient(this.http);
  }

  /**
   * `/users/{user-id}/presence/setStatusMessage`
   *
   * Provides operations to call the setStatusMessage method.
   */
  get setStatusMessage() {
    return new SetStatusMessageClient(this.http);
  }

  /**
   * `/users/{user-id}/presence/setUserPreferredPresence`
   *
   * Provides operations to call the setUserPreferredPresence method.
   */
  get setUserPreferredPresence() {
    return new SetUserPreferredPresenceClient(this.http);
  }

  /**
   * `DELETE /users/{user-id}/presence`
   *
   */
  async delete(
    body: Endpoints['DELETE /users/{user-id}/presence']['body'],
    params?: Endpoints['DELETE /users/{user-id}/presence']['parameters']
  ) {
    const url = getInjectedUrl(
      '/users/{user-id}/presence',
      [
        { name: 'If-Match', in: 'header' },
        { name: 'user-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'user-id': this.userId,
      }
    );

    return this.http
      .delete(url, body)
      .then((res) => res.data as Endpoints['DELETE /users/{user-id}/presence']['response']);
  }

  /**
   * `GET /users/{user-id}/presence`
   *
   * Get a user&#x27;s presence information.
   */
  async get(params?: Endpoints['GET /users/{user-id}/presence']['parameters']) {
    const url = getInjectedUrl(
      '/users/{user-id}/presence',
      [
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'user-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'user-id': this.userId,
      }
    );

    return this.http
      .get(url)
      .then((res) => res.data as Endpoints['GET /users/{user-id}/presence']['response']);
  }

  /**
   * `PATCH /users/{user-id}/presence`
   *
   */
  async update(
    body: Endpoints['PATCH /users/{user-id}/presence']['body'],
    params?: Endpoints['PATCH /users/{user-id}/presence']['parameters']
  ) {
    const url = getInjectedUrl('/users/{user-id}/presence', [{ name: 'user-id', in: 'path' }], {
      ...(params || {}),
      'user-id': this.userId,
    });

    return this.http
      .patch(url, body)
      .then((res) => res.data as Endpoints['PATCH /users/{user-id}/presence']['response']);
  }
}
