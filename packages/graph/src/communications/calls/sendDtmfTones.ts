import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './sendDtmfTones-types.d.ts';

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
 * /communications/calls/{call-id}/sendDtmfTones
 * Provides operations to call the sendDtmfTones method.
 */
export class SendDtmfTonesClient {
  protected baseUrl = '/communications/calls/{call-id}/sendDtmfTones';
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
   * `POST /communications/calls/{call-id}/sendDtmfTones`
   *
   */
  async create(
    body: Endpoints['POST /communications/calls/{call-id}/sendDtmfTones']['body'],
    params?: Endpoints['POST /communications/calls/{call-id}/sendDtmfTones']['parameters']
  ) {
    const url = getInjectedUrl(
      '/communications/calls/{call-id}/sendDtmfTones',
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
          res.data as Endpoints['POST /communications/calls/{call-id}/sendDtmfTones']['response']
      );
  }
}
