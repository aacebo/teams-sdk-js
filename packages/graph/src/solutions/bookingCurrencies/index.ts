import qs from 'qs';
import axios, { AxiosInstance, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './index-types.d.ts';
import { CountClient } from './count';

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
 * /solutions/bookingCurrencies
 * Provides operations to manage the bookingCurrencies property of the microsoft.graph.solutionsRoot entity.
 */
export class BookingCurrenciesClient {
  protected baseUrl = '/solutions/bookingCurrencies';
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
   * `/solutions/bookingCurrencies/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `DELETE /solutions/bookingCurrencies/{bookingCurrency-id}`
   *
   */
  async delete(
    params?: Endpoints['DELETE /solutions/bookingCurrencies/{bookingCurrency-id}']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl(
      '/solutions/bookingCurrencies/{bookingCurrency-id}',
      [
        { name: 'If-Match', in: 'header' },
        { name: 'bookingCurrency-id', in: 'path' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .delete(url, config)
      .then(
        (res) =>
          res.data as Endpoints['DELETE /solutions/bookingCurrencies/{bookingCurrency-id}']['response']
      );
  }

  /**
   * `GET /solutions/bookingCurrencies`
   *
   * Get a list of bookingCurrency objects available to a Microsoft Bookings business.
   */
  async list(
    params?: Endpoints['GET /solutions/bookingCurrencies']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl(
      '/solutions/bookingCurrencies',
      [
        { name: '$orderby', in: 'query' },
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .get(url, config)
      .then((res) => res.data as Endpoints['GET /solutions/bookingCurrencies']['response']);
  }

  /**
   * `GET /solutions/bookingCurrencies/{bookingCurrency-id}`
   *
   * Get the properties of a bookingCurrency object that is available to a Microsoft Bookings business. Use the id property, which is the currency code, to specify the currency.
   */
  async get(
    params?: Endpoints['GET /solutions/bookingCurrencies/{bookingCurrency-id}']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl(
      '/solutions/bookingCurrencies/{bookingCurrency-id}',
      [
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'bookingCurrency-id', in: 'path' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints['GET /solutions/bookingCurrencies/{bookingCurrency-id}']['response']
      );
  }

  /**
   * `PATCH /solutions/bookingCurrencies/{bookingCurrency-id}`
   *
   */
  async update(
    body: Endpoints['PATCH /solutions/bookingCurrencies/{bookingCurrency-id}']['body'],
    params?: Endpoints['PATCH /solutions/bookingCurrencies/{bookingCurrency-id}']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl(
      '/solutions/bookingCurrencies/{bookingCurrency-id}',
      [{ name: 'bookingCurrency-id', in: 'path' }],
      {
        ...(params || {}),
      }
    );

    return this.http
      .patch(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints['PATCH /solutions/bookingCurrencies/{bookingCurrency-id}']['response']
      );
  }

  /**
   * `POST /solutions/bookingCurrencies`
   *
   */
  async create(
    body: Endpoints['POST /solutions/bookingCurrencies']['body'],
    params?: Endpoints['POST /solutions/bookingCurrencies']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl('/solutions/bookingCurrencies', [], {
      ...(params || {}),
    });

    return this.http
      .post(url, body, config)
      .then((res) => res.data as Endpoints['POST /solutions/bookingCurrencies']['response']);
  }
}
