import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './index-types.d.ts';
import { ActivateClient } from './activate';
import { CountClient } from './count';
import { DeactivateClient } from './deactivate';

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
 * /solutions/backupRestore/protectionPolicies
 * Provides operations to manage the protectionPolicies property of the microsoft.graph.backupRestoreRoot entity.
 */
export class ProtectionPoliciesClient {
  protected baseUrl = '/solutions/backupRestore/protectionPolicies';
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
   * `/solutions/backupRestore/protectionPolicies/{protectionPolicyBase-id}/activate`
   *
   * Provides operations to call the activate method.
   */
  activate(protectionPolicyBaseId: string) {
    return new ActivateClient(protectionPolicyBaseId, this.http);
  }

  /**
   * `/solutions/backupRestore/protectionPolicies/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `/solutions/backupRestore/protectionPolicies/{protectionPolicyBase-id}/deactivate`
   *
   * Provides operations to call the deactivate method.
   */
  deactivate(protectionPolicyBaseId: string) {
    return new DeactivateClient(protectionPolicyBaseId, this.http);
  }

  /**
   * `DELETE /solutions/backupRestore/protectionPolicies/{protectionPolicyBase-id}`
   *
   * Delete a protection policy. Read the properties and relationships of a protectionPolicyBase object.
   */
  async delete(
    body: Endpoints['DELETE /solutions/backupRestore/protectionPolicies/{protectionPolicyBase-id}']['body'],
    params?: Endpoints['DELETE /solutions/backupRestore/protectionPolicies/{protectionPolicyBase-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/solutions/backupRestore/protectionPolicies/{protectionPolicyBase-id}',
      [
        { name: 'If-Match', in: 'header' },
        { name: 'protectionPolicyBase-id', in: 'path' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints['DELETE /solutions/backupRestore/protectionPolicies/{protectionPolicyBase-id}']['response']
      );
  }

  /**
   * `GET /solutions/backupRestore/protectionPolicies`
   *
   * List of protection policies in the tenant.
   */
  async list(params?: Endpoints['GET /solutions/backupRestore/protectionPolicies']['parameters']) {
    const url = getInjectedUrl(
      '/solutions/backupRestore/protectionPolicies',
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
      .then(
        (res) =>
          res.data as Endpoints['GET /solutions/backupRestore/protectionPolicies']['response']
      );
  }

  /**
   * `GET /solutions/backupRestore/protectionPolicies/{protectionPolicyBase-id}`
   *
   * List of protection policies in the tenant.
   */
  async get(
    params?: Endpoints['GET /solutions/backupRestore/protectionPolicies/{protectionPolicyBase-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/solutions/backupRestore/protectionPolicies/{protectionPolicyBase-id}',
      [
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'protectionPolicyBase-id', in: 'path' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints['GET /solutions/backupRestore/protectionPolicies/{protectionPolicyBase-id}']['response']
      );
  }

  /**
   * `PATCH /solutions/backupRestore/protectionPolicies/{protectionPolicyBase-id}`
   *
   */
  async update(
    body: Endpoints['PATCH /solutions/backupRestore/protectionPolicies/{protectionPolicyBase-id}']['body'],
    params?: Endpoints['PATCH /solutions/backupRestore/protectionPolicies/{protectionPolicyBase-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/solutions/backupRestore/protectionPolicies/{protectionPolicyBase-id}',
      [{ name: 'protectionPolicyBase-id', in: 'path' }],
      {
        ...(params || {}),
      }
    );

    return this.http
      .patch(url, body)
      .then(
        (res) =>
          res.data as Endpoints['PATCH /solutions/backupRestore/protectionPolicies/{protectionPolicyBase-id}']['response']
      );
  }

  /**
   * `POST /solutions/backupRestore/protectionPolicies`
   *
   */
  async create(
    body: Endpoints['POST /solutions/backupRestore/protectionPolicies']['body'],
    params?: Endpoints['POST /solutions/backupRestore/protectionPolicies']['parameters']
  ) {
    const url = getInjectedUrl('/solutions/backupRestore/protectionPolicies', [], {
      ...(params || {}),
    });

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints['POST /solutions/backupRestore/protectionPolicies']['response']
      );
  }
}
