import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './checkMemberGroups-types.d.ts';

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
 * /appRoleAssignments/{appRoleAssignment-id}/checkMemberGroups
 * Provides operations to call the checkMemberGroups method.
 */
export class CheckMemberGroupsClient {
  protected baseUrl = '/appRoleAssignments/{appRoleAssignment-id}/checkMemberGroups';
  protected http: AxiosInstance;

  constructor(
    protected readonly appRoleAssignmentId: string,
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
   * `POST /appRoleAssignments/{appRoleAssignment-id}/checkMemberGroups`
   *
   * Check for membership in a specified list of group IDs, and return from that list the IDs of groups where a specified object is a member. The specified object can be of one of the following types:
- user
- group
- service principal
- organizational contact
- device
- directory object This function is transitive. You can check up to a maximum of 20 groups per request. This function supports all groups provisioned in Microsoft Entra ID. Because Microsoft 365 groups cannot contain other groups, membership in a Microsoft 365 group is always direct.
   */
  async create(
    body: Endpoints['POST /appRoleAssignments/{appRoleAssignment-id}/checkMemberGroups']['body'],
    params?: Endpoints['POST /appRoleAssignments/{appRoleAssignment-id}/checkMemberGroups']['parameters']
  ) {
    const url = getInjectedUrl(
      '/appRoleAssignments/{appRoleAssignment-id}/checkMemberGroups',
      [{ name: 'appRoleAssignment-id', in: 'path' }],
      {
        ...(params || {}),
        'appRoleAssignment-id': this.appRoleAssignmentId,
      }
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints['POST /appRoleAssignments/{appRoleAssignment-id}/checkMemberGroups']['response']
      );
  }
}
