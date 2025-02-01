import qs from "qs";
import axios, {
  AxiosInstance,
  CreateAxiosDefaults,
  AxiosRequestConfig,
} from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./setExternalEventInformation-types.d.ts";

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
 * /solutions/virtualEvents/events/{virtualEvent-id}/setExternalEventInformation
 * Provides operations to call the setExternalEventInformation method.
 */
export class SetExternalEventInformationClient {
  protected baseUrl =
    "/solutions/virtualEvents/events/{virtualEvent-id}/setExternalEventInformation";
  protected http: AxiosInstance;

  constructor(
    protected readonly virtualEventId: string,
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
   * `POST /solutions/virtualEvents/events/{virtualEvent-id}/setExternalEventInformation`
   *
   */
  async create(
    body: Endpoints["POST /solutions/virtualEvents/events/{virtualEvent-id}/setExternalEventInformation"]["body"],
    params?: Endpoints["POST /solutions/virtualEvents/events/{virtualEvent-id}/setExternalEventInformation"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/solutions/virtualEvents/events/{virtualEvent-id}/setExternalEventInformation",
      [{ name: "virtualEvent-id", in: "path" }],
      {
        ...(params || {}),
        "virtualEvent-id": this.virtualEventId,
      },
    );

    return this.http
      .post(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints["POST /solutions/virtualEvents/events/{virtualEvent-id}/setExternalEventInformation"]["response"],
      );
  }
}
