import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './index-types.d.ts';
import { CountClient } from './count';
import { InstantiateClient } from './instantiate';

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
 * /applicationTemplates
 * Provides operations to manage the collection of applicationTemplate entities.
 */
export class ApplicationTemplatesClient {
  protected baseUrl = '/applicationTemplates';
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
   * `/applicationTemplates/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `/applicationTemplates/{applicationTemplate-id}/instantiate`
   *
   * Provides operations to call the instantiate method.
   */
  instantiate(applicationTemplateId: string) {
    return new InstantiateClient(applicationTemplateId, this.http);
  }

  /**
   * `GET /applicationTemplates`
   *
   * Retrieve a list of applicationTemplate objects from the Microsoft Entra application gallery.
   */
  async list(params?: Endpoints['GET /applicationTemplates']['parameters']) {
    const url = getInjectedUrl(
      '/applicationTemplates',
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
      .then((res) => res.data as Endpoints['GET /applicationTemplates']['response']);
  }

  /**
   * `GET /applicationTemplates/{applicationTemplate-id}`
   *
   * Retrieve the properties of an applicationTemplate object.
   */
  async get(
    params?: Endpoints['GET /applicationTemplates/{applicationTemplate-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/applicationTemplates/{applicationTemplate-id}',
      [
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'applicationTemplate-id', in: 'path' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints['GET /applicationTemplates/{applicationTemplate-id}']['response']
      );
  }
}
