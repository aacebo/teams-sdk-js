import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./index-types.d.ts";
import { AllowedMembersClient } from "./allowedMembers";
import { CountClient } from "./count";
import { TeamClient } from "./team";

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
 * /teams/{team-id}/primaryChannel/sharedWithTeams
 * Provides operations to manage the sharedWithTeams property of the microsoft.graph.channel entity.
 */
export class SharedWithTeamsClient {
  protected baseUrl = "/teams/{team-id}/primaryChannel/sharedWithTeams";
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
   * `/teams/{team-id}/primaryChannel/sharedWithTeams/{sharedWithChannelTeamInfo-id}/allowedMembers`
   *
   * Provides operations to manage the allowedMembers property of the microsoft.graph.sharedWithChannelTeamInfo entity.
   */
  allowedMembers(sharedWithChannelTeamInfoId: string) {
    return new AllowedMembersClient(sharedWithChannelTeamInfoId, this.http);
  }

  /**
   * `/teams/{team-id}/primaryChannel/sharedWithTeams/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `/teams/{team-id}/primaryChannel/sharedWithTeams/{sharedWithChannelTeamInfo-id}/team`
   *
   * Provides operations to manage the team property of the microsoft.graph.teamInfo entity.
   */
  team(sharedWithChannelTeamInfoId: string) {
    return new TeamClient(sharedWithChannelTeamInfoId, this.http);
  }

  /**
   * `DELETE /teams/{team-id}/primaryChannel/sharedWithTeams/{sharedWithChannelTeamInfo-id}`
   *
   */
  async delete(
    body: Endpoints["DELETE /teams/{team-id}/primaryChannel/sharedWithTeams/{sharedWithChannelTeamInfo-id}"]["body"],
    params?: Endpoints["DELETE /teams/{team-id}/primaryChannel/sharedWithTeams/{sharedWithChannelTeamInfo-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/teams/{team-id}/primaryChannel/sharedWithTeams/{sharedWithChannelTeamInfo-id}",
      [
        { name: "If-Match", in: "header" },
        { name: "team-id", in: "path" },
        { name: "sharedWithChannelTeamInfo-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints["DELETE /teams/{team-id}/primaryChannel/sharedWithTeams/{sharedWithChannelTeamInfo-id}"]["response"],
      );
  }

  /**
   * `GET /teams/{team-id}/primaryChannel/sharedWithTeams`
   *
   * A collection of teams with which a channel is shared.
   */
  async list(
    params?: Endpoints["GET /teams/{team-id}/primaryChannel/sharedWithTeams"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/teams/{team-id}/primaryChannel/sharedWithTeams",
      [
        { name: "$orderby", in: "query" },
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "team-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints["GET /teams/{team-id}/primaryChannel/sharedWithTeams"]["response"],
      );
  }

  /**
   * `GET /teams/{team-id}/primaryChannel/sharedWithTeams/{sharedWithChannelTeamInfo-id}`
   *
   * A collection of teams with which a channel is shared.
   */
  async get(
    params?: Endpoints["GET /teams/{team-id}/primaryChannel/sharedWithTeams/{sharedWithChannelTeamInfo-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/teams/{team-id}/primaryChannel/sharedWithTeams/{sharedWithChannelTeamInfo-id}",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "team-id", in: "path" },
        { name: "sharedWithChannelTeamInfo-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints["GET /teams/{team-id}/primaryChannel/sharedWithTeams/{sharedWithChannelTeamInfo-id}"]["response"],
      );
  }

  /**
   * `PATCH /teams/{team-id}/primaryChannel/sharedWithTeams/{sharedWithChannelTeamInfo-id}`
   *
   */
  async update(
    body: Endpoints["PATCH /teams/{team-id}/primaryChannel/sharedWithTeams/{sharedWithChannelTeamInfo-id}"]["body"],
    params?: Endpoints["PATCH /teams/{team-id}/primaryChannel/sharedWithTeams/{sharedWithChannelTeamInfo-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/teams/{team-id}/primaryChannel/sharedWithTeams/{sharedWithChannelTeamInfo-id}",
      [
        { name: "team-id", in: "path" },
        { name: "sharedWithChannelTeamInfo-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .patch(url, body)
      .then(
        (res) =>
          res.data as Endpoints["PATCH /teams/{team-id}/primaryChannel/sharedWithTeams/{sharedWithChannelTeamInfo-id}"]["response"],
      );
  }

  /**
   * `POST /teams/{team-id}/primaryChannel/sharedWithTeams`
   *
   */
  async create(
    body: Endpoints["POST /teams/{team-id}/primaryChannel/sharedWithTeams"]["body"],
    params?: Endpoints["POST /teams/{team-id}/primaryChannel/sharedWithTeams"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/teams/{team-id}/primaryChannel/sharedWithTeams",
      [{ name: "team-id", in: "path" }],
      {
        ...(params || {}),
      },
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints["POST /teams/{team-id}/primaryChannel/sharedWithTeams"]["response"],
      );
  }
}
