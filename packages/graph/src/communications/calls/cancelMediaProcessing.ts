import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './cancelMediaProcessing-types.d.ts';

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
 * /communications/calls/{call-id}/cancelMediaProcessing
 * Provides operations to call the cancelMediaProcessing method.
 */
export class CancelMediaProcessingClient {
  protected baseUrl = '/communications/calls/{call-id}/cancelMediaProcessing';
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
   * `POST /communications/calls/{call-id}/cancelMediaProcessing`
   *
   * Cancels processing for any in-progress media operations. Media operations refer to the IVR operations playPrompt and recordResponse, which are by default queued to process in order. The cancelMediaProcessing method cancels any operation that is in-process as well as operations that are queued. For example, this method can be used to clean up the IVR operation queue for a new media operation. However, it will not cancel a subscribeToTone operation because it operates independent of any operation queue.
   */
  async create(
    body: Endpoints['POST /communications/calls/{call-id}/cancelMediaProcessing']['body'],
    params?: Endpoints['POST /communications/calls/{call-id}/cancelMediaProcessing']['parameters']
  ) {
    const url = getInjectedUrl(
      '/communications/calls/{call-id}/cancelMediaProcessing',
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
          res.data as Endpoints['POST /communications/calls/{call-id}/cancelMediaProcessing']['response']
      );
  }
}
