import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./setPresence-types.d.ts";

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
 * /users/{user-id}/presence/setPresence
 * Provides operations to call the setPresence method.
 */
export class SetPresenceClient {
  protected baseUrl = "/users/{user-id}/presence/setPresence";
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
   * `POST /users/{user-id}/presence/setPresence`
   *
   * Set the state of a user&#x27;s presence session as an application.
   */
  async create(
    body: Endpoints["POST /users/{user-id}/presence/setPresence"]["body"],
    params?: Endpoints["POST /users/{user-id}/presence/setPresence"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/users/{user-id}/presence/setPresence",
      [{ name: "user-id", in: "path" }],
      {
        ...(params || {}),
      },
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints["POST /users/{user-id}/presence/setPresence"]["response"],
      );
  }
}
