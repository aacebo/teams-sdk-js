import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './index-types.d.ts';
import { CheckMemberGroupsClient } from './checkMemberGroups';
import { CheckMemberObjectsClient } from './checkMemberObjects';
import { CountClient } from './count';
import { DeltaClient } from './delta';
import { GetAvailableExtensionPropertiesClient } from './getAvailableExtensionProperties';
import { GetByIdsClient } from './getByIds';
import { GetMemberGroupsClient } from './getMemberGroups';
import { GetMemberObjectsClient } from './getMemberObjects';
import { RestoreClient } from './restore';
import { ValidatePropertiesClient } from './validateProperties';

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
 * /appRoleAssignments
 * Provides operations to manage the collection of appRoleAssignment entities.
 */
export class AppRoleAssignmentsClient {
  protected baseUrl = '/appRoleAssignments';
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
   * `/appRoleAssignments/{appRoleAssignment-id}/checkMemberGroups`
   *
   * Provides operations to call the checkMemberGroups method.
   */
  checkMemberGroups(appRoleAssignmentId: string) {
    return new CheckMemberGroupsClient(appRoleAssignmentId, this.http);
  }

  /**
   * `/appRoleAssignments/{appRoleAssignment-id}/checkMemberObjects`
   *
   * Provides operations to call the checkMemberObjects method.
   */
  checkMemberObjects(appRoleAssignmentId: string) {
    return new CheckMemberObjectsClient(appRoleAssignmentId, this.http);
  }

  /**
   * `/appRoleAssignments/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `/appRoleAssignments/delta`
   *
   * Provides operations to call the delta method.
   */
  get delta() {
    return new DeltaClient(this.http);
  }

  /**
   * `/appRoleAssignments/getAvailableExtensionProperties`
   *
   * Provides operations to call the getAvailableExtensionProperties method.
   */
  get getAvailableExtensionProperties() {
    return new GetAvailableExtensionPropertiesClient(this.http);
  }

  /**
   * `/appRoleAssignments/getByIds`
   *
   * Provides operations to call the getByIds method.
   */
  get getByIds() {
    return new GetByIdsClient(this.http);
  }

  /**
   * `/appRoleAssignments/{appRoleAssignment-id}/getMemberGroups`
   *
   * Provides operations to call the getMemberGroups method.
   */
  getMemberGroups(appRoleAssignmentId: string) {
    return new GetMemberGroupsClient(appRoleAssignmentId, this.http);
  }

  /**
   * `/appRoleAssignments/{appRoleAssignment-id}/getMemberObjects`
   *
   * Provides operations to call the getMemberObjects method.
   */
  getMemberObjects(appRoleAssignmentId: string) {
    return new GetMemberObjectsClient(appRoleAssignmentId, this.http);
  }

  /**
   * `/appRoleAssignments/{appRoleAssignment-id}/restore`
   *
   * Provides operations to call the restore method.
   */
  restore(appRoleAssignmentId: string) {
    return new RestoreClient(appRoleAssignmentId, this.http);
  }

  /**
   * `/appRoleAssignments/validateProperties`
   *
   * Provides operations to call the validateProperties method.
   */
  get validateProperties() {
    return new ValidatePropertiesClient(this.http);
  }

  /**
   * `DELETE /appRoleAssignments/{appRoleAssignment-id}`
   *
   */
  async delete(
    body: Endpoints['DELETE /appRoleAssignments/{appRoleAssignment-id}']['body'],
    params?: Endpoints['DELETE /appRoleAssignments/{appRoleAssignment-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/appRoleAssignments/{appRoleAssignment-id}',
      [
        { name: 'If-Match', in: 'header' },
        { name: 'appRoleAssignment-id', in: 'path' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints['DELETE /appRoleAssignments/{appRoleAssignment-id}']['response']
      );
  }

  /**
   * `GET /appRoleAssignments`
   *
   */
  async list(params?: Endpoints['GET /appRoleAssignments']['parameters']) {
    const url = getInjectedUrl(
      '/appRoleAssignments',
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
      .then((res) => res.data as Endpoints['GET /appRoleAssignments']['response']);
  }

  /**
   * `GET /appRoleAssignments/{appRoleAssignment-id}`
   *
   */
  async get(params?: Endpoints['GET /appRoleAssignments/{appRoleAssignment-id}']['parameters']) {
    const url = getInjectedUrl(
      '/appRoleAssignments/{appRoleAssignment-id}',
      [
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'appRoleAssignment-id', in: 'path' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .get(url)
      .then(
        (res) => res.data as Endpoints['GET /appRoleAssignments/{appRoleAssignment-id}']['response']
      );
  }

  /**
   * `PATCH /appRoleAssignments/{appRoleAssignment-id}`
   *
   */
  async update(
    body: Endpoints['PATCH /appRoleAssignments/{appRoleAssignment-id}']['body'],
    params?: Endpoints['PATCH /appRoleAssignments/{appRoleAssignment-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/appRoleAssignments/{appRoleAssignment-id}',
      [{ name: 'appRoleAssignment-id', in: 'path' }],
      {
        ...(params || {}),
      }
    );

    return this.http
      .patch(url, body)
      .then(
        (res) =>
          res.data as Endpoints['PATCH /appRoleAssignments/{appRoleAssignment-id}']['response']
      );
  }

  /**
   * `POST /appRoleAssignments`
   *
   */
  async create(
    body: Endpoints['POST /appRoleAssignments']['body'],
    params?: Endpoints['POST /appRoleAssignments']['parameters']
  ) {
    const url = getInjectedUrl('/appRoleAssignments', [], {
      ...(params || {}),
    });

    return this.http
      .post(url, body)
      .then((res) => res.data as Endpoints['POST /appRoleAssignments']['response']);
  }
}
