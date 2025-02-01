import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./teamsApp-types.d.ts";

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
 * /teams/{team-id}/primaryChannel/tabs/{teamsTab-id}/teamsApp
 * Provides operations to manage the teamsApp property of the microsoft.graph.teamsTab entity.
 */
export class TeamsAppClient {
  protected baseUrl =
    "/teams/{team-id}/primaryChannel/tabs/{teamsTab-id}/teamsApp";
  protected http: AxiosInstance;

  constructor(
    protected readonly teamsTabId: string,
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
   * `GET /teams/{team-id}/primaryChannel/tabs/{teamsTab-id}/teamsApp`
   *
   * The application that is linked to the tab. This can&#x27;t be changed after tab creation.
   */
  async get(
    params?: Endpoints["GET /teams/{team-id}/primaryChannel/tabs/{teamsTab-id}/teamsApp"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/teams/{team-id}/primaryChannel/tabs/{teamsTab-id}/teamsApp",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "team-id", in: "path" },
        { name: "teamsTab-id", in: "path" },
      ],
      {
        ...(params || {}),
        "teamsTab-id": this.teamsTabId,
      },
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints["GET /teams/{team-id}/primaryChannel/tabs/{teamsTab-id}/teamsApp"]["response"],
      );
  }
}
