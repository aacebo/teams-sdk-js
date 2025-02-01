import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import { OnlineMeetingsClient } from './onlineMeetings';
import { PresenceClient } from './presence';
import { TeamworkClient } from './teamwork';

type GraphClientOptions = CreateAxiosDefaults | AxiosInstance;

/**
 * /users
 */
export class UsersClient {
  protected baseUrl = '/users';
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
}
