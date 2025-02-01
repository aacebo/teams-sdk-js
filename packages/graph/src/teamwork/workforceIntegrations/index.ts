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
 * /teamwork/workforceIntegrations
 * Provides operations to manage the workforceIntegrations property of the microsoft.graph.teamwork entity.
 */
export class WorkforceIntegrationsClient {
  protected baseUrl = '/teamwork/workforceIntegrations';
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
   * `/teamwork/workforceIntegrations/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `DELETE /teamwork/workforceIntegrations/{workforceIntegration-id}`
   *
   * Delete an instance of a workforceIntegration.
   */
  async delete(
    params?: Endpoints['DELETE /teamwork/workforceIntegrations/{workforceIntegration-id}']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl(
      '/teamwork/workforceIntegrations/{workforceIntegration-id}',
      [
        { name: 'If-Match', in: 'header' },
        { name: 'workforceIntegration-id', in: 'path' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .delete(url, config)
      .then(
        (res) =>
          res.data as Endpoints['DELETE /teamwork/workforceIntegrations/{workforceIntegration-id}']['response']
      );
  }

  /**
   * `GET /teamwork/workforceIntegrations`
   *
   * Retrieve a list of workforceIntegration objects.
   */
  async list(
    params?: Endpoints['GET /teamwork/workforceIntegrations']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl(
      '/teamwork/workforceIntegrations',
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
      .then((res) => res.data as Endpoints['GET /teamwork/workforceIntegrations']['response']);
  }

  /**
   * `GET /teamwork/workforceIntegrations/{workforceIntegration-id}`
   *
   * Retrieve the properties and relationships of a workforceIntegration object.
   */
  async get(
    params?: Endpoints['GET /teamwork/workforceIntegrations/{workforceIntegration-id}']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl(
      '/teamwork/workforceIntegrations/{workforceIntegration-id}',
      [
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'workforceIntegration-id', in: 'path' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints['GET /teamwork/workforceIntegrations/{workforceIntegration-id}']['response']
      );
  }

  /**
   * `PATCH /teamwork/workforceIntegrations/{workforceIntegration-id}`
   *
   * Update the properties of a workforceIntegration object.
   */
  async update(
    body: Endpoints['PATCH /teamwork/workforceIntegrations/{workforceIntegration-id}']['body'],
    params?: Endpoints['PATCH /teamwork/workforceIntegrations/{workforceIntegration-id}']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl(
      '/teamwork/workforceIntegrations/{workforceIntegration-id}',
      [{ name: 'workforceIntegration-id', in: 'path' }],
      {
        ...(params || {}),
      }
    );

    return this.http
      .patch(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints['PATCH /teamwork/workforceIntegrations/{workforceIntegration-id}']['response']
      );
  }

  /**
   * `POST /teamwork/workforceIntegrations`
   *
   * Create a new workforceIntegration object.
You can set up which entities you want to receive Shifts synchronous change notifications on and set entities to configure filtering by WFM rules eligibility for, including swap requests.
   */
  async create(
    body: Endpoints['POST /teamwork/workforceIntegrations']['body'],
    params?: Endpoints['POST /teamwork/workforceIntegrations']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl('/teamwork/workforceIntegrations', [], {
      ...(params || {}),
    });

    return this.http
      .post(url, body, config)
      .then((res) => res.data as Endpoints['POST /teamwork/workforceIntegrations']['response']);
  }
}
