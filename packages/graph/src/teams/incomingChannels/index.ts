import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./index-types.d.ts";
import { CountClient } from "./count";

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
 * /teams/{team-id}/incomingChannels
 * Provides operations to manage the incomingChannels property of the microsoft.graph.team entity.
 */
export class IncomingChannelsClient {
  protected baseUrl = "/teams/{team-id}/incomingChannels";
  protected http: AxiosInstance;

  constructor(
    protected readonly teamId: string,
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
   * `/teams/{team-id}/incomingChannels/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `GET /teams/{team-id}/incomingChannels`
   *
   * Get the list of incoming channels (channels shared with a team).
   */
  async list(
    params?: Endpoints["GET /teams/{team-id}/incomingChannels"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/teams/{team-id}/incomingChannels",
      [
        { name: "$orderby", in: "query" },
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "team-id", in: "path" },
      ],
      {
        ...(params || {}),
        "team-id": this.teamId,
      },
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints["GET /teams/{team-id}/incomingChannels"]["response"],
      );
  }

  /**
   * `GET /teams/{team-id}/incomingChannels/{channel-id}`
   *
   * List of channels shared with the team.
   */
  async get(
    params?: Endpoints["GET /teams/{team-id}/incomingChannels/{channel-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/teams/{team-id}/incomingChannels/{channel-id}",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "team-id", in: "path" },
        { name: "channel-id", in: "path" },
      ],
      {
        ...(params || {}),
        "team-id": this.teamId,
      },
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints["GET /teams/{team-id}/incomingChannels/{channel-id}"]["response"],
      );
  }
}
