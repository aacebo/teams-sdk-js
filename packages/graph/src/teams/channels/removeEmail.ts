import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./removeEmail-types.d.ts";

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
 * /teams/{team-id}/channels/{channel-id}/removeEmail
 * Provides operations to call the removeEmail method.
 */
export class RemoveEmailClient {
  protected baseUrl = "/teams/{team-id}/channels/{channel-id}/removeEmail";
  protected http: AxiosInstance;

  constructor(
    protected readonly channelId: string,
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
   * `POST /teams/{team-id}/channels/{channel-id}/removeEmail`
   *
   * Remove the email address of a channel. You can remove an email address only if it was provisioned using the provisionEmail method or through the Microsoft Teams client.
   */
  async create(
    body: Endpoints["POST /teams/{team-id}/channels/{channel-id}/removeEmail"]["body"],
    params?: Endpoints["POST /teams/{team-id}/channels/{channel-id}/removeEmail"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/teams/{team-id}/channels/{channel-id}/removeEmail",
      [
        { name: "team-id", in: "path" },
        { name: "channel-id", in: "path" },
      ],
      {
        ...(params || {}),
        "channel-id": this.channelId,
      },
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints["POST /teams/{team-id}/channels/{channel-id}/removeEmail"]["response"],
      );
  }
}
