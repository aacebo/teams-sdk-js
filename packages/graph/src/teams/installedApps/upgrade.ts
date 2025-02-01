import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./upgrade-types.d.ts";

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
 * /teams/{team-id}/installedApps/{teamsAppInstallation-id}/upgrade
 * Provides operations to call the upgrade method.
 */
export class UpgradeClient {
  protected baseUrl =
    "/teams/{team-id}/installedApps/{teamsAppInstallation-id}/upgrade";
  protected http: AxiosInstance;

  constructor(
    protected readonly teamsAppInstallationId: string,
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
   * `POST /teams/{team-id}/installedApps/{teamsAppInstallation-id}/upgrade`
   *
   * Upgrade an app installation within a chat.
   */
  async create(
    body: Endpoints["POST /teams/{team-id}/installedApps/{teamsAppInstallation-id}/upgrade"]["body"],
    params?: Endpoints["POST /teams/{team-id}/installedApps/{teamsAppInstallation-id}/upgrade"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/teams/{team-id}/installedApps/{teamsAppInstallation-id}/upgrade",
      [
        { name: "team-id", in: "path" },
        { name: "teamsAppInstallation-id", in: "path" },
      ],
      {
        ...(params || {}),
        "teamsAppInstallation-id": this.teamsAppInstallationId,
      },
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints["POST /teams/{team-id}/installedApps/{teamsAppInstallation-id}/upgrade"]["response"],
      );
  }
}
