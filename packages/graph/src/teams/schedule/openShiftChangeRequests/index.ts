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
 * /teams/{team-id}/schedule/openShiftChangeRequests
 * Provides operations to manage the openShiftChangeRequests property of the microsoft.graph.schedule entity.
 */
export class OpenShiftChangeRequestsClient {
  protected baseUrl = '/teams/{team-id}/schedule/openShiftChangeRequests';
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
   * `/teams/{team-id}/schedule/openShiftChangeRequests/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `DELETE /teams/{team-id}/schedule/openShiftChangeRequests/{openShiftChangeRequest-id}`
   *
   */
  async delete(
    params?: Endpoints['DELETE /teams/{team-id}/schedule/openShiftChangeRequests/{openShiftChangeRequest-id}']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl(
      '/teams/{team-id}/schedule/openShiftChangeRequests/{openShiftChangeRequest-id}',
      [
        { name: 'If-Match', in: 'header' },
        { name: 'team-id', in: 'path' },
        { name: 'openShiftChangeRequest-id', in: 'path' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .delete(url, config)
      .then(
        (res) =>
          res.data as Endpoints['DELETE /teams/{team-id}/schedule/openShiftChangeRequests/{openShiftChangeRequest-id}']['response']
      );
  }

  /**
   * `GET /teams/{team-id}/schedule/openShiftChangeRequests`
   *
   * Retrieve a list of openShiftChangeRequest objects in a team.
   */
  async list(
    params?: Endpoints['GET /teams/{team-id}/schedule/openShiftChangeRequests']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl(
      '/teams/{team-id}/schedule/openShiftChangeRequests',
      [
        { name: '$orderby', in: 'query' },
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'team-id', in: 'path' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints['GET /teams/{team-id}/schedule/openShiftChangeRequests']['response']
      );
  }

  /**
   * `GET /teams/{team-id}/schedule/openShiftChangeRequests/{openShiftChangeRequest-id}`
   *
   * Retrieve the properties and relationships of an openShiftChangeRequest object.
   */
  async get(
    params?: Endpoints['GET /teams/{team-id}/schedule/openShiftChangeRequests/{openShiftChangeRequest-id}']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl(
      '/teams/{team-id}/schedule/openShiftChangeRequests/{openShiftChangeRequest-id}',
      [
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'team-id', in: 'path' },
        { name: 'openShiftChangeRequest-id', in: 'path' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints['GET /teams/{team-id}/schedule/openShiftChangeRequests/{openShiftChangeRequest-id}']['response']
      );
  }

  /**
   * `PATCH /teams/{team-id}/schedule/openShiftChangeRequests/{openShiftChangeRequest-id}`
   *
   */
  async update(
    body: Endpoints['PATCH /teams/{team-id}/schedule/openShiftChangeRequests/{openShiftChangeRequest-id}']['body'],
    params?: Endpoints['PATCH /teams/{team-id}/schedule/openShiftChangeRequests/{openShiftChangeRequest-id}']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl(
      '/teams/{team-id}/schedule/openShiftChangeRequests/{openShiftChangeRequest-id}',
      [
        { name: 'team-id', in: 'path' },
        { name: 'openShiftChangeRequest-id', in: 'path' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .patch(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints['PATCH /teams/{team-id}/schedule/openShiftChangeRequests/{openShiftChangeRequest-id}']['response']
      );
  }

  /**
   * `POST /teams/{team-id}/schedule/openShiftChangeRequests`
   *
   * Create instance of an openShiftChangeRequest object.
   */
  async create(
    body: Endpoints['POST /teams/{team-id}/schedule/openShiftChangeRequests']['body'],
    params?: Endpoints['POST /teams/{team-id}/schedule/openShiftChangeRequests']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl(
      '/teams/{team-id}/schedule/openShiftChangeRequests',
      [{ name: 'team-id', in: 'path' }],
      {
        ...(params || {}),
      }
    );

    return this.http
      .post(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints['POST /teams/{team-id}/schedule/openShiftChangeRequests']['response']
      );
  }
}
