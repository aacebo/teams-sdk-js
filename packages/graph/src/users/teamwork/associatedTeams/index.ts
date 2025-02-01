import qs from "qs";
import axios, {
  AxiosInstance,
  CreateAxiosDefaults,
  AxiosRequestConfig,
} from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./index-types.d.ts";
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
 * /users/{user-id}/teamwork/associatedTeams
 * Provides operations to manage the associatedTeams property of the microsoft.graph.userTeamwork entity.
 */
export class AssociatedTeamsClient {
  protected baseUrl = "/users/{user-id}/teamwork/associatedTeams";
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
   * `/users/{user-id}/teamwork/associatedTeams/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `/users/{user-id}/teamwork/associatedTeams/{associatedTeamInfo-id}/team`
   *
   * Provides operations to manage the team property of the microsoft.graph.teamInfo entity.
   */
  team(associatedTeamInfoId: string) {
    return new TeamClient(associatedTeamInfoId, this.http);
  }

  /**
   * `DELETE /users/{user-id}/teamwork/associatedTeams/{associatedTeamInfo-id}`
   *
   */
  async delete(
    params?: Endpoints["DELETE /users/{user-id}/teamwork/associatedTeams/{associatedTeamInfo-id}"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/users/{user-id}/teamwork/associatedTeams/{associatedTeamInfo-id}",
      [
        { name: "If-Match", in: "header" },
        { name: "user-id", in: "path" },
        { name: "associatedTeamInfo-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .delete(url, config)
      .then(
        (res) =>
          res.data as Endpoints["DELETE /users/{user-id}/teamwork/associatedTeams/{associatedTeamInfo-id}"]["response"],
      );
  }

  /**
   * `GET /users/{user-id}/teamwork/associatedTeams`
   *
   * The list of associatedTeamInfo objects that a user is associated with.
   */
  async list(
    params?: Endpoints["GET /users/{user-id}/teamwork/associatedTeams"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/users/{user-id}/teamwork/associatedTeams",
      [
        { name: "$orderby", in: "query" },
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "user-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /users/{user-id}/teamwork/associatedTeams"]["response"],
      );
  }

  /**
   * `GET /users/{user-id}/teamwork/associatedTeams/{associatedTeamInfo-id}`
   *
   * The list of associatedTeamInfo objects that a user is associated with.
   */
  async get(
    params?: Endpoints["GET /users/{user-id}/teamwork/associatedTeams/{associatedTeamInfo-id}"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/users/{user-id}/teamwork/associatedTeams/{associatedTeamInfo-id}",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "user-id", in: "path" },
        { name: "associatedTeamInfo-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /users/{user-id}/teamwork/associatedTeams/{associatedTeamInfo-id}"]["response"],
      );
  }

  /**
   * `PATCH /users/{user-id}/teamwork/associatedTeams/{associatedTeamInfo-id}`
   *
   */
  async update(
    body: Endpoints["PATCH /users/{user-id}/teamwork/associatedTeams/{associatedTeamInfo-id}"]["body"],
    params?: Endpoints["PATCH /users/{user-id}/teamwork/associatedTeams/{associatedTeamInfo-id}"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/users/{user-id}/teamwork/associatedTeams/{associatedTeamInfo-id}",
      [
        { name: "user-id", in: "path" },
        { name: "associatedTeamInfo-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .patch(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints["PATCH /users/{user-id}/teamwork/associatedTeams/{associatedTeamInfo-id}"]["response"],
      );
  }

  /**
   * `POST /users/{user-id}/teamwork/associatedTeams`
   *
   */
  async create(
    body: Endpoints["POST /users/{user-id}/teamwork/associatedTeams"]["body"],
    params?: Endpoints["POST /users/{user-id}/teamwork/associatedTeams"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/users/{user-id}/teamwork/associatedTeams",
      [{ name: "user-id", in: "path" }],
      {
        ...(params || {}),
      },
    );

    return this.http
      .post(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints["POST /users/{user-id}/teamwork/associatedTeams"]["response"],
      );
  }
}
