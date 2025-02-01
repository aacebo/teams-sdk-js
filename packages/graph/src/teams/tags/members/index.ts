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
 * /teams/{team-id}/tags/{teamworkTag-id}/members
 * Provides operations to manage the members property of the microsoft.graph.teamworkTag entity.
 */
export class MembersClient {
  protected baseUrl = '/teams/{team-id}/tags/{teamworkTag-id}/members';
  protected http: AxiosInstance;

  constructor(
    protected readonly teamworkTagId: string,
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
   * `/teams/{team-id}/tags/{teamworkTag-id}/members/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `DELETE /teams/{team-id}/tags/{teamworkTag-id}/members/{teamworkTagMember-id}`
   *
   * Delete a member from a standard tag in a team.
   */
  async delete(
    params?: Endpoints['DELETE /teams/{team-id}/tags/{teamworkTag-id}/members/{teamworkTagMember-id}']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl(
      '/teams/{team-id}/tags/{teamworkTag-id}/members/{teamworkTagMember-id}',
      [
        { name: 'If-Match', in: 'header' },
        { name: 'team-id', in: 'path' },
        { name: 'teamworkTag-id', in: 'path' },
        { name: 'teamworkTagMember-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'teamworkTag-id': this.teamworkTagId,
      }
    );

    return this.http
      .delete(url, config)
      .then(
        (res) =>
          res.data as Endpoints['DELETE /teams/{team-id}/tags/{teamworkTag-id}/members/{teamworkTagMember-id}']['response']
      );
  }

  /**
   * `GET /teams/{team-id}/tags/{teamworkTag-id}/members`
   *
   * Get a list of the members of a standard tag in a team and their properties.
   */
  async list(
    params?: Endpoints['GET /teams/{team-id}/tags/{teamworkTag-id}/members']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl(
      '/teams/{team-id}/tags/{teamworkTag-id}/members',
      [
        { name: '$orderby', in: 'query' },
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'team-id', in: 'path' },
        { name: 'teamworkTag-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'teamworkTag-id': this.teamworkTagId,
      }
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints['GET /teams/{team-id}/tags/{teamworkTag-id}/members']['response']
      );
  }

  /**
   * `GET /teams/{team-id}/tags/{teamworkTag-id}/members/{teamworkTagMember-id}`
   *
   * Get the properties and relationships of a member of a standard tag in a team.
   */
  async get(
    params?: Endpoints['GET /teams/{team-id}/tags/{teamworkTag-id}/members/{teamworkTagMember-id}']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl(
      '/teams/{team-id}/tags/{teamworkTag-id}/members/{teamworkTagMember-id}',
      [
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'team-id', in: 'path' },
        { name: 'teamworkTag-id', in: 'path' },
        { name: 'teamworkTagMember-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'teamworkTag-id': this.teamworkTagId,
      }
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints['GET /teams/{team-id}/tags/{teamworkTag-id}/members/{teamworkTagMember-id}']['response']
      );
  }

  /**
   * `PATCH /teams/{team-id}/tags/{teamworkTag-id}/members/{teamworkTagMember-id}`
   *
   */
  async update(
    body: Endpoints['PATCH /teams/{team-id}/tags/{teamworkTag-id}/members/{teamworkTagMember-id}']['body'],
    params?: Endpoints['PATCH /teams/{team-id}/tags/{teamworkTag-id}/members/{teamworkTagMember-id}']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl(
      '/teams/{team-id}/tags/{teamworkTag-id}/members/{teamworkTagMember-id}',
      [
        { name: 'team-id', in: 'path' },
        { name: 'teamworkTag-id', in: 'path' },
        { name: 'teamworkTagMember-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'teamworkTag-id': this.teamworkTagId,
      }
    );

    return this.http
      .patch(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints['PATCH /teams/{team-id}/tags/{teamworkTag-id}/members/{teamworkTagMember-id}']['response']
      );
  }

  /**
   * `POST /teams/{team-id}/tags/{teamworkTag-id}/members`
   *
   * Create a new teamworkTagMember object in a team.
   */
  async create(
    body: Endpoints['POST /teams/{team-id}/tags/{teamworkTag-id}/members']['body'],
    params?: Endpoints['POST /teams/{team-id}/tags/{teamworkTag-id}/members']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl(
      '/teams/{team-id}/tags/{teamworkTag-id}/members',
      [
        { name: 'team-id', in: 'path' },
        { name: 'teamworkTag-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'teamworkTag-id': this.teamworkTagId,
      }
    );

    return this.http
      .post(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints['POST /teams/{team-id}/tags/{teamworkTag-id}/members']['response']
      );
  }
}
