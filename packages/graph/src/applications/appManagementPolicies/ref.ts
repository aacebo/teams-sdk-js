import qs from 'qs';
import * as http from '@teams.sdk/common/http';

import pkg from 'src/../package.json';
import type { Endpoints } from './ref-types.d.ts';

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
 * /applications/{application-id}/appManagementPolicies/{appManagementPolicy-id}/ref
 * Provides operations to manage the collection of application entities.
 */
export class RefClient {
  protected baseUrl =
    '/applications/{application-id}/appManagementPolicies/{appManagementPolicy-id}/ref';
  protected http: http.Client;

  constructor(
    protected readonly appManagementPolicyId: string,
    options?: http.Client | http.ClientOptions
  ) {
    if (!options) {
      this.http = new http.Client({
        baseUrl: 'https://graph.microsoft.com/v1.0',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': `teams[graph]/${pkg.version}`,
        },
      });
    } else if ('request' in options) {
      this.http = options;
    } else {
      this.http = new http.Client({
        ...options,
        baseUrl: 'https://graph.microsoft.com/v1.0',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': `teams[graph]/${pkg.version}`,
          ...options.headers,
        },
      });
    }
  }

  /**
   * `DELETE /applications/{application-id}/appManagementPolicies/$ref`
   *
   * Remove an appManagementPolicy policy object from an application or service principal object. When you remove the appManagementPolicy, the application or service principal adopts the tenant-wide tenantAppManagementPolicy setting.
   */
  async delete$1(
    params?: Endpoints['DELETE /applications/{application-id}/appManagementPolicies/$ref']['parameters'],
    config?: http.RequestConfig
  ) {
    const url = getInjectedUrl(
      '/applications/{application-id}/appManagementPolicies/$ref',
      [
        { name: 'If-Match', in: 'header' },
        { name: '@id', in: 'query' },
        { name: 'application-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'appManagementPolicy-id': this.appManagementPolicyId,
      }
    );

    return this.http
      .delete(url, config)
      .then(
        (res) =>
          res.data as Endpoints['DELETE /applications/{application-id}/appManagementPolicies/$ref']['response']
      );
  }

  /**
   * `DELETE /applications/{application-id}/appManagementPolicies/{appManagementPolicy-id}/$ref`
   *
   * Remove an appManagementPolicy policy object from an application or service principal object. When you remove the appManagementPolicy, the application or service principal adopts the tenant-wide tenantAppManagementPolicy setting.
   */
  async delete(
    params?: Endpoints['DELETE /applications/{application-id}/appManagementPolicies/{appManagementPolicy-id}/$ref']['parameters'],
    config?: http.RequestConfig
  ) {
    const url = getInjectedUrl(
      '/applications/{application-id}/appManagementPolicies/{appManagementPolicy-id}/$ref',
      [
        { name: 'If-Match', in: 'header' },
        { name: 'application-id', in: 'path' },
        { name: 'appManagementPolicy-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'appManagementPolicy-id': this.appManagementPolicyId,
      }
    );

    return this.http
      .delete(url, config)
      .then(
        (res) =>
          res.data as Endpoints['DELETE /applications/{application-id}/appManagementPolicies/{appManagementPolicy-id}/$ref']['response']
      );
  }

  /**
   * `GET /applications/{application-id}/appManagementPolicies/$ref`
   *
   * The appManagementPolicy applied to this application.
   */
  async get(
    params?: Endpoints['GET /applications/{application-id}/appManagementPolicies/$ref']['parameters'],
    config?: http.RequestConfig
  ) {
    const url = getInjectedUrl(
      '/applications/{application-id}/appManagementPolicies/$ref',
      [
        { name: '$orderby', in: 'query' },
        { name: 'application-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'appManagementPolicy-id': this.appManagementPolicyId,
      }
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints['GET /applications/{application-id}/appManagementPolicies/$ref']['response']
      );
  }

  /**
   * `POST /applications/{application-id}/appManagementPolicies/$ref`
   *
   * Assign an appManagementPolicy policy object to an application or service principal object. The application or service principal adopts this policy over the tenant-wide tenantAppManagementPolicy setting. Only one policy object can be assigned to an application or service principal.
   */
  async create(
    body: Endpoints['POST /applications/{application-id}/appManagementPolicies/$ref']['body'],
    params?: Endpoints['POST /applications/{application-id}/appManagementPolicies/$ref']['parameters'],
    config?: http.RequestConfig
  ) {
    const url = getInjectedUrl(
      '/applications/{application-id}/appManagementPolicies/$ref',
      [{ name: 'application-id', in: 'path' }],
      {
        ...(params || {}),
        'appManagementPolicy-id': this.appManagementPolicyId,
      }
    );

    return this.http
      .post(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints['POST /applications/{application-id}/appManagementPolicies/$ref']['response']
      );
  }
}
