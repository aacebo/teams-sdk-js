import qs from 'qs';
import axios, { AxiosInstance, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './logo-types.d.ts';

type GraphClientOptions = CreateAxiosDefaults | AxiosInstance;

interface Param {
  readonly in: string;
  readonly name: string;
}

function getInjectedUrl(url: string, params: Array<Param>, data: Record<string, any>) {
  const query: Record<string, any> = {};

  for (const param of params) {
    if (param.in === 'query') {
      query[param.name] = data[param.name];
    }

    if (param.in !== 'path') {
      continue;
    }

    url = url.replace(`{${param.name}}`, data[param.name]);
  }

  return `${url}${qs.stringify(query, { addQueryPrefix: true })}`;
}

/**
 * /applications/{application-id}/logo
 * Provides operations to manage the media for the application entity.
 */
export class LogoClient {
  protected baseUrl = '/applications/{application-id}/logo';
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
   * `DELETE /applications/{application-id}/logo`
   *
   * The main logo for the application. Not nullable.
   */
  async delete(
    params?: Endpoints['DELETE /applications/{application-id}/logo']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl(
      '/applications/{application-id}/logo',
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
      .delete(url, config)
      .then(
        (res) => res.data as Endpoints['DELETE /applications/{application-id}/logo']['response']
      );
  }

  /**
   * `GET /applications/{application-id}/logo`
   *
   * The main logo for the application. Not nullable.
   */
  async get(
    params?: Endpoints['GET /applications/{application-id}/logo']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl(
      '/applications/{application-id}/logo',
      [{ name: 'application-id', in: 'path' }],
      {
        ...(params || {}),
        'application-id': this.applicationId,
      }
    );

    return this.http
      .get(url, config)
      .then((res) => res.data as Endpoints['GET /applications/{application-id}/logo']['response']);
  }

  /**
   * `PUT /applications/{application-id}/logo`
   *
   * The main logo for the application. Not nullable.
   */
  async set(
    body: Endpoints['PUT /applications/{application-id}/logo']['body'],
    params?: Endpoints['PUT /applications/{application-id}/logo']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl(
      '/applications/{application-id}/logo',
      [{ name: 'application-id', in: 'path' }],
      {
        ...(params || {}),
        'application-id': this.applicationId,
      }
    );

    return this.http
      .put(url, body, config)
      .then((res) => res.data as Endpoints['PUT /applications/{application-id}/logo']['response']);
  }
}
