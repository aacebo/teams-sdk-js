import qs from "qs";
import axios, {
  AxiosInstance,
  CreateAxiosDefaults,
  AxiosRequestConfig,
} from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./provisionOnDemand-types.d.ts";

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
 * /applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/provisionOnDemand
 * Provides operations to call the provisionOnDemand method.
 */
export class ProvisionOnDemandClient {
  protected baseUrl =
    "/applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/provisionOnDemand";
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
   * `POST /applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/provisionOnDemand`
   *
   * Select a user and provision the account on-demand. The rate limit for this API is 5 requests per 10 seconds.
   */
  async create(
    body: Endpoints["POST /applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/provisionOnDemand"]["body"],
    params?: Endpoints["POST /applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/provisionOnDemand"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/provisionOnDemand",
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
          res.data as Endpoints["POST /applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/provisionOnDemand"]["response"],
      );
  }
}
