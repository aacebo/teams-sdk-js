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
 * /applications/{application-id}/tokenIssuancePolicies/{tokenIssuancePolicy-id}/ref
 * Provides operations to manage the collection of application entities.
 */
export class RefClient {
  protected baseUrl =
    '/applications/{application-id}/tokenIssuancePolicies/{tokenIssuancePolicy-id}/ref';
  protected http: AxiosInstance;

  constructor(
    protected readonly tokenIssuancePolicyId: string,
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
   * `DELETE /applications/{application-id}/tokenIssuancePolicies/$ref`
   *
   * Remove a tokenIssuancePolicy from an application.
   */
  async delete$1(
    body: Endpoints['DELETE /applications/{application-id}/tokenIssuancePolicies/$ref']['body'],
    params?: Endpoints['DELETE /applications/{application-id}/tokenIssuancePolicies/$ref']['parameters']
  ) {
    const url = getInjectedUrl(
      '/applications/{application-id}/tokenIssuancePolicies/$ref',
      [
        { name: 'If-Match', in: 'header' },
        { name: '@id', in: 'query' },
        { name: 'application-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'tokenIssuancePolicy-id': this.tokenIssuancePolicyId,
      }
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints['DELETE /applications/{application-id}/tokenIssuancePolicies/$ref']['response']
      );
  }

  /**
   * `DELETE /applications/{application-id}/tokenIssuancePolicies/{tokenIssuancePolicy-id}/$ref`
   *
   * Remove a tokenIssuancePolicy from an application.
   */
  async delete(
    body: Endpoints['DELETE /applications/{application-id}/tokenIssuancePolicies/{tokenIssuancePolicy-id}/$ref']['body'],
    params?: Endpoints['DELETE /applications/{application-id}/tokenIssuancePolicies/{tokenIssuancePolicy-id}/$ref']['parameters']
  ) {
    const url = getInjectedUrl(
      '/applications/{application-id}/tokenIssuancePolicies/{tokenIssuancePolicy-id}/$ref',
      [
        { name: 'If-Match', in: 'header' },
        { name: 'application-id', in: 'path' },
        { name: 'tokenIssuancePolicy-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'tokenIssuancePolicy-id': this.tokenIssuancePolicyId,
      }
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints['DELETE /applications/{application-id}/tokenIssuancePolicies/{tokenIssuancePolicy-id}/$ref']['response']
      );
  }

  /**
   * `GET /applications/{application-id}/tokenIssuancePolicies/$ref`
   *
   * List the tokenIssuancePolicy objects that are assigned to an application.
   */
  async get(
    params?: Endpoints['GET /applications/{application-id}/tokenIssuancePolicies/$ref']['parameters']
  ) {
    const url = getInjectedUrl(
      '/applications/{application-id}/tokenIssuancePolicies/$ref',
      [
        { name: '$orderby', in: 'query' },
        { name: 'application-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'tokenIssuancePolicy-id': this.tokenIssuancePolicyId,
      }
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints['GET /applications/{application-id}/tokenIssuancePolicies/$ref']['response']
      );
  }

  /**
   * `POST /applications/{application-id}/tokenIssuancePolicies/$ref`
   *
   * Assign a tokenIssuancePolicy to an application.
   */
  async create(
    body: Endpoints['POST /applications/{application-id}/tokenIssuancePolicies/$ref']['body'],
    params?: Endpoints['POST /applications/{application-id}/tokenIssuancePolicies/$ref']['parameters']
  ) {
    const url = getInjectedUrl(
      '/applications/{application-id}/tokenIssuancePolicies/$ref',
      [{ name: 'application-id', in: 'path' }],
      {
        ...(params || {}),
        'tokenIssuancePolicy-id': this.tokenIssuancePolicyId,
      }
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints['POST /applications/{application-id}/tokenIssuancePolicies/$ref']['response']
      );
  }
}
