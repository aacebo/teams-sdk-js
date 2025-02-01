import qs from "qs";
import axios, {
  AxiosInstance,
  CreateAxiosDefaults,
  AxiosRequestConfig,
} from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./value-types.d.ts";

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
 * /me/photos/{profilePhoto-id}/value
 * Provides operations to manage the media for the user entity.
 */
export class ValueClient {
  protected baseUrl = "/me/photos/{profilePhoto-id}/value";
  protected http: AxiosInstance;

  constructor(
    protected readonly profilePhotoId: string,
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
   * `DELETE /me/photos/{profilePhoto-id}/$value`
   *
   * The unique identifier for an entity. Read-only.
   */
  async delete(
    params?: Endpoints["DELETE /me/photos/{profilePhoto-id}/$value"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/me/photos/{profilePhoto-id}/$value",
      [
        { name: "If-Match", in: "header" },
        { name: "profilePhoto-id", in: "path" },
      ],
      {
        ...(params || {}),
        "profilePhoto-id": this.profilePhotoId,
      },
    );

    return this.http
      .delete(url, config)
      .then(
        (res) =>
          res.data as Endpoints["DELETE /me/photos/{profilePhoto-id}/$value"]["response"],
      );
  }

  /**
   * `GET /me/photos/{profilePhoto-id}/$value`
   *
   * The unique identifier for an entity. Read-only.
   */
  async get(
    params?: Endpoints["GET /me/photos/{profilePhoto-id}/$value"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/me/photos/{profilePhoto-id}/$value",
      [{ name: "profilePhoto-id", in: "path" }],
      {
        ...(params || {}),
        "profilePhoto-id": this.profilePhotoId,
      },
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /me/photos/{profilePhoto-id}/$value"]["response"],
      );
  }

  /**
   * `PUT /me/photos/{profilePhoto-id}/$value`
   *
   * The unique identifier for an entity. Read-only.
   */
  async set(
    body: Endpoints["PUT /me/photos/{profilePhoto-id}/$value"]["body"],
    params?: Endpoints["PUT /me/photos/{profilePhoto-id}/$value"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/me/photos/{profilePhoto-id}/$value",
      [{ name: "profilePhoto-id", in: "path" }],
      {
        ...(params || {}),
        "profilePhoto-id": this.profilePhotoId,
      },
    );

    return this.http
      .put(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints["PUT /me/photos/{profilePhoto-id}/$value"]["response"],
      );
  }
}
