import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './getPresencesByUserId-types.d.ts';

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
 * /communications/getPresencesByUserId
 * Provides operations to call the getPresencesByUserId method.
 */
export class GetPresencesByUserIdClient {
  protected baseUrl = '/communications/getPresencesByUserId';
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
   * `POST /communications/getPresencesByUserId`
   *
   * Get the presence information for multiple users.
   */
  async create(
    body: Endpoints['POST /communications/getPresencesByUserId']['body'],
    params?: Endpoints['POST /communications/getPresencesByUserId']['parameters']
  ) {
    const url = getInjectedUrl('/communications/getPresencesByUserId', [], {
      ...(params || {}),
    });

    return this.http
      .post(url, body)
      .then(
        (res) => res.data as Endpoints['POST /communications/getPresencesByUserId']['response']
      );
  }
}
