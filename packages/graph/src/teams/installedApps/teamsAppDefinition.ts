import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./teamsAppDefinition-types.d.ts";

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
 * /teams/{team-id}/installedApps/{teamsAppInstallation-id}/teamsAppDefinition
 * Provides operations to manage the teamsAppDefinition property of the microsoft.graph.teamsAppInstallation entity.
 */
export class TeamsAppDefinitionClient {
  protected baseUrl =
    "/teams/{team-id}/installedApps/{teamsAppInstallation-id}/teamsAppDefinition";
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
   * `GET /teams/{team-id}/installedApps/{teamsAppInstallation-id}/teamsAppDefinition`
   *
   * The details of this version of the app.
   */
  async get(
    params?: Endpoints["GET /teams/{team-id}/installedApps/{teamsAppInstallation-id}/teamsAppDefinition"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/teams/{team-id}/installedApps/{teamsAppInstallation-id}/teamsAppDefinition",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "team-id", in: "path" },
        { name: "teamsAppInstallation-id", in: "path" },
      ],
      {
        ...(params || {}),
        "teamsAppInstallation-id": this.teamsAppInstallationId,
      },
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints["GET /teams/{team-id}/installedApps/{teamsAppInstallation-id}/teamsAppDefinition"]["response"],
      );
  }
}
