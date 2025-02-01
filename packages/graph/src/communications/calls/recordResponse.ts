import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './recordResponse-types.d.ts';

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
 * /communications/calls/{call-id}/recordResponse
 * Provides operations to call the recordResponse method.
 */
export class RecordResponseClient {
  protected baseUrl = '/communications/calls/{call-id}/recordResponse';
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
   * `POST /communications/calls/{call-id}/recordResponse`
   *
   * Records a short audio response from the caller.
A bot can utilize this to capture a voice response from a caller after they are prompted for a response. For further information on how to handle operations, please review commsOperation This action is not intended to record the entire call. The maximum length of recording is 2 minutes. The recording is not saved permanently by the Cloud Communications Platform and is discarded shortly after the call ends. The bot must download the recording promptly after the recording operation finishes by using the recordingLocation value that&#x27;s given in the completed notification.
   */
  async create(
    body: Endpoints['POST /communications/calls/{call-id}/recordResponse']['body'],
    params?: Endpoints['POST /communications/calls/{call-id}/recordResponse']['parameters']
  ) {
    const url = getInjectedUrl(
      '/communications/calls/{call-id}/recordResponse',
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
          res.data as Endpoints['POST /communications/calls/{call-id}/recordResponse']['response']
      );
  }
}
