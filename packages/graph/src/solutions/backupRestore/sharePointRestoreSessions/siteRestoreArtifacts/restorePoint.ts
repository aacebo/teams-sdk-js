import qs from "qs";
import axios, {
  AxiosInstance,
  CreateAxiosDefaults,
  AxiosRequestConfig,
} from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./restorePoint-types.d.ts";

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
 * /solutions/backupRestore/sharePointRestoreSessions/{sharePointRestoreSession-id}/siteRestoreArtifacts/{siteRestoreArtifact-id}/restorePoint
 * Provides operations to manage the restorePoint property of the microsoft.graph.restoreArtifactBase entity.
 */
export class RestorePointClient {
  protected baseUrl =
    "/solutions/backupRestore/sharePointRestoreSessions/{sharePointRestoreSession-id}/siteRestoreArtifacts/{siteRestoreArtifact-id}/restorePoint";
  protected http: AxiosInstance;

  constructor(
    protected readonly siteRestoreArtifactId: string,
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
   * `GET /solutions/backupRestore/sharePointRestoreSessions/{sharePointRestoreSession-id}/siteRestoreArtifacts/{siteRestoreArtifact-id}/restorePoint`
   *
   * Represents the date and time when an artifact is protected by a protectionPolicy and can be restored.
   */
  async get(
    params?: Endpoints["GET /solutions/backupRestore/sharePointRestoreSessions/{sharePointRestoreSession-id}/siteRestoreArtifacts/{siteRestoreArtifact-id}/restorePoint"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/solutions/backupRestore/sharePointRestoreSessions/{sharePointRestoreSession-id}/siteRestoreArtifacts/{siteRestoreArtifact-id}/restorePoint",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "sharePointRestoreSession-id", in: "path" },
        { name: "siteRestoreArtifact-id", in: "path" },
      ],
      {
        ...(params || {}),
        "siteRestoreArtifact-id": this.siteRestoreArtifactId,
      },
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /solutions/backupRestore/sharePointRestoreSessions/{sharePointRestoreSession-id}/siteRestoreArtifacts/{siteRestoreArtifact-id}/restorePoint"]["response"],
      );
  }
}
