import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './index-types.d.ts';
import { AcquireAccessTokenClient } from './acquireAccessToken';
import { JobsClient } from './jobs';
import { SecretsClient } from './secrets';
import { TemplatesClient } from './templates';

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
 * /applications/{application-id}/synchronization
 * Provides operations to manage the synchronization property of the microsoft.graph.application entity.
 */
export class SynchronizationClient {
  protected baseUrl = '/applications/{application-id}/synchronization';
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
   * `/applications/{application-id}/synchronization/acquireAccessToken`
   *
   * Provides operations to call the acquireAccessToken method.
   */
  get acquireAccessToken() {
    return new AcquireAccessTokenClient(this.http);
  }

  /**
   * `/applications/{application-id}/synchronization/jobs`
   *
   * Provides operations to manage the jobs property of the microsoft.graph.synchronization entity.
   */
  get jobs() {
    return new JobsClient(this.http);
  }

  /**
   * `/applications/{application-id}/synchronization/secrets`
   *
   */
  get secrets() {
    return new SecretsClient(this.http);
  }

  /**
   * `/applications/{application-id}/synchronization/templates`
   *
   * Provides operations to manage the templates property of the microsoft.graph.synchronization entity.
   */
  get templates() {
    return new TemplatesClient(this.http);
  }

  /**
   * `DELETE /applications/{application-id}/synchronization`
   *
   */
  async delete(
    body: Endpoints['DELETE /applications/{application-id}/synchronization']['body'],
    params?: Endpoints['DELETE /applications/{application-id}/synchronization']['parameters']
  ) {
    const url = getInjectedUrl(
      '/applications/{application-id}/synchronization',
      [
        { name: 'If-Match', in: 'header' },
        { name: 'application-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'application-id': this.applicationId,
      }
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints['DELETE /applications/{application-id}/synchronization']['response']
      );
  }

  /**
   * `GET /applications/{application-id}/synchronization`
   *
   * Represents the capability for Microsoft Entra identity synchronization through the Microsoft Graph API.
   */
  async get(
    params?: Endpoints['GET /applications/{application-id}/synchronization']['parameters']
  ) {
    const url = getInjectedUrl(
      '/applications/{application-id}/synchronization',
      [
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'application-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'application-id': this.applicationId,
      }
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints['GET /applications/{application-id}/synchronization']['response']
      );
  }

  /**
   * `PUT /applications/{application-id}/synchronization`
   *
   */
  async set(
    body: Endpoints['PUT /applications/{application-id}/synchronization']['body'],
    params?: Endpoints['PUT /applications/{application-id}/synchronization']['parameters']
  ) {
    const url = getInjectedUrl(
      '/applications/{application-id}/synchronization',
      [{ name: 'application-id', in: 'path' }],
      {
        ...(params || {}),
        'application-id': this.applicationId,
      }
    );

    return this.http
      .put(url, body)
      .then(
        (res) =>
          res.data as Endpoints['PUT /applications/{application-id}/synchronization']['response']
      );
  }
}
