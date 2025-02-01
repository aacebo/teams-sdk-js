import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./index-types.d.ts";
import { ClearPresenceClient } from "./clearPresence";
import { ClearUserPreferredPresenceClient } from "./clearUserPreferredPresence";
import { SetPresenceClient } from "./setPresence";
import { SetStatusMessageClient } from "./setStatusMessage";
import { SetUserPreferredPresenceClient } from "./setUserPreferredPresence";

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
 * /me/presence
 * Provides operations to manage the presence property of the microsoft.graph.user entity.
 */
export class PresenceClient {
  protected baseUrl = "/me/presence";
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
   * `/me/presence/clearPresence`
   *
   * Provides operations to call the clearPresence method.
   */
  get clearPresence() {
    return new ClearPresenceClient(this.http);
  }

  /**
   * `/me/presence/clearUserPreferredPresence`
   *
   * Provides operations to call the clearUserPreferredPresence method.
   */
  get clearUserPreferredPresence() {
    return new ClearUserPreferredPresenceClient(this.http);
  }

  /**
   * `/me/presence/setPresence`
   *
   * Provides operations to call the setPresence method.
   */
  get setPresence() {
    return new SetPresenceClient(this.http);
  }

  /**
   * `/me/presence/setStatusMessage`
   *
   * Provides operations to call the setStatusMessage method.
   */
  get setStatusMessage() {
    return new SetStatusMessageClient(this.http);
  }

  /**
   * `/me/presence/setUserPreferredPresence`
   *
   * Provides operations to call the setUserPreferredPresence method.
   */
  get setUserPreferredPresence() {
    return new SetUserPreferredPresenceClient(this.http);
  }

  /**
   * `DELETE /me/presence`
   *
   */
  async delete(
    body: Endpoints["DELETE /me/presence"]["body"],
    params?: Endpoints["DELETE /me/presence"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/me/presence",
      [{ name: "If-Match", in: "header" }],
      {
        ...(params || {}),
      },
    );

    return this.http
      .delete(url, body)
      .then((res) => res.data as Endpoints["DELETE /me/presence"]["response"]);
  }

  /**
   * `GET /me/presence`
   *
   * Get a user&#x27;s presence information.
   */
  async get(params?: Endpoints["GET /me/presence"]["parameters"]) {
    const url = getInjectedUrl(
      "/me/presence",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .get(url)
      .then((res) => res.data as Endpoints["GET /me/presence"]["response"]);
  }

  /**
   * `PATCH /me/presence`
   *
   */
  async update(
    body: Endpoints["PATCH /me/presence"]["body"],
    params?: Endpoints["PATCH /me/presence"]["parameters"],
  ) {
    const url = getInjectedUrl("/me/presence", [], {
      ...(params || {}),
    });

    return this.http
      .patch(url, body)
      .then((res) => res.data as Endpoints["PATCH /me/presence"]["response"]);
  }
}
