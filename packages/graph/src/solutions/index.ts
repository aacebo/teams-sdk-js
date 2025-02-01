import qs from 'qs';
import axios, { AxiosInstance, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './index-types.d.ts';
import { BackupRestoreClient } from './backupRestore';
import { BookingBusinessesClient } from './bookingBusinesses';
import { BookingCurrenciesClient } from './bookingCurrencies';
import { VirtualEventsClient } from './virtualEvents';

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
 * /solutions
 * Provides operations to manage the solutionsRoot singleton.
 */
export class SolutionsClient {
  protected baseUrl = '/solutions';
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
   * `/solutions/backupRestore`
   *
   * Provides operations to manage the backupRestore property of the microsoft.graph.solutionsRoot entity.
   */
  get backupRestore() {
    return new BackupRestoreClient(this.http);
  }

  /**
   * `/solutions/bookingBusinesses`
   *
   * Provides operations to manage the bookingBusinesses property of the microsoft.graph.solutionsRoot entity.
   */
  get bookingBusinesses() {
    return new BookingBusinessesClient(this.http);
  }

  /**
   * `/solutions/bookingCurrencies`
   *
   * Provides operations to manage the bookingCurrencies property of the microsoft.graph.solutionsRoot entity.
   */
  get bookingCurrencies() {
    return new BookingCurrenciesClient(this.http);
  }

  /**
   * `/solutions/virtualEvents`
   *
   * Provides operations to manage the virtualEvents property of the microsoft.graph.solutionsRoot entity.
   */
  get virtualEvents() {
    return new VirtualEventsClient(this.http);
  }

  /**
   * `GET /solutions`
   *
   */
  async list(params?: Endpoints['GET /solutions']['parameters'], config?: AxiosRequestConfig) {
    const url = getInjectedUrl(
      '/solutions',
      [
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .get(url, config)
      .then((res) => res.data as Endpoints['GET /solutions']['response']);
  }

  /**
   * `PATCH /solutions`
   *
   */
  async update(
    body: Endpoints['PATCH /solutions']['body'],
    params?: Endpoints['PATCH /solutions']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl('/solutions', [], {
      ...(params || {}),
    });

    return this.http
      .patch(url, body, config)
      .then((res) => res.data as Endpoints['PATCH /solutions']['response']);
  }
}
