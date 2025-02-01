import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./content-types.d.ts";

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
 * /teamwork/deletedTeams/{deletedTeam-id}/channels/{channel-id}/filesFolder/content
 * Provides operations to manage the media for the teamwork entity.
 */
export class ContentClient {
  protected baseUrl =
    "/teamwork/deletedTeams/{deletedTeam-id}/channels/{channel-id}/filesFolder/content";
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
   * `DELETE /teamwork/deletedTeams/{deletedTeam-id}/channels/{channel-id}/filesFolder/content`
   *
   * The content stream, if the item represents a file.
   */
  async delete(
    body: Endpoints["DELETE /teamwork/deletedTeams/{deletedTeam-id}/channels/{channel-id}/filesFolder/content"]["body"],
    params?: Endpoints["DELETE /teamwork/deletedTeams/{deletedTeam-id}/channels/{channel-id}/filesFolder/content"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/teamwork/deletedTeams/{deletedTeam-id}/channels/{channel-id}/filesFolder/content",
      [
        { name: "If-Match", in: "header" },
        { name: "deletedTeam-id", in: "path" },
        { name: "channel-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints["DELETE /teamwork/deletedTeams/{deletedTeam-id}/channels/{channel-id}/filesFolder/content"]["response"],
      );
  }

  /**
   * `GET /teamwork/deletedTeams/{deletedTeam-id}/channels/{channel-id}/filesFolder/content`
   *
   * The content stream, if the item represents a file.
   */
  async get(
    params?: Endpoints["GET /teamwork/deletedTeams/{deletedTeam-id}/channels/{channel-id}/filesFolder/content"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/teamwork/deletedTeams/{deletedTeam-id}/channels/{channel-id}/filesFolder/content",
      [
        { name: "$format", in: "query" },
        { name: "deletedTeam-id", in: "path" },
        { name: "channel-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints["GET /teamwork/deletedTeams/{deletedTeam-id}/channels/{channel-id}/filesFolder/content"]["response"],
      );
  }

  /**
   * `PUT /teamwork/deletedTeams/{deletedTeam-id}/channels/{channel-id}/filesFolder/content`
   *
   * The content stream, if the item represents a file.
   */
  async set(
    body: Endpoints["PUT /teamwork/deletedTeams/{deletedTeam-id}/channels/{channel-id}/filesFolder/content"]["body"],
    params?: Endpoints["PUT /teamwork/deletedTeams/{deletedTeam-id}/channels/{channel-id}/filesFolder/content"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/teamwork/deletedTeams/{deletedTeam-id}/channels/{channel-id}/filesFolder/content",
      [
        { name: "deletedTeam-id", in: "path" },
        { name: "channel-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .put(url, body)
      .then(
        (res) =>
          res.data as Endpoints["PUT /teamwork/deletedTeams/{deletedTeam-id}/channels/{channel-id}/filesFolder/content"]["response"],
      );
  }
}
