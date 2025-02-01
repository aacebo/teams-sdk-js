import qs from "qs";
import axios, {
  AxiosInstance,
  CreateAxiosDefaults,
  AxiosRequestConfig,
} from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./start-types.d.ts";

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
 * /applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/start
 * Provides operations to call the start method.
 */
export class StartClient {
  protected baseUrl =
    "/applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/start";
  protected http: AxiosInstance;

  constructor(
    protected readonly synchronizationJobId: string,
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
   * `POST /applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/start`
   *
   * Start an existing synchronization job. If the job is in a paused state, it continues processing changes from the point where it was paused. If the job is in quarantine, the quarantine status is cleared. Don&#x27;t create scripts to call the start job continuously while it&#x27;s running because that can cause the service to stop running. Use the start job only when the job is currently paused or in quarantine.
   */
  async create(
    body: Endpoints["POST /applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/start"]["body"],
    params?: Endpoints["POST /applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/start"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/start",
      [
        { name: "application-id", in: "path" },
        { name: "synchronizationJob-id", in: "path" },
      ],
      {
        ...(params || {}),
        "synchronizationJob-id": this.synchronizationJobId,
      },
    );

    return this.http
      .post(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints["POST /applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/start"]["response"],
      );
  }
}
