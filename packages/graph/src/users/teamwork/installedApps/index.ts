import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './index-types.d.ts';
import { ChatClient } from './chat';
import { CountClient } from './count';
import { TeamsAppClient } from './teamsApp';
import { TeamsAppDefinitionClient } from './teamsAppDefinition';

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
 * /users/{user-id}/teamwork/installedApps
 * Provides operations to manage the installedApps property of the microsoft.graph.userTeamwork entity.
 */
export class InstalledAppsClient {
  protected baseUrl = '/users/{user-id}/teamwork/installedApps';
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
   * `/users/{user-id}/teamwork/installedApps/{userScopeTeamsAppInstallation-id}/chat`
   *
   * Provides operations to manage the chat property of the microsoft.graph.userScopeTeamsAppInstallation entity.
   */
  chat(userScopeTeamsAppInstallationId: string) {
    return new ChatClient(userScopeTeamsAppInstallationId, this.http);
  }

  /**
   * `/users/{user-id}/teamwork/installedApps/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `/users/{user-id}/teamwork/installedApps/{userScopeTeamsAppInstallation-id}/teamsApp`
   *
   * Provides operations to manage the teamsApp property of the microsoft.graph.teamsAppInstallation entity.
   */
  teamsApp(userScopeTeamsAppInstallationId: string) {
    return new TeamsAppClient(userScopeTeamsAppInstallationId, this.http);
  }

  /**
   * `/users/{user-id}/teamwork/installedApps/{userScopeTeamsAppInstallation-id}/teamsAppDefinition`
   *
   * Provides operations to manage the teamsAppDefinition property of the microsoft.graph.teamsAppInstallation entity.
   */
  teamsAppDefinition(userScopeTeamsAppInstallationId: string) {
    return new TeamsAppDefinitionClient(userScopeTeamsAppInstallationId, this.http);
  }

  /**
   * `DELETE /users/{user-id}/teamwork/installedApps/{userScopeTeamsAppInstallation-id}`
   *
   * Uninstall an app from the personal scope of the specified user.
   */
  async delete(
    body: Endpoints['DELETE /users/{user-id}/teamwork/installedApps/{userScopeTeamsAppInstallation-id}']['body'],
    params?: Endpoints['DELETE /users/{user-id}/teamwork/installedApps/{userScopeTeamsAppInstallation-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/users/{user-id}/teamwork/installedApps/{userScopeTeamsAppInstallation-id}',
      [
        { name: 'If-Match', in: 'header' },
        { name: 'user-id', in: 'path' },
        { name: 'userScopeTeamsAppInstallation-id', in: 'path' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints['DELETE /users/{user-id}/teamwork/installedApps/{userScopeTeamsAppInstallation-id}']['response']
      );
  }

  /**
   * `GET /users/{user-id}/teamwork/installedApps`
   *
   * Retrieve the list of apps installed in the personal scope of the specified user.
   */
  async list(params?: Endpoints['GET /users/{user-id}/teamwork/installedApps']['parameters']) {
    const url = getInjectedUrl(
      '/users/{user-id}/teamwork/installedApps',
      [
        { name: '$orderby', in: 'query' },
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'user-id', in: 'path' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .get(url)
      .then(
        (res) => res.data as Endpoints['GET /users/{user-id}/teamwork/installedApps']['response']
      );
  }

  /**
   * `GET /users/{user-id}/teamwork/installedApps/{userScopeTeamsAppInstallation-id}`
   *
   * Retrieve the app installed in the personal scope of the specified user.
   */
  async get(
    params?: Endpoints['GET /users/{user-id}/teamwork/installedApps/{userScopeTeamsAppInstallation-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/users/{user-id}/teamwork/installedApps/{userScopeTeamsAppInstallation-id}',
      [
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'user-id', in: 'path' },
        { name: 'userScopeTeamsAppInstallation-id', in: 'path' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints['GET /users/{user-id}/teamwork/installedApps/{userScopeTeamsAppInstallation-id}']['response']
      );
  }

  /**
   * `PATCH /users/{user-id}/teamwork/installedApps/{userScopeTeamsAppInstallation-id}`
   *
   */
  async update(
    body: Endpoints['PATCH /users/{user-id}/teamwork/installedApps/{userScopeTeamsAppInstallation-id}']['body'],
    params?: Endpoints['PATCH /users/{user-id}/teamwork/installedApps/{userScopeTeamsAppInstallation-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/users/{user-id}/teamwork/installedApps/{userScopeTeamsAppInstallation-id}',
      [
        { name: 'user-id', in: 'path' },
        { name: 'userScopeTeamsAppInstallation-id', in: 'path' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .patch(url, body)
      .then(
        (res) =>
          res.data as Endpoints['PATCH /users/{user-id}/teamwork/installedApps/{userScopeTeamsAppInstallation-id}']['response']
      );
  }

  /**
   * `POST /users/{user-id}/teamwork/installedApps`
   *
   * Install an app in the personal scope of the specified user.
   */
  async create(
    body: Endpoints['POST /users/{user-id}/teamwork/installedApps']['body'],
    params?: Endpoints['POST /users/{user-id}/teamwork/installedApps']['parameters']
  ) {
    const url = getInjectedUrl(
      '/users/{user-id}/teamwork/installedApps',
      [{ name: 'user-id', in: 'path' }],
      {
        ...(params || {}),
      }
    );

    return this.http
      .post(url, body)
      .then(
        (res) => res.data as Endpoints['POST /users/{user-id}/teamwork/installedApps']['response']
      );
  }
}
