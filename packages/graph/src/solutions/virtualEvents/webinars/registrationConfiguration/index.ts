import qs from "qs";
import axios, {
  AxiosInstance,
  CreateAxiosDefaults,
  AxiosRequestConfig,
} from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./index-types.d.ts";
import { QuestionsClient } from "./questions";

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
 * /solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationConfiguration
 * Provides operations to manage the registrationConfiguration property of the microsoft.graph.virtualEventWebinar entity.
 */
export class RegistrationConfigurationClient {
  protected baseUrl =
    "/solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationConfiguration";
  protected http: AxiosInstance;

  constructor(
    protected readonly virtualEventWebinarId: string,
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
   * `/solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationConfiguration/questions`
   *
   * Provides operations to manage the questions property of the microsoft.graph.virtualEventRegistrationConfiguration entity.
   */
  get questions() {
    return new QuestionsClient(this.http);
  }

  /**
   * `DELETE /solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationConfiguration`
   *
   */
  async delete(
    params?: Endpoints["DELETE /solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationConfiguration"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationConfiguration",
      [
        { name: "If-Match", in: "header" },
        { name: "virtualEventWebinar-id", in: "path" },
      ],
      {
        ...(params || {}),
        "virtualEventWebinar-id": this.virtualEventWebinarId,
      },
    );

    return this.http
      .delete(url, config)
      .then(
        (res) =>
          res.data as Endpoints["DELETE /solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationConfiguration"]["response"],
      );
  }

  /**
   * `GET /solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationConfiguration`
   *
   * Read the properties and relationships of a virtualEventWebinarRegistrationConfiguration object.
   */
  async get(
    params?: Endpoints["GET /solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationConfiguration"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationConfiguration",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "virtualEventWebinar-id", in: "path" },
      ],
      {
        ...(params || {}),
        "virtualEventWebinar-id": this.virtualEventWebinarId,
      },
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationConfiguration"]["response"],
      );
  }

  /**
   * `PATCH /solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationConfiguration`
   *
   */
  async update(
    body: Endpoints["PATCH /solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationConfiguration"]["body"],
    params?: Endpoints["PATCH /solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationConfiguration"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationConfiguration",
      [{ name: "virtualEventWebinar-id", in: "path" }],
      {
        ...(params || {}),
        "virtualEventWebinar-id": this.virtualEventWebinarId,
      },
    );

    return this.http
      .patch(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints["PATCH /solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationConfiguration"]["response"],
      );
  }
}
