import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './index-types.d.ts';
import { CountClient } from './count';

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
 * /teams/{team-id}/operations
 * Provides operations to manage the operations property of the microsoft.graph.team entity.
 */
export class OperationsClient {
  protected baseUrl = '/teams/{team-id}/operations';
  protected http: AxiosInstance;

  constructor(
    protected readonly teamId: string,
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
   * `/teams/{team-id}/operations/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `DELETE /teams/{team-id}/operations/{teamsAsyncOperation-id}`
   *
   */
  async delete(
    body: Endpoints['DELETE /teams/{team-id}/operations/{teamsAsyncOperation-id}']['body'],
    params?: Endpoints['DELETE /teams/{team-id}/operations/{teamsAsyncOperation-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/teams/{team-id}/operations/{teamsAsyncOperation-id}',
      [
        { name: 'If-Match', in: 'header' },
        { name: 'team-id', in: 'path' },
        { name: 'teamsAsyncOperation-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'team-id': this.teamId,
      }
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints['DELETE /teams/{team-id}/operations/{teamsAsyncOperation-id}']['response']
      );
  }

  /**
   * `GET /teams/{team-id}/operations`
   *
   * The async operations that ran or are running on this team.
   */
  async list(params?: Endpoints['GET /teams/{team-id}/operations']['parameters']) {
    const url = getInjectedUrl(
      '/teams/{team-id}/operations',
      [
        { name: '$orderby', in: 'query' },
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'team-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'team-id': this.teamId,
      }
    );

    return this.http
      .get(url)
      .then((res) => res.data as Endpoints['GET /teams/{team-id}/operations']['response']);
  }

  /**
   * `GET /teams/{team-id}/operations/{teamsAsyncOperation-id}`
   *
   * The async operations that ran or are running on this team.
   */
  async get(
    params?: Endpoints['GET /teams/{team-id}/operations/{teamsAsyncOperation-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/teams/{team-id}/operations/{teamsAsyncOperation-id}',
      [
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'team-id', in: 'path' },
        { name: 'teamsAsyncOperation-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'team-id': this.teamId,
      }
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints['GET /teams/{team-id}/operations/{teamsAsyncOperation-id}']['response']
      );
  }

  /**
   * `PATCH /teams/{team-id}/operations/{teamsAsyncOperation-id}`
   *
   */
  async update(
    body: Endpoints['PATCH /teams/{team-id}/operations/{teamsAsyncOperation-id}']['body'],
    params?: Endpoints['PATCH /teams/{team-id}/operations/{teamsAsyncOperation-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/teams/{team-id}/operations/{teamsAsyncOperation-id}',
      [
        { name: 'team-id', in: 'path' },
        { name: 'teamsAsyncOperation-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'team-id': this.teamId,
      }
    );

    return this.http
      .patch(url, body)
      .then(
        (res) =>
          res.data as Endpoints['PATCH /teams/{team-id}/operations/{teamsAsyncOperation-id}']['response']
      );
  }

  /**
   * `POST /teams/{team-id}/operations`
   *
   */
  async create(
    body: Endpoints['POST /teams/{team-id}/operations']['body'],
    params?: Endpoints['POST /teams/{team-id}/operations']['parameters']
  ) {
    const url = getInjectedUrl('/teams/{team-id}/operations', [{ name: 'team-id', in: 'path' }], {
      ...(params || {}),
      'team-id': this.teamId,
    });

    return this.http
      .post(url, body)
      .then((res) => res.data as Endpoints['POST /teams/{team-id}/operations']['response']);
  }
}
