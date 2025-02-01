import qs from "qs";
import axios, {
  AxiosInstance,
  CreateAxiosDefaults,
  AxiosRequestConfig,
} from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./mute-types.d.ts";

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
 * /communications/calls/{call-id}/participants/{participant-id}/mute
 * Provides operations to call the mute method.
 */
export class MuteClient {
  protected baseUrl =
    "/communications/calls/{call-id}/participants/{participant-id}/mute";
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
   * `POST /communications/calls/{call-id}/participants/{participant-id}/mute`
   *
   * Mute a specific participant in the call. This is a server mute, meaning that the server will drop all audio packets for this participant, even if the participant continues to stream audio. For more information about how to handle mute operations, see muteParticipantOperation.
   */
  async create(
    body: Endpoints["POST /communications/calls/{call-id}/participants/{participant-id}/mute"]["body"],
    params?: Endpoints["POST /communications/calls/{call-id}/participants/{participant-id}/mute"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/communications/calls/{call-id}/participants/{participant-id}/mute",
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
      .post(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints["POST /communications/calls/{call-id}/participants/{participant-id}/mute"]["response"],
      );
  }
}
