import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./index-types.d.ts";
import { CountClient } from "./count";

type GraphClientOptions = CreateAxiosDefaults | AxiosInstance;

interface Param {
  readonly in: string;
  readonly name: string;
}

function getInjectedUrl(
  url: string,
  params: Array<Param>,
  data: Record<string, any>,
) {
  for (const param of params) {
    if (param.in !== "path") continue;
    url = url.replace(`{${param.name}}`, data[param.name]);
  }

  return url;
}

/**
 * /solutions/backupRestore/siteInclusionRules
 * Provides operations to manage the siteInclusionRules property of the microsoft.graph.backupRestoreRoot entity.
 */
export class SiteInclusionRulesClient {
  protected baseUrl = "/solutions/backupRestore/siteInclusionRules";
  protected http: AxiosInstance;

  constructor(options?: GraphClientOptions) {
    if (!options) {
      this.http = axios.create({
        baseURL: "https://graph.microsoft.com/v1.0",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": `teams[graph]/${pkg.version}`,
        },
      });
    } else if ("get" in options) {
      this.http = options;
    } else {
      this.http = axios.create({
        ...options,
        baseURL: "https://graph.microsoft.com/v1.0",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": `teams[graph]/${pkg.version}`,
          ...options.headers,
        },
      });
    }
  }

  /**
   * `/solutions/backupRestore/siteInclusionRules/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `DELETE /solutions/backupRestore/siteInclusionRules/{siteProtectionRule-id}`
   *
   */
  async delete(
    body: Endpoints["DELETE /solutions/backupRestore/siteInclusionRules/{siteProtectionRule-id}"]["body"],
    params?: Endpoints["DELETE /solutions/backupRestore/siteInclusionRules/{siteProtectionRule-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/solutions/backupRestore/siteInclusionRules/{siteProtectionRule-id}",
      [
        { name: "If-Match", in: "header" },
        { name: "siteProtectionRule-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints["DELETE /solutions/backupRestore/siteInclusionRules/{siteProtectionRule-id}"]["response"],
      );
  }

  /**
   * `GET /solutions/backupRestore/siteInclusionRules`
   *
   * The list of site inclusion rules applied to the tenant.
   */
  async list(
    params?: Endpoints["GET /solutions/backupRestore/siteInclusionRules"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/solutions/backupRestore/siteInclusionRules",
      [
        { name: "$orderby", in: "query" },
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints["GET /solutions/backupRestore/siteInclusionRules"]["response"],
      );
  }

  /**
   * `GET /solutions/backupRestore/siteInclusionRules/{siteProtectionRule-id}`
   *
   * The list of site inclusion rules applied to the tenant.
   */
  async get(
    params?: Endpoints["GET /solutions/backupRestore/siteInclusionRules/{siteProtectionRule-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/solutions/backupRestore/siteInclusionRules/{siteProtectionRule-id}",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "siteProtectionRule-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints["GET /solutions/backupRestore/siteInclusionRules/{siteProtectionRule-id}"]["response"],
      );
  }

  /**
   * `PATCH /solutions/backupRestore/siteInclusionRules/{siteProtectionRule-id}`
   *
   */
  async update(
    body: Endpoints["PATCH /solutions/backupRestore/siteInclusionRules/{siteProtectionRule-id}"]["body"],
    params?: Endpoints["PATCH /solutions/backupRestore/siteInclusionRules/{siteProtectionRule-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/solutions/backupRestore/siteInclusionRules/{siteProtectionRule-id}",
      [{ name: "siteProtectionRule-id", in: "path" }],
      {
        ...(params || {}),
      },
    );

    return this.http
      .patch(url, body)
      .then(
        (res) =>
          res.data as Endpoints["PATCH /solutions/backupRestore/siteInclusionRules/{siteProtectionRule-id}"]["response"],
      );
  }

  /**
   * `POST /solutions/backupRestore/siteInclusionRules`
   *
   */
  async create(
    body: Endpoints["POST /solutions/backupRestore/siteInclusionRules"]["body"],
    params?: Endpoints["POST /solutions/backupRestore/siteInclusionRules"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/solutions/backupRestore/siteInclusionRules",
      [],
      {
        ...(params || {}),
      },
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints["POST /solutions/backupRestore/siteInclusionRules"]["response"],
      );
  }
}
