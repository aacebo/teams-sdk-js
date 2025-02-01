import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './discover-types.d.ts';

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
 * /applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/schema/directories/{directoryDefinition-id}/discover
 * Provides operations to call the discover method.
 */
export class DiscoverClient {
  protected baseUrl =
    '/applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/schema/directories/{directoryDefinition-id}/discover';
  protected http: AxiosInstance;

  constructor(
    protected readonly directoryDefinitionId: string,
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
   * `POST /applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/schema/directories/{directoryDefinition-id}/discover`
   *
   * Discover the latest schema definition for provisioning to an application.
   */
  async create(
    body: Endpoints['POST /applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/schema/directories/{directoryDefinition-id}/discover']['body'],
    params?: Endpoints['POST /applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/schema/directories/{directoryDefinition-id}/discover']['parameters']
  ) {
    const url = getInjectedUrl(
      '/applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/schema/directories/{directoryDefinition-id}/discover',
      [
        { name: 'application-id', in: 'path' },
        { name: 'synchronizationJob-id', in: 'path' },
        { name: 'directoryDefinition-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'directoryDefinition-id': this.directoryDefinitionId,
      }
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints['POST /applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/schema/directories/{directoryDefinition-id}/discover']['response']
      );
  }
}
