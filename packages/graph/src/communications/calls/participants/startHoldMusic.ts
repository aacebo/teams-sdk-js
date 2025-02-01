import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./startHoldMusic-types.d.ts";

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
 * /communications/calls/{call-id}/participants/{participant-id}/startHoldMusic
 * Provides operations to call the startHoldMusic method.
 */
export class StartHoldMusicClient {
  protected baseUrl =
    "/communications/calls/{call-id}/participants/{participant-id}/startHoldMusic";
  protected http: AxiosInstance;

  constructor(
    protected readonly participantId: string,
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
   * `POST /communications/calls/{call-id}/participants/{participant-id}/startHoldMusic`
   *
   * Put a participant on hold and play music in the background.
   */
  async create(
    body: Endpoints["POST /communications/calls/{call-id}/participants/{participant-id}/startHoldMusic"]["body"],
    params?: Endpoints["POST /communications/calls/{call-id}/participants/{participant-id}/startHoldMusic"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/communications/calls/{call-id}/participants/{participant-id}/startHoldMusic",
      [
        { name: "call-id", in: "path" },
        { name: "participant-id", in: "path" },
      ],
      {
        ...(params || {}),
        "participant-id": this.participantId,
      },
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints["POST /communications/calls/{call-id}/participants/{participant-id}/startHoldMusic"]["response"],
      );
  }
}
