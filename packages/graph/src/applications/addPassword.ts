import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./addPassword-types.d.ts";

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
 * /applications/{application-id}/addPassword
 * Provides operations to call the addPassword method.
 */
export class AddPasswordClient {
  protected baseUrl = "/applications/{application-id}/addPassword";
  protected http: AxiosInstance;

  constructor(
    protected readonly applicationId: string,
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
   * `POST /applications/{application-id}/addPassword`
   *
   * Adds a strong password or secret to an application. You can also add passwords while creating the application.
   */
  async create(
    body: Endpoints["POST /applications/{application-id}/addPassword"]["body"],
    params?: Endpoints["POST /applications/{application-id}/addPassword"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/applications/{application-id}/addPassword",
      [{ name: "application-id", in: "path" }],
      {
        ...(params || {}),
        "application-id": this.applicationId,
      },
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints["POST /applications/{application-id}/addPassword"]["response"],
      );
  }
}
