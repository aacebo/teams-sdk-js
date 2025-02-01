import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './index-types.d.ts';
import { TeamsAppsClient } from './teamsApps';

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
 * /appCatalogs
 * Provides operations to manage the appCatalogs singleton.
 */
export class AppCatalogsClient {
  protected baseUrl = '/appCatalogs';
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
   * `/appCatalogs/teamsApps`
   *
   * Provides operations to manage the teamsApps property of the microsoft.graph.appCatalogs entity.
   */
  get teamsApps() {
    return new TeamsAppsClient(this.http);
  }

  /**
   * `GET /appCatalogs`
   *
   */
  async list(params?: Endpoints['GET /appCatalogs']['parameters']) {
    const url = getInjectedUrl(
      '/appCatalogs',
      [
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http.get(url).then((res) => res.data as Endpoints['GET /appCatalogs']['response']);
  }

  /**
   * `PATCH /appCatalogs`
   *
   */
  async update(
    body: Endpoints['PATCH /appCatalogs']['body'],
    params?: Endpoints['PATCH /appCatalogs']['parameters']
  ) {
    const url = getInjectedUrl('/appCatalogs', [], {
      ...(params || {}),
    });

    return this.http
      .patch(url, body)
      .then((res) => res.data as Endpoints['PATCH /appCatalogs']['response']);
  }
}
