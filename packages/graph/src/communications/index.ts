import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./index-types.d.ts";
import { CallRecordsClient } from "./callRecords";
import { CallsClient } from "./calls";
import { GetPresencesByUserIdClient } from "./getPresencesByUserId";
import { OnlineMeetingsClient } from "./onlineMeetings";
import { PresencesClient } from "./presences";

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
 * /communications
 * Provides operations to manage the cloudCommunications singleton.
 */
export class CommunicationsClient {
  protected baseUrl = "/communications";
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
   * `/communications/callRecords`
   *
   * Provides operations to call the getPstnCalls method.
   */
  get callRecords() {
    return new CallRecordsClient(this.http);
  }

  /**
   * `/communications/calls`
   *
   * Provides operations to manage the calls property of the microsoft.graph.cloudCommunications entity.
   */
  get calls() {
    return new CallsClient(this.http);
  }

  /**
   * `/communications/getPresencesByUserId`
   *
   * Provides operations to call the getPresencesByUserId method.
   */
  get getPresencesByUserId() {
    return new GetPresencesByUserIdClient(this.http);
  }

  /**
   * `/communications/onlineMeetings`
   *
   * Provides operations to manage the onlineMeetings property of the microsoft.graph.cloudCommunications entity.
   */
  get onlineMeetings() {
    return new OnlineMeetingsClient(this.http);
  }

  /**
   * `/communications/presences`
   *
   * Provides operations to manage the presences property of the microsoft.graph.cloudCommunications entity.
   */
  get presences() {
    return new PresencesClient(this.http);
  }

  /**
   * `GET /communications`
   *
   */
  async list(params?: Endpoints["GET /communications"]["parameters"]) {
    const url = getInjectedUrl(
      "/communications",
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
      .then((res) => res.data as Endpoints["GET /communications"]["response"]);
  }

  /**
   * `PATCH /communications`
   *
   */
  async update(
    body: Endpoints["PATCH /communications"]["body"],
    params?: Endpoints["PATCH /communications"]["parameters"],
  ) {
    const url = getInjectedUrl("/communications", [], {
      ...(params || {}),
    });

    return this.http
      .patch(url, body)
      .then(
        (res) => res.data as Endpoints["PATCH /communications"]["response"],
      );
  }
}
