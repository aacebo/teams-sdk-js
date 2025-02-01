import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './clearUserPreferredPresence-types.d.ts';

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
 * /users/{user-id}/presence/clearUserPreferredPresence
 * Provides operations to call the clearUserPreferredPresence method.
 */
export class ClearUserPreferredPresenceClient {
  protected baseUrl = '/users/{user-id}/presence/clearUserPreferredPresence';
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
   * `POST /users/{user-id}/presence/clearUserPreferredPresence`
   *
   * Clear the preferred availability and activity status for a user.
   */
  async create(
    body: Endpoints['POST /users/{user-id}/presence/clearUserPreferredPresence']['body'],
    params?: Endpoints['POST /users/{user-id}/presence/clearUserPreferredPresence']['parameters']
  ) {
    const url = getInjectedUrl(
      '/users/{user-id}/presence/clearUserPreferredPresence',
      [{ name: 'user-id', in: 'path' }],
      {
        ...(params || {}),
      }
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints['POST /users/{user-id}/presence/clearUserPreferredPresence']['response']
      );
  }
}
