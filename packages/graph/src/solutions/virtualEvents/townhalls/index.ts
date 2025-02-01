import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './index-types.d.ts';
import { CountClient } from './count';
import { PresentersClient } from './presenters';
import { SessionsClient } from './sessions';

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
 * /solutions/virtualEvents/townhalls
 * Provides operations to call the getByUserRole method.
 */
export class TownhallsClient {
  protected baseUrl = '/solutions/virtualEvents/townhalls';
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
   * `/solutions/virtualEvents/townhalls/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `/solutions/virtualEvents/townhalls/{virtualEventTownhall-id}/presenters`
   *
   * Provides operations to manage the presenters property of the microsoft.graph.virtualEvent entity.
   */
  presenters(virtualEventTownhallId: string) {
    return new PresentersClient(virtualEventTownhallId, this.http);
  }

  /**
   * `/solutions/virtualEvents/townhalls/{virtualEventTownhall-id}/sessions`
   *
   * Provides operations to manage the sessions property of the microsoft.graph.virtualEvent entity.
   */
  sessions(virtualEventTownhallId: string) {
    return new SessionsClient(virtualEventTownhallId, this.http);
  }

  /**
   * `DELETE /solutions/virtualEvents/townhalls/{virtualEventTownhall-id}`
   *
   */
  async delete(
    body: Endpoints['DELETE /solutions/virtualEvents/townhalls/{virtualEventTownhall-id}']['body'],
    params?: Endpoints['DELETE /solutions/virtualEvents/townhalls/{virtualEventTownhall-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/solutions/virtualEvents/townhalls/{virtualEventTownhall-id}',
      [
        { name: 'If-Match', in: 'header' },
        { name: 'virtualEventTownhall-id', in: 'path' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints['DELETE /solutions/virtualEvents/townhalls/{virtualEventTownhall-id}']['response']
      );
  }

  /**
   * `GET /solutions/virtualEvents/townhalls`
   *
   * Read the properties and relationships of a virtualEventTownhall object. All roles can get the details of a townhall event.
   */
  async list(params?: Endpoints['GET /solutions/virtualEvents/townhalls']['parameters']) {
    const url = getInjectedUrl(
      '/solutions/virtualEvents/townhalls',
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
      .get(url)
      .then((res) => res.data as Endpoints['GET /solutions/virtualEvents/townhalls']['response']);
  }

  /**
   * `GET /solutions/virtualEvents/townhalls/getByUserIdAndRole(userId&#x3D;&#x27;{userId}&#x27;,role&#x3D;&#x27;{role}&#x27;)`
   *
   * Get a list of virtualEventTownhall objects where the specified user is either the organizer or a coorganizer.
   */
  async get$1(
    params?: Endpoints['GET /solutions/virtualEvents/townhalls/getByUserIdAndRole(userId&#x3D;&#x27;{userId}&#x27;,role&#x3D;&#x27;{role}&#x27;)']['parameters']
  ) {
    const url = getInjectedUrl(
      '/solutions/virtualEvents/townhalls/getByUserIdAndRole(userId&#x3D;&#x27;{userId}&#x27;,role&#x3D;&#x27;{role}&#x27;)',
      [
        { name: '$select', in: 'query' },
        { name: '$orderby', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'userId', in: 'path' },
        { name: 'role', in: 'path' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints['GET /solutions/virtualEvents/townhalls/getByUserIdAndRole(userId&#x3D;&#x27;{userId}&#x27;,role&#x3D;&#x27;{role}&#x27;)']['response']
      );
  }

  /**
   * `GET /solutions/virtualEvents/townhalls/getByUserRole(role&#x3D;&#x27;{role}&#x27;)`
   *
   * Get a list of virtualEventTownhall objects where the signed-in user is either the organizer or a coorganizer.
   */
  async get$2(
    params?: Endpoints['GET /solutions/virtualEvents/townhalls/getByUserRole(role&#x3D;&#x27;{role}&#x27;)']['parameters']
  ) {
    const url = getInjectedUrl(
      '/solutions/virtualEvents/townhalls/getByUserRole(role&#x3D;&#x27;{role}&#x27;)',
      [
        { name: '$select', in: 'query' },
        { name: '$orderby', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'role', in: 'path' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints['GET /solutions/virtualEvents/townhalls/getByUserRole(role&#x3D;&#x27;{role}&#x27;)']['response']
      );
  }

  /**
   * `GET /solutions/virtualEvents/townhalls/{virtualEventTownhall-id}`
   *
   * Read the properties and relationships of a virtualEventTownhall object. All roles can get the details of a townhall event.
   */
  async get(
    params?: Endpoints['GET /solutions/virtualEvents/townhalls/{virtualEventTownhall-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/solutions/virtualEvents/townhalls/{virtualEventTownhall-id}',
      [
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'virtualEventTownhall-id', in: 'path' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints['GET /solutions/virtualEvents/townhalls/{virtualEventTownhall-id}']['response']
      );
  }

  /**
   * `PATCH /solutions/virtualEvents/townhalls/{virtualEventTownhall-id}`
   *
   * Update the properties of a virtualEventTownhall object. Only the Organizer and Co-organizer can make changes to a townhall event.
   */
  async update(
    body: Endpoints['PATCH /solutions/virtualEvents/townhalls/{virtualEventTownhall-id}']['body'],
    params?: Endpoints['PATCH /solutions/virtualEvents/townhalls/{virtualEventTownhall-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/solutions/virtualEvents/townhalls/{virtualEventTownhall-id}',
      [{ name: 'virtualEventTownhall-id', in: 'path' }],
      {
        ...(params || {}),
      }
    );

    return this.http
      .patch(url, body)
      .then(
        (res) =>
          res.data as Endpoints['PATCH /solutions/virtualEvents/townhalls/{virtualEventTownhall-id}']['response']
      );
  }

  /**
   * `POST /solutions/virtualEvents/townhalls`
   *
   * Create a new virtualEventTownhall object in draft mode.
   */
  async create(
    body: Endpoints['POST /solutions/virtualEvents/townhalls']['body'],
    params?: Endpoints['POST /solutions/virtualEvents/townhalls']['parameters']
  ) {
    const url = getInjectedUrl('/solutions/virtualEvents/townhalls', [], {
      ...(params || {}),
    });

    return this.http
      .post(url, body)
      .then((res) => res.data as Endpoints['POST /solutions/virtualEvents/townhalls']['response']);
  }
}
