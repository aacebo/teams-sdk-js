import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './value-types.d.ts';

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
 * /applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/bulkUpload/value
 * Provides operations to manage the media for the application entity.
 */
export class ValueClient {
  protected baseUrl =
    '/applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/bulkUpload/value';
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
   * `DELETE /applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/bulkUpload/$value`
   *
   * The bulk upload operation for the job.
   */
  async delete(
    body: Endpoints['DELETE /applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/bulkUpload/$value']['body'],
    params?: Endpoints['DELETE /applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/bulkUpload/$value']['parameters']
  ) {
    const url = getInjectedUrl(
      '/applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/bulkUpload/$value',
      [
        { name: 'If-Match', in: 'header' },
        { name: 'application-id', in: 'path' },
        { name: 'synchronizationJob-id', in: 'path' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints['DELETE /applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/bulkUpload/$value']['response']
      );
  }

  /**
   * `GET /applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/bulkUpload/$value`
   *
   * The bulk upload operation for the job.
   */
  async get(
    params?: Endpoints['GET /applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/bulkUpload/$value']['parameters']
  ) {
    const url = getInjectedUrl(
      '/applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/bulkUpload/$value',
      [
        { name: 'application-id', in: 'path' },
        { name: 'synchronizationJob-id', in: 'path' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints['GET /applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/bulkUpload/$value']['response']
      );
  }

  /**
   * `PUT /applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/bulkUpload/$value`
   *
   * The bulk upload operation for the job.
   */
  async set(
    body: Endpoints['PUT /applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/bulkUpload/$value']['body'],
    params?: Endpoints['PUT /applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/bulkUpload/$value']['parameters']
  ) {
    const url = getInjectedUrl(
      '/applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/bulkUpload/$value',
      [
        { name: 'application-id', in: 'path' },
        { name: 'synchronizationJob-id', in: 'path' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .put(url, body)
      .then(
        (res) =>
          res.data as Endpoints['PUT /applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/bulkUpload/$value']['response']
      );
  }
}
