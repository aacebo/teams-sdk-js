import qs from "qs";
import axios, {
  AxiosInstance,
  CreateAxiosDefaults,
  AxiosRequestConfig,
} from "axios";

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
  const query: Record<string, any> = {};

  for (const param of params) {
    if (param.in === "query") {
      query[param.name] = data[param.name];
    }

    if (param.in !== "path") {
      continue;
    }

    url = url.replace(`{${param.name}}`, data[param.name]);
  }

  return `${url}${qs.stringify(query, { addQueryPrefix: true })}`;
}

/**
 * /solutions/backupRestore/siteProtectionUnits
 * Provides operations to manage the siteProtectionUnits property of the microsoft.graph.backupRestoreRoot entity.
 */
export class SiteProtectionUnitsClient {
  protected baseUrl = "/solutions/backupRestore/siteProtectionUnits";
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
   * `/solutions/backupRestore/siteProtectionUnits/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `DELETE /solutions/backupRestore/siteProtectionUnits/{siteProtectionUnit-id}`
   *
   */
  async delete(
    params?: Endpoints["DELETE /solutions/backupRestore/siteProtectionUnits/{siteProtectionUnit-id}"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/solutions/backupRestore/siteProtectionUnits/{siteProtectionUnit-id}",
      [
        { name: "If-Match", in: "header" },
        { name: "siteProtectionUnit-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .delete(url, config)
      .then(
        (res) =>
          res.data as Endpoints["DELETE /solutions/backupRestore/siteProtectionUnits/{siteProtectionUnit-id}"]["response"],
      );
  }

  /**
   * `GET /solutions/backupRestore/siteProtectionUnits`
   *
   * The list of site protection units in the tenant.
   */
  async list(
    params?: Endpoints["GET /solutions/backupRestore/siteProtectionUnits"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/solutions/backupRestore/siteProtectionUnits",
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
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /solutions/backupRestore/siteProtectionUnits"]["response"],
      );
  }

  /**
   * `GET /solutions/backupRestore/siteProtectionUnits/{siteProtectionUnit-id}`
   *
   * The list of site protection units in the tenant.
   */
  async get(
    params?: Endpoints["GET /solutions/backupRestore/siteProtectionUnits/{siteProtectionUnit-id}"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/solutions/backupRestore/siteProtectionUnits/{siteProtectionUnit-id}",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "siteProtectionUnit-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /solutions/backupRestore/siteProtectionUnits/{siteProtectionUnit-id}"]["response"],
      );
  }

  /**
   * `PATCH /solutions/backupRestore/siteProtectionUnits/{siteProtectionUnit-id}`
   *
   */
  async update(
    body: Endpoints["PATCH /solutions/backupRestore/siteProtectionUnits/{siteProtectionUnit-id}"]["body"],
    params?: Endpoints["PATCH /solutions/backupRestore/siteProtectionUnits/{siteProtectionUnit-id}"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/solutions/backupRestore/siteProtectionUnits/{siteProtectionUnit-id}",
      [{ name: "siteProtectionUnit-id", in: "path" }],
      {
        ...(params || {}),
      },
    );

    return this.http
      .patch(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints["PATCH /solutions/backupRestore/siteProtectionUnits/{siteProtectionUnit-id}"]["response"],
      );
  }

  /**
   * `POST /solutions/backupRestore/siteProtectionUnits`
   *
   */
  async create(
    body: Endpoints["POST /solutions/backupRestore/siteProtectionUnits"]["body"],
    params?: Endpoints["POST /solutions/backupRestore/siteProtectionUnits"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/solutions/backupRestore/siteProtectionUnits",
      [],
      {
        ...(params || {}),
      },
    );

    return this.http
      .post(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints["POST /solutions/backupRestore/siteProtectionUnits"]["response"],
      );
  }
}
