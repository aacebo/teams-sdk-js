import qs from "qs";
import axios, {
  AxiosInstance,
  CreateAxiosDefaults,
  AxiosRequestConfig,
} from "axios";

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
 * /chats/{chat-id}/installedApps/{teamsAppInstallation-id}/teamsApp
 * Provides operations to manage the teamsApp property of the microsoft.graph.teamsAppInstallation entity.
 */
export class TeamsAppClient {
  protected baseUrl =
    "/chats/{chat-id}/installedApps/{teamsAppInstallation-id}/teamsApp";
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
   * `GET /chats/{chat-id}/installedApps/{teamsAppInstallation-id}/teamsApp`
   *
   * The app that is installed.
   */
  async get(
    params?: Endpoints["GET /chats/{chat-id}/installedApps/{teamsAppInstallation-id}/teamsApp"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/chats/{chat-id}/installedApps/{teamsAppInstallation-id}/teamsApp",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "chat-id", in: "path" },
        { name: "teamsAppInstallation-id", in: "path" },
      ],
      {
        ...(params || {}),
        "teamsAppInstallation-id": this.teamsAppInstallationId,
      },
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /chats/{chat-id}/installedApps/{teamsAppInstallation-id}/teamsApp"]["response"],
      );
  }
}
