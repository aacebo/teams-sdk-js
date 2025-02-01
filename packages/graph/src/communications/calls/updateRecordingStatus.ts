import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./updateRecordingStatus-types.d.ts";

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
 * /communications/calls/{call-id}/updateRecordingStatus
 * Provides operations to call the updateRecordingStatus method.
 */
export class UpdateRecordingStatusClient {
  protected baseUrl = "/communications/calls/{call-id}/updateRecordingStatus";
  protected http: AxiosInstance;

  constructor(
    protected readonly callId: string,
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
   * `POST /communications/calls/{call-id}/updateRecordingStatus`
   *
   * Update the application&#x27;s recording status associated with a call. This requires the use of the Teams policy-based recording solution.
   */
  async create(
    body: Endpoints["POST /communications/calls/{call-id}/updateRecordingStatus"]["body"],
    params?: Endpoints["POST /communications/calls/{call-id}/updateRecordingStatus"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/communications/calls/{call-id}/updateRecordingStatus",
      [{ name: "call-id", in: "path" }],
      {
        ...(params || {}),
        "call-id": this.callId,
      },
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints["POST /communications/calls/{call-id}/updateRecordingStatus"]["response"],
      );
  }
}
