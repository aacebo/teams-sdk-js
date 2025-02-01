import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./clearPresence-types.d.ts";

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
 * /communications/presences/{presence-id}/clearPresence
 * Provides operations to call the clearPresence method.
 */
export class ClearPresenceClient {
  protected baseUrl = "/communications/presences/{presence-id}/clearPresence";
  protected http: AxiosInstance;

  constructor(
    protected readonly presenceId: string,
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
   * `POST /communications/presences/{presence-id}/clearPresence`
   *
   * Clear the application&#x27;s presence session for a user. If it is the user&#x27;s only presence session, the user&#x27;s presence will change to Offline/Offline. For details about presences sessions, see presence: setPresence.
   */
  async create(
    body: Endpoints["POST /communications/presences/{presence-id}/clearPresence"]["body"],
    params?: Endpoints["POST /communications/presences/{presence-id}/clearPresence"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/communications/presences/{presence-id}/clearPresence",
      [{ name: "presence-id", in: "path" }],
      {
        ...(params || {}),
        "presence-id": this.presenceId,
      },
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints["POST /communications/presences/{presence-id}/clearPresence"]["response"],
      );
  }
}
