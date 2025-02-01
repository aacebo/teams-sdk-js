import qs from "qs";
import axios, {
  AxiosInstance,
  CreateAxiosDefaults,
  AxiosRequestConfig,
} from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./index-types.d.ts";
import { EventsClient } from "./events";
import { TownhallsClient } from "./townhalls";
import { WebinarsClient } from "./webinars";

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
 * /solutions/virtualEvents
 * Provides operations to manage the virtualEvents property of the microsoft.graph.solutionsRoot entity.
 */
export class VirtualEventsClient {
  protected baseUrl = "/solutions/virtualEvents";
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
   * `/solutions/virtualEvents/events`
   *
   * Provides operations to manage the events property of the microsoft.graph.virtualEventsRoot entity.
   */
  get events() {
    return new EventsClient(this.http);
  }

  /**
   * `/solutions/virtualEvents/townhalls`
   *
   * Provides operations to call the getByUserRole method.
   */
  get townhalls() {
    return new TownhallsClient(this.http);
  }

  /**
   * `/solutions/virtualEvents/webinars`
   *
   * Provides operations to call the getByUserRole method.
   */
  get webinars() {
    return new WebinarsClient(this.http);
  }

  /**
   * `DELETE /solutions/virtualEvents`
   *
   */
  async delete(
    params?: Endpoints["DELETE /solutions/virtualEvents"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/solutions/virtualEvents",
      [{ name: "If-Match", in: "header" }],
      {
        ...(params || {}),
      },
    );

    return this.http
      .delete(url, config)
      .then(
        (res) =>
          res.data as Endpoints["DELETE /solutions/virtualEvents"]["response"],
      );
  }

  /**
   * `GET /solutions/virtualEvents`
   *
   */
  async list(
    params?: Endpoints["GET /solutions/virtualEvents"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/solutions/virtualEvents",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /solutions/virtualEvents"]["response"],
      );
  }

  /**
   * `PATCH /solutions/virtualEvents`
   *
   */
  async update(
    body: Endpoints["PATCH /solutions/virtualEvents"]["body"],
    params?: Endpoints["PATCH /solutions/virtualEvents"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl("/solutions/virtualEvents", [], {
      ...(params || {}),
    });

    return this.http
      .patch(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints["PATCH /solutions/virtualEvents"]["response"],
      );
  }
}
