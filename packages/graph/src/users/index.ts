import qs from 'qs';
import * as http from '@teams.sdk/common/http';

import pkg from 'src/../package.json';
import type { Endpoints } from './index-types.ts';
import { ChatsClient } from './chats';
import { OnlineMeetingsClient } from './onlineMeetings';
import { PresenceClient } from './presence';
import { TeamworkClient } from './teamwork';

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
 * /users
 * Provides operations to manage the collection of user entities.
 */
export class UsersClient {
  protected baseUrl = '/users';
  protected http: http.Client;

  constructor(options?: http.Client | http.ClientOptions) {
    if (!options) {
      this.http = new http.Client({
        baseUrl: 'https://graph.microsoft.com/v1.0',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': `teams[graph]/${pkg.version}`,
        },
      });
    } else if ('request' in options) {
      this.http = options.clone({
        baseUrl: 'https://graph.microsoft.com/v1.0',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': `teams[graph]/${pkg.version}`,
        },
      });
    } else {
      this.http = new http.Client({
        ...options,
        baseUrl: 'https://graph.microsoft.com/v1.0',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': `teams[graph]/${pkg.version}`,
          ...options.headers,
        },
      });
    }
  }

  /**
   * `/users/{user-id}/chats`
   *
   * Provides operations to manage the chats property of the microsoft.graph.user entity.
   */
  chats(userId: string) {
    return new ChatsClient(userId, this.http);
  }

  /**
   * `/users/{user-id}/onlineMeetings`
   *
   * Provides operations to manage the onlineMeetings property of the microsoft.graph.user entity.
   */
  onlineMeetings(userId: string) {
    return new OnlineMeetingsClient(userId, this.http);
  }

  /**
   * `/users/{user-id}/presence`
   *
   * Provides operations to manage the presence property of the microsoft.graph.user entity.
   */
  presence(userId: string) {
    return new PresenceClient(userId, this.http);
  }

  /**
   * `/users/{user-id}/teamwork`
   *
   * Provides operations to manage the teamwork property of the microsoft.graph.user entity.
   */
  teamwork(userId: string) {
    return new TeamworkClient(userId, this.http);
  }

  /**
   * `GET /users`
   *
   * Retrieve a list of user objects.
   */
  async list(params?: Endpoints['GET /users']['parameters'], config?: http.RequestConfig) {
    const url = getInjectedUrl(
      '/users',
      [
        { name: 'ConsistencyLevel', in: 'header' },
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
      .then((res) => res.data as Endpoints['GET /users']['response']);
  }

  /**
   * `POST /users`
   *
   * Create a new user.
The request body contains the user to create. At a minimum, you must specify the required properties for the user. You can optionally specify any other writable properties.
   */
  async create(
    body: Endpoints['POST /users']['body'],
    params?: Endpoints['POST /users']['parameters'],
    config?: http.RequestConfig
  ) {
    const url = getInjectedUrl('/users', [], {
      ...(params || {}),
    });

    return this.http
      .post(url, body, config)
      .then((res) => res.data as Endpoints['POST /users']['response']);
  }
}
