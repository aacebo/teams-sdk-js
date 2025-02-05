import qs from 'qs';
import * as http from '@teams.sdk/common/http';

import pkg from 'src/../package.json';
import type { Endpoints } from './index-types.d.ts';
import { AppCatalogsClient } from './appCatalogs';
import { AppRoleAssignmentsClient } from './appRoleAssignments';
import { ApplicationTemplatesClient } from './applicationTemplates';
import { ApplicationsClient } from './applications';
import { ApplicationsuniqueNameuniqueNameClient } from './applicationsuniqueNameuniqueName';
import { ChatsClient } from './chats';
import { CommunicationsClient } from './communications';
import { EmployeeExperienceClient } from './employeeExperience';
import { MeClient } from './me';
import { SolutionsClient } from './solutions';
import { TeamsClient } from './teams';
import { TeamsTemplatesClient } from './teamsTemplates';
import { TeamworkClient } from './teamwork';
import { UsersClient } from './users';

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
 * /
 * Provides operations to manage the collection of application entities.
 */
export class Client {
  protected baseUrl = '/';
  protected http: http.Client;

  constructor(options?: http.Client | http.ClientOptions) {
    if (!options) {
      this.http = new http.Client({
        baseUrl: 'https://graph.microsoft.com/v1.0',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': `teams[graph]/${pkg.version}`,
        },
      });
    } else if ('request' in options) {
      this.http = options;
    } else {
      this.http = new http.Client({
        ...options,
        baseUrl: 'https://graph.microsoft.com/v1.0',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': `teams[graph]/${pkg.version}`,
          ...options.headers,
        },
      });
    }
  }

  /**
   * `/appCatalogs`
   *
   * Provides operations to manage the appCatalogs singleton.
   */
  get appCatalogs() {
    return new AppCatalogsClient(this.http);
  }

  /**
   * `/appRoleAssignments`
   *
   * Provides operations to manage the collection of appRoleAssignment entities.
   */
  get appRoleAssignments() {
    return new AppRoleAssignmentsClient(this.http);
  }

  /**
   * `/applicationTemplates`
   *
   * Provides operations to manage the collection of applicationTemplate entities.
   */
  get applicationTemplates() {
    return new ApplicationTemplatesClient(this.http);
  }

  /**
   * `/applications`
   *
   * Provides operations to manage the federatedIdentityCredentials property of the microsoft.graph.application entity.
   */
  get applications() {
    return new ApplicationsClient(this.http);
  }

  /**
   * `/applicationsuniqueNameuniqueName`
   *
   * Provides operations to manage the collection of application entities.
   */
  get applicationsuniqueNameuniqueName() {
    return new ApplicationsuniqueNameuniqueNameClient(this.http);
  }

  /**
   * `/chats`
   *
   * Provides operations to manage the collection of chat entities.
   */
  get chats() {
    return new ChatsClient(this.http);
  }

  /**
   * `/communications`
   *
   * Provides operations to manage the cloudCommunications singleton.
   */
  get communications() {
    return new CommunicationsClient(this.http);
  }

  /**
   * `/employeeExperience`
   *
   */
  get employeeExperience() {
    return new EmployeeExperienceClient(this.http);
  }

  /**
   * `/me`
   *
   * Provides operations to manage the user singleton.
   */
  get me() {
    return new MeClient(this.http);
  }

  /**
   * `/solutions`
   *
   * Provides operations to manage the solutionsRoot singleton.
   */
  get solutions() {
    return new SolutionsClient(this.http);
  }

  /**
   * `/teams`
   *
   * Provides operations to manage the collection of team entities.
   */
  get teams() {
    return new TeamsClient(this.http);
  }

  /**
   * `/teamsTemplates`
   *
   * Provides operations to manage the collection of teamsTemplate entities.
   */
  get teamsTemplates() {
    return new TeamsTemplatesClient(this.http);
  }

  /**
   * `/teamwork`
   *
   * Provides operations to manage the teamwork singleton.
   */
  get teamwork() {
    return new TeamworkClient(this.http);
  }

  /**
   * `/users`
   *
   */
  get users() {
    return new UsersClient(this.http);
  }

  /**
   * `DELETE /applications(appId&#x3D;&#x27;{appId}&#x27;)`
   *
   * Delete an application object. When deleted, apps are moved to a temporary container and can be restored within 30 days. After that time, they are permanently deleted.
   */
  async delete(
    params?: Endpoints['DELETE /applications(appId&#x3D;&#x27;{appId}&#x27;)']['parameters'],
    config?: http.RequestConfig
  ) {
    const url = getInjectedUrl(
      '/applications(appId&#x3D;&#x27;{appId}&#x27;)',
      [
        { name: 'If-Match', in: 'header' },
        { name: 'appId', in: 'path' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .delete(url, config)
      .then(
        (res) =>
          res.data as Endpoints['DELETE /applications(appId&#x3D;&#x27;{appId}&#x27;)']['response']
      );
  }

  /**
   * `GET /applications(appId&#x3D;&#x27;{appId}&#x27;)`
   *
   * Get the properties and relationships of an application object.
   */
  async get(
    params?: Endpoints['GET /applications(appId&#x3D;&#x27;{appId}&#x27;)']['parameters'],
    config?: http.RequestConfig
  ) {
    const url = getInjectedUrl(
      '/applications(appId&#x3D;&#x27;{appId}&#x27;)',
      [
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'appId', in: 'path' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints['GET /applications(appId&#x3D;&#x27;{appId}&#x27;)']['response']
      );
  }

  /**
   * `PATCH /applications(appId&#x3D;&#x27;{appId}&#x27;)`
   *
   * Create a new application object if it doesn&#x27;t exist, or update the properties of an existing application object.
   */
  async update(
    body: Endpoints['PATCH /applications(appId&#x3D;&#x27;{appId}&#x27;)']['body'],
    params?: Endpoints['PATCH /applications(appId&#x3D;&#x27;{appId}&#x27;)']['parameters'],
    config?: http.RequestConfig
  ) {
    const url = getInjectedUrl(
      '/applications(appId&#x3D;&#x27;{appId}&#x27;)',
      [{ name: 'appId', in: 'path' }],
      {
        ...(params || {}),
      }
    );

    return this.http
      .patch(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints['PATCH /applications(appId&#x3D;&#x27;{appId}&#x27;)']['response']
      );
  }
}
