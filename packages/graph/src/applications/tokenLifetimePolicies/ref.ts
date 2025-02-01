import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './ref-types.d.ts';

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
 * /applications/{application-id}/tokenLifetimePolicies/{tokenLifetimePolicy-id}/ref
 * Provides operations to manage the collection of application entities.
 */
export class RefClient {
  protected baseUrl =
    '/applications/{application-id}/tokenLifetimePolicies/{tokenLifetimePolicy-id}/ref';
  protected http: AxiosInstance;

  constructor(
    protected readonly tokenLifetimePolicyId: string,
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
   * `DELETE /applications/{application-id}/tokenLifetimePolicies/$ref`
   *
   * Remove a tokenLifetimePolicy from an application.
   */
  async delete$1(
    body: Endpoints['DELETE /applications/{application-id}/tokenLifetimePolicies/$ref']['body'],
    params?: Endpoints['DELETE /applications/{application-id}/tokenLifetimePolicies/$ref']['parameters']
  ) {
    const url = getInjectedUrl(
      '/applications/{application-id}/tokenLifetimePolicies/$ref',
      [
        { name: 'If-Match', in: 'header' },
        { name: '@id', in: 'query' },
        { name: 'application-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'tokenLifetimePolicy-id': this.tokenLifetimePolicyId,
      }
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints['DELETE /applications/{application-id}/tokenLifetimePolicies/$ref']['response']
      );
  }

  /**
   * `DELETE /applications/{application-id}/tokenLifetimePolicies/{tokenLifetimePolicy-id}/$ref`
   *
   * Remove a tokenLifetimePolicy from an application.
   */
  async delete(
    body: Endpoints['DELETE /applications/{application-id}/tokenLifetimePolicies/{tokenLifetimePolicy-id}/$ref']['body'],
    params?: Endpoints['DELETE /applications/{application-id}/tokenLifetimePolicies/{tokenLifetimePolicy-id}/$ref']['parameters']
  ) {
    const url = getInjectedUrl(
      '/applications/{application-id}/tokenLifetimePolicies/{tokenLifetimePolicy-id}/$ref',
      [
        { name: 'If-Match', in: 'header' },
        { name: 'application-id', in: 'path' },
        { name: 'tokenLifetimePolicy-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'tokenLifetimePolicy-id': this.tokenLifetimePolicyId,
      }
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints['DELETE /applications/{application-id}/tokenLifetimePolicies/{tokenLifetimePolicy-id}/$ref']['response']
      );
  }

  /**
   * `GET /applications/{application-id}/tokenLifetimePolicies/$ref`
   *
   * List the tokenLifetimePolicy objects that are assigned to an application. Only one object is returned in the collection because only one tokenLifetimePolicy can be assigned to an application.
   */
  async get(
    params?: Endpoints['GET /applications/{application-id}/tokenLifetimePolicies/$ref']['parameters']
  ) {
    const url = getInjectedUrl(
      '/applications/{application-id}/tokenLifetimePolicies/$ref',
      [
        { name: '$orderby', in: 'query' },
        { name: 'application-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'tokenLifetimePolicy-id': this.tokenLifetimePolicyId,
      }
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints['GET /applications/{application-id}/tokenLifetimePolicies/$ref']['response']
      );
  }

  /**
   * `POST /applications/{application-id}/tokenLifetimePolicies/$ref`
   *
   * Assign a tokenLifetimePolicy to an application. You can have multiple tokenLifetimePolicy policies in a tenant but can assign only one tokenLifetimePolicy per application.
   */
  async create(
    body: Endpoints['POST /applications/{application-id}/tokenLifetimePolicies/$ref']['body'],
    params?: Endpoints['POST /applications/{application-id}/tokenLifetimePolicies/$ref']['parameters']
  ) {
    const url = getInjectedUrl(
      '/applications/{application-id}/tokenLifetimePolicies/$ref',
      [{ name: 'application-id', in: 'path' }],
      {
        ...(params || {}),
        'tokenLifetimePolicy-id': this.tokenLifetimePolicyId,
      }
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints['POST /applications/{application-id}/tokenLifetimePolicies/$ref']['response']
      );
  }
}
