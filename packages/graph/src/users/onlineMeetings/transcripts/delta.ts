import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./delta-types.d.ts";

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
 * /users/{user-id}/onlineMeetings/{onlineMeeting-id}/transcripts/delta
 * Provides operations to call the delta method.
 */
export class DeltaClient {
  protected baseUrl =
    "/users/{user-id}/onlineMeetings/{onlineMeeting-id}/transcripts/delta";
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
   * `GET /users/{user-id}/onlineMeetings/{onlineMeeting-id}/transcripts/delta()`
   *
   */
  async get(
    params?: Endpoints["GET /users/{user-id}/onlineMeetings/{onlineMeeting-id}/transcripts/delta()"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/users/{user-id}/onlineMeetings/{onlineMeeting-id}/transcripts/delta()",
      [
        { name: "$select", in: "query" },
        { name: "$orderby", in: "query" },
        { name: "$expand", in: "query" },
        { name: "user-id", in: "path" },
        { name: "onlineMeeting-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints["GET /users/{user-id}/onlineMeetings/{onlineMeeting-id}/transcripts/delta()"]["response"],
      );
  }
}
