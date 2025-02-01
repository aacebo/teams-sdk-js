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
 * /communications/calls/{call-id}/audioRoutingGroups
 * Provides operations to manage the audioRoutingGroups property of the microsoft.graph.call entity.
 */
export class AudioRoutingGroupsClient {
  protected baseUrl = '/communications/calls/{call-id}/audioRoutingGroups';
  protected http: AxiosInstance;

  constructor(
    protected readonly callId: string,
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
   * `/communications/calls/{call-id}/audioRoutingGroups/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `DELETE /communications/calls/{call-id}/audioRoutingGroups/{audioRoutingGroup-id}`
   *
   * Delete the specified audioRoutingGroup.
   */
  async delete(
    params?: Endpoints['DELETE /communications/calls/{call-id}/audioRoutingGroups/{audioRoutingGroup-id}']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl(
      '/communications/calls/{call-id}/audioRoutingGroups/{audioRoutingGroup-id}',
      [
        { name: 'If-Match', in: 'header' },
        { name: 'call-id', in: 'path' },
        { name: 'audioRoutingGroup-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'call-id': this.callId,
      }
    );

    return this.http
      .delete(url, config)
      .then(
        (res) =>
          res.data as Endpoints['DELETE /communications/calls/{call-id}/audioRoutingGroups/{audioRoutingGroup-id}']['response']
      );
  }

  /**
   * `GET /communications/calls/{call-id}/audioRoutingGroups`
   *
   * Retrieve a list of audioRoutingGroup objects.
   */
  async list(
    params?: Endpoints['GET /communications/calls/{call-id}/audioRoutingGroups']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl(
      '/communications/calls/{call-id}/audioRoutingGroups',
      [
        { name: '$orderby', in: 'query' },
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'call-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'call-id': this.callId,
      }
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints['GET /communications/calls/{call-id}/audioRoutingGroups']['response']
      );
  }

  /**
   * `GET /communications/calls/{call-id}/audioRoutingGroups/{audioRoutingGroup-id}`
   *
   * Retrieve the properties and relationships of an audioRoutingGroup object.
   */
  async get(
    params?: Endpoints['GET /communications/calls/{call-id}/audioRoutingGroups/{audioRoutingGroup-id}']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl(
      '/communications/calls/{call-id}/audioRoutingGroups/{audioRoutingGroup-id}',
      [
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'call-id', in: 'path' },
        { name: 'audioRoutingGroup-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'call-id': this.callId,
      }
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints['GET /communications/calls/{call-id}/audioRoutingGroups/{audioRoutingGroup-id}']['response']
      );
  }

  /**
   * `PATCH /communications/calls/{call-id}/audioRoutingGroups/{audioRoutingGroup-id}`
   *
   * Modify sources and receivers of an audioRoutingGroup.
   */
  async update(
    body: Endpoints['PATCH /communications/calls/{call-id}/audioRoutingGroups/{audioRoutingGroup-id}']['body'],
    params?: Endpoints['PATCH /communications/calls/{call-id}/audioRoutingGroups/{audioRoutingGroup-id}']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl(
      '/communications/calls/{call-id}/audioRoutingGroups/{audioRoutingGroup-id}',
      [
        { name: 'call-id', in: 'path' },
        { name: 'audioRoutingGroup-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'call-id': this.callId,
      }
    );

    return this.http
      .patch(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints['PATCH /communications/calls/{call-id}/audioRoutingGroups/{audioRoutingGroup-id}']['response']
      );
  }

  /**
   * `POST /communications/calls/{call-id}/audioRoutingGroups`
   *
   * Create a new audioRoutingGroup.
   */
  async create(
    body: Endpoints['POST /communications/calls/{call-id}/audioRoutingGroups']['body'],
    params?: Endpoints['POST /communications/calls/{call-id}/audioRoutingGroups']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl(
      '/communications/calls/{call-id}/audioRoutingGroups',
      [{ name: 'call-id', in: 'path' }],
      {
        ...(params || {}),
        'call-id': this.callId,
      }
    );

    return this.http
      .post(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints['POST /communications/calls/{call-id}/audioRoutingGroups']['response']
      );
  }
}
