import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./protectionUnit-types.d.ts";

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
 * /solutions/backupRestore/restorePoints/{restorePoint-id}/protectionUnit
 * Provides operations to manage the protectionUnit property of the microsoft.graph.restorePoint entity.
 */
export class ProtectionUnitClient {
  protected baseUrl =
    "/solutions/backupRestore/restorePoints/{restorePoint-id}/protectionUnit";
  protected http: AxiosInstance;

  constructor(
    protected readonly restorePointId: string,
    options?: GraphClientOptions,
  ) {
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
   * `GET /solutions/backupRestore/restorePoints/{restorePoint-id}/protectionUnit`
   *
   * The site, drive, or mailbox units that are protected under a protection policy.
   */
  async get(
    params?: Endpoints["GET /solutions/backupRestore/restorePoints/{restorePoint-id}/protectionUnit"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/solutions/backupRestore/restorePoints/{restorePoint-id}/protectionUnit",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "restorePoint-id", in: "path" },
      ],
      {
        ...(params || {}),
        "restorePoint-id": this.restorePointId,
      },
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints["GET /solutions/backupRestore/restorePoints/{restorePoint-id}/protectionUnit"]["response"],
      );
  }
}
