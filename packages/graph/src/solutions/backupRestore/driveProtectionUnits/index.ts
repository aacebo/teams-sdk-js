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
 * /solutions/backupRestore/driveProtectionUnits
 * Provides operations to manage the driveProtectionUnits property of the microsoft.graph.backupRestoreRoot entity.
 */
export class DriveProtectionUnitsClient {
  protected baseUrl = "/solutions/backupRestore/driveProtectionUnits";
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
   * `/solutions/backupRestore/driveProtectionUnits/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `DELETE /solutions/backupRestore/driveProtectionUnits/{driveProtectionUnit-id}`
   *
   */
  async delete(
    body: Endpoints["DELETE /solutions/backupRestore/driveProtectionUnits/{driveProtectionUnit-id}"]["body"],
    params?: Endpoints["DELETE /solutions/backupRestore/driveProtectionUnits/{driveProtectionUnit-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/solutions/backupRestore/driveProtectionUnits/{driveProtectionUnit-id}",
      [
        { name: "If-Match", in: "header" },
        { name: "driveProtectionUnit-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints["DELETE /solutions/backupRestore/driveProtectionUnits/{driveProtectionUnit-id}"]["response"],
      );
  }

  /**
   * `GET /solutions/backupRestore/driveProtectionUnits`
   *
   * The list of drive protection units in the tenant.
   */
  async list(
    params?: Endpoints["GET /solutions/backupRestore/driveProtectionUnits"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/solutions/backupRestore/driveProtectionUnits",
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
          res.data as Endpoints["GET /solutions/backupRestore/driveProtectionUnits"]["response"],
      );
  }

  /**
   * `GET /solutions/backupRestore/driveProtectionUnits/{driveProtectionUnit-id}`
   *
   * The list of drive protection units in the tenant.
   */
  async get(
    params?: Endpoints["GET /solutions/backupRestore/driveProtectionUnits/{driveProtectionUnit-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/solutions/backupRestore/driveProtectionUnits/{driveProtectionUnit-id}",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "driveProtectionUnit-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints["GET /solutions/backupRestore/driveProtectionUnits/{driveProtectionUnit-id}"]["response"],
      );
  }

  /**
   * `PATCH /solutions/backupRestore/driveProtectionUnits/{driveProtectionUnit-id}`
   *
   */
  async update(
    body: Endpoints["PATCH /solutions/backupRestore/driveProtectionUnits/{driveProtectionUnit-id}"]["body"],
    params?: Endpoints["PATCH /solutions/backupRestore/driveProtectionUnits/{driveProtectionUnit-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/solutions/backupRestore/driveProtectionUnits/{driveProtectionUnit-id}",
      [{ name: "driveProtectionUnit-id", in: "path" }],
      {
        ...(params || {}),
      },
    );

    return this.http
      .patch(url, body)
      .then(
        (res) =>
          res.data as Endpoints["PATCH /solutions/backupRestore/driveProtectionUnits/{driveProtectionUnit-id}"]["response"],
      );
  }

  /**
   * `POST /solutions/backupRestore/driveProtectionUnits`
   *
   */
  async create(
    body: Endpoints["POST /solutions/backupRestore/driveProtectionUnits"]["body"],
    params?: Endpoints["POST /solutions/backupRestore/driveProtectionUnits"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/solutions/backupRestore/driveProtectionUnits",
      [],
      {
        ...(params || {}),
      },
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints["POST /solutions/backupRestore/driveProtectionUnits"]["response"],
      );
  }
}
