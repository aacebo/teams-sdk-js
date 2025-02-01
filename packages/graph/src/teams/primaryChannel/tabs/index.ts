import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './index-types.d.ts';
import { CountClient } from './count';
import { TeamsAppClient } from './teamsApp';

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
 * /teams/{team-id}/primaryChannel/tabs
 * Provides operations to manage the tabs property of the microsoft.graph.channel entity.
 */
export class TabsClient {
  protected baseUrl = '/teams/{team-id}/primaryChannel/tabs';
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
   * `/teams/{team-id}/primaryChannel/tabs/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `/teams/{team-id}/primaryChannel/tabs/{teamsTab-id}/teamsApp`
   *
   * Provides operations to manage the teamsApp property of the microsoft.graph.teamsTab entity.
   */
  teamsApp(teamsTabId: string) {
    return new TeamsAppClient(teamsTabId, this.http);
  }

  /**
   * `DELETE /teams/{team-id}/primaryChannel/tabs/{teamsTab-id}`
   *
   */
  async delete(
    body: Endpoints['DELETE /teams/{team-id}/primaryChannel/tabs/{teamsTab-id}']['body'],
    params?: Endpoints['DELETE /teams/{team-id}/primaryChannel/tabs/{teamsTab-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/teams/{team-id}/primaryChannel/tabs/{teamsTab-id}',
      [
        { name: 'If-Match', in: 'header' },
        { name: 'team-id', in: 'path' },
        { name: 'teamsTab-id', in: 'path' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints['DELETE /teams/{team-id}/primaryChannel/tabs/{teamsTab-id}']['response']
      );
  }

  /**
   * `GET /teams/{team-id}/primaryChannel/tabs`
   *
   * A collection of all the tabs in the channel. A navigation property.
   */
  async list(params?: Endpoints['GET /teams/{team-id}/primaryChannel/tabs']['parameters']) {
    const url = getInjectedUrl(
      '/teams/{team-id}/primaryChannel/tabs',
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
      .get(url)
      .then((res) => res.data as Endpoints['GET /teams/{team-id}/primaryChannel/tabs']['response']);
  }

  /**
   * `GET /teams/{team-id}/primaryChannel/tabs/{teamsTab-id}`
   *
   * A collection of all the tabs in the channel. A navigation property.
   */
  async get(
    params?: Endpoints['GET /teams/{team-id}/primaryChannel/tabs/{teamsTab-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/teams/{team-id}/primaryChannel/tabs/{teamsTab-id}',
      [
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'team-id', in: 'path' },
        { name: 'teamsTab-id', in: 'path' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints['GET /teams/{team-id}/primaryChannel/tabs/{teamsTab-id}']['response']
      );
  }

  /**
   * `PATCH /teams/{team-id}/primaryChannel/tabs/{teamsTab-id}`
   *
   */
  async update(
    body: Endpoints['PATCH /teams/{team-id}/primaryChannel/tabs/{teamsTab-id}']['body'],
    params?: Endpoints['PATCH /teams/{team-id}/primaryChannel/tabs/{teamsTab-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/teams/{team-id}/primaryChannel/tabs/{teamsTab-id}',
      [
        { name: 'team-id', in: 'path' },
        { name: 'teamsTab-id', in: 'path' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .patch(url, body)
      .then(
        (res) =>
          res.data as Endpoints['PATCH /teams/{team-id}/primaryChannel/tabs/{teamsTab-id}']['response']
      );
  }

  /**
   * `POST /teams/{team-id}/primaryChannel/tabs`
   *
   */
  async create(
    body: Endpoints['POST /teams/{team-id}/primaryChannel/tabs']['body'],
    params?: Endpoints['POST /teams/{team-id}/primaryChannel/tabs']['parameters']
  ) {
    const url = getInjectedUrl(
      '/teams/{team-id}/primaryChannel/tabs',
      [{ name: 'team-id', in: 'path' }],
      {
        ...(params || {}),
      }
    );

    return this.http
      .post(url, body)
      .then(
        (res) => res.data as Endpoints['POST /teams/{team-id}/primaryChannel/tabs']['response']
      );
  }
}
