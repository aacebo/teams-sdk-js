import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./activate-types.d.ts";

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
 * /solutions/backupRestore/restoreSessions/{restoreSessionBase-id}/activate
 * Provides operations to call the activate method.
 */
export class ActivateClient {
  protected baseUrl =
    "/solutions/backupRestore/restoreSessions/{restoreSessionBase-id}/activate";
  protected http: AxiosInstance;

  constructor(
    protected readonly restoreSessionBaseId: string,
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
   * `POST /solutions/backupRestore/restoreSessions/{restoreSessionBase-id}/activate`
   *
   * Activate a draft restoreSessionBase object. The following points apply to restoring a protection unit:
   */
  async create(
    body: Endpoints["POST /solutions/backupRestore/restoreSessions/{restoreSessionBase-id}/activate"]["body"],
    params?: Endpoints["POST /solutions/backupRestore/restoreSessions/{restoreSessionBase-id}/activate"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/solutions/backupRestore/restoreSessions/{restoreSessionBase-id}/activate",
      [{ name: "restoreSessionBase-id", in: "path" }],
      {
        ...(params || {}),
        "restoreSessionBase-id": this.restoreSessionBaseId,
      },
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints["POST /solutions/backupRestore/restoreSessions/{restoreSessionBase-id}/activate"]["response"],
      );
  }
}
