import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './subscribeToTone-types.d.ts';

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
 * /communications/calls/{call-id}/subscribeToTone
 * Provides operations to call the subscribeToTone method.
 */
export class SubscribeToToneClient {
  protected baseUrl = '/communications/calls/{call-id}/subscribeToTone';
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
   * `POST /communications/calls/{call-id}/subscribeToTone`
   *
   * Subscribe to DTMF (dual-tone multi-frequency signaling) which allows you to be notified when the user presses keys on a &#x27;dialpad&#x27;.
   */
  async create(
    body: Endpoints['POST /communications/calls/{call-id}/subscribeToTone']['body'],
    params?: Endpoints['POST /communications/calls/{call-id}/subscribeToTone']['parameters']
  ) {
    const url = getInjectedUrl(
      '/communications/calls/{call-id}/subscribeToTone',
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
          res.data as Endpoints['POST /communications/calls/{call-id}/subscribeToTone']['response']
      );
  }
}
