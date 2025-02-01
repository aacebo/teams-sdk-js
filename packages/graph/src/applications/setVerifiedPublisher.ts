import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './setVerifiedPublisher-types.d.ts';

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
 * /applications/{application-id}/setVerifiedPublisher
 * Provides operations to call the setVerifiedPublisher method.
 */
export class SetVerifiedPublisherClient {
  protected baseUrl = '/applications/{application-id}/setVerifiedPublisher';
  protected http: AxiosInstance;

  constructor(
    protected readonly applicationId: string,
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
   * `POST /applications/{application-id}/setVerifiedPublisher`
   *
   * Set the verifiedPublisher on an application. For more information, including prerequisites to setting a verified publisher, see Publisher verification.
   */
  async create(
    body: Endpoints['POST /applications/{application-id}/setVerifiedPublisher']['body'],
    params?: Endpoints['POST /applications/{application-id}/setVerifiedPublisher']['parameters']
  ) {
    const url = getInjectedUrl(
      '/applications/{application-id}/setVerifiedPublisher',
      [{ name: 'application-id', in: 'path' }],
      {
        ...(params || {}),
        'application-id': this.applicationId,
      }
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints['POST /applications/{application-id}/setVerifiedPublisher']['response']
      );
  }
}
