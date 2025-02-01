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
 * /solutions/virtualEvents/events/{virtualEvent-id}/presenters
 * Provides operations to manage the presenters property of the microsoft.graph.virtualEvent entity.
 */
export class PresentersClient {
  protected baseUrl = '/solutions/virtualEvents/events/{virtualEvent-id}/presenters';
  protected http: AxiosInstance;

  constructor(
    protected readonly virtualEventId: string,
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
   * `/solutions/virtualEvents/events/{virtualEvent-id}/presenters/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `DELETE /solutions/virtualEvents/events/{virtualEvent-id}/presenters/{virtualEventPresenter-id}`
   *
   */
  async delete(
    body: Endpoints['DELETE /solutions/virtualEvents/events/{virtualEvent-id}/presenters/{virtualEventPresenter-id}']['body'],
    params?: Endpoints['DELETE /solutions/virtualEvents/events/{virtualEvent-id}/presenters/{virtualEventPresenter-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/solutions/virtualEvents/events/{virtualEvent-id}/presenters/{virtualEventPresenter-id}',
      [
        { name: 'If-Match', in: 'header' },
        { name: 'virtualEvent-id', in: 'path' },
        { name: 'virtualEventPresenter-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'virtualEvent-id': this.virtualEventId,
      }
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints['DELETE /solutions/virtualEvents/events/{virtualEvent-id}/presenters/{virtualEventPresenter-id}']['response']
      );
  }

  /**
   * `GET /solutions/virtualEvents/events/{virtualEvent-id}/presenters`
   *
   * The virtual event presenters.
   */
  async list(
    params?: Endpoints['GET /solutions/virtualEvents/events/{virtualEvent-id}/presenters']['parameters']
  ) {
    const url = getInjectedUrl(
      '/solutions/virtualEvents/events/{virtualEvent-id}/presenters',
      [
        { name: '$orderby', in: 'query' },
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'virtualEvent-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'virtualEvent-id': this.virtualEventId,
      }
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints['GET /solutions/virtualEvents/events/{virtualEvent-id}/presenters']['response']
      );
  }

  /**
   * `GET /solutions/virtualEvents/events/{virtualEvent-id}/presenters/{virtualEventPresenter-id}`
   *
   * The virtual event presenters.
   */
  async get(
    params?: Endpoints['GET /solutions/virtualEvents/events/{virtualEvent-id}/presenters/{virtualEventPresenter-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/solutions/virtualEvents/events/{virtualEvent-id}/presenters/{virtualEventPresenter-id}',
      [
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'virtualEvent-id', in: 'path' },
        { name: 'virtualEventPresenter-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'virtualEvent-id': this.virtualEventId,
      }
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints['GET /solutions/virtualEvents/events/{virtualEvent-id}/presenters/{virtualEventPresenter-id}']['response']
      );
  }

  /**
   * `PATCH /solutions/virtualEvents/events/{virtualEvent-id}/presenters/{virtualEventPresenter-id}`
   *
   */
  async update(
    body: Endpoints['PATCH /solutions/virtualEvents/events/{virtualEvent-id}/presenters/{virtualEventPresenter-id}']['body'],
    params?: Endpoints['PATCH /solutions/virtualEvents/events/{virtualEvent-id}/presenters/{virtualEventPresenter-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/solutions/virtualEvents/events/{virtualEvent-id}/presenters/{virtualEventPresenter-id}',
      [
        { name: 'virtualEvent-id', in: 'path' },
        { name: 'virtualEventPresenter-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'virtualEvent-id': this.virtualEventId,
      }
    );

    return this.http
      .patch(url, body)
      .then(
        (res) =>
          res.data as Endpoints['PATCH /solutions/virtualEvents/events/{virtualEvent-id}/presenters/{virtualEventPresenter-id}']['response']
      );
  }

  /**
   * `POST /solutions/virtualEvents/events/{virtualEvent-id}/presenters`
   *
   */
  async create(
    body: Endpoints['POST /solutions/virtualEvents/events/{virtualEvent-id}/presenters']['body'],
    params?: Endpoints['POST /solutions/virtualEvents/events/{virtualEvent-id}/presenters']['parameters']
  ) {
    const url = getInjectedUrl(
      '/solutions/virtualEvents/events/{virtualEvent-id}/presenters',
      [{ name: 'virtualEvent-id', in: 'path' }],
      {
        ...(params || {}),
        'virtualEvent-id': this.virtualEventId,
      }
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints['POST /solutions/virtualEvents/events/{virtualEvent-id}/presenters']['response']
      );
  }
}
