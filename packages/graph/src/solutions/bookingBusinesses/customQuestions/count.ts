import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./count-types.d.ts";

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
 * /solutions/bookingBusinesses/{bookingBusiness-id}/customQuestions/count
 * Provides operations to count the resources in the collection.
 */
export class CountClient {
  protected baseUrl =
    "/solutions/bookingBusinesses/{bookingBusiness-id}/customQuestions/count";
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
   * `GET /solutions/bookingBusinesses/{bookingBusiness-id}/customQuestions/$count`
   *
   */
  async get(
    params?: Endpoints["GET /solutions/bookingBusinesses/{bookingBusiness-id}/customQuestions/$count"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/solutions/bookingBusinesses/{bookingBusiness-id}/customQuestions/$count",
      [{ name: "bookingBusiness-id", in: "path" }],
      {
        ...(params || {}),
      },
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints["GET /solutions/bookingBusinesses/{bookingBusiness-id}/customQuestions/$count"]["response"],
      );
  }
}
