import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './changeScreenSharingRole-types.d.ts';

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
 * /communications/calls/{call-id}/changeScreenSharingRole
 * Provides operations to call the changeScreenSharingRole method.
 */
export class ChangeScreenSharingRoleClient {
  protected baseUrl = '/communications/calls/{call-id}/changeScreenSharingRole';
  protected http: AxiosInstance;

  constructor(
    protected readonly callId: string,
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
   * `POST /communications/calls/{call-id}/changeScreenSharingRole`
   *
   * Allow applications to share screen content with the participants of a group call.
   */
  async create(
    body: Endpoints['POST /communications/calls/{call-id}/changeScreenSharingRole']['body'],
    params?: Endpoints['POST /communications/calls/{call-id}/changeScreenSharingRole']['parameters']
  ) {
    const url = getInjectedUrl(
      '/communications/calls/{call-id}/changeScreenSharingRole',
      [{ name: 'call-id', in: 'path' }],
      {
        ...(params || {}),
        'call-id': this.callId,
      }
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints['POST /communications/calls/{call-id}/changeScreenSharingRole']['response']
      );
  }
}
