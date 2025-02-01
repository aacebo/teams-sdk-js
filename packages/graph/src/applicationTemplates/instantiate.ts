import qs from "qs";
import axios, {
  AxiosInstance,
  CreateAxiosDefaults,
  AxiosRequestConfig,
} from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./instantiate-types.d.ts";

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
 * /applicationTemplates/{applicationTemplate-id}/instantiate
 * Provides operations to call the instantiate method.
 */
export class InstantiateClient {
  protected baseUrl =
    "/applicationTemplates/{applicationTemplate-id}/instantiate";
  protected http: AxiosInstance;

  constructor(
    protected readonly applicationTemplateId: string,
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
   * `POST /applicationTemplates/{applicationTemplate-id}/instantiate`
   *
   * Add an instance of an application from the Microsoft Entra application gallery into your directory. For non-gallery apps, use an application template with one of the following IDs to configure different single sign-on (SSO) modes like SAML SSO and password-based SSO.
   */
  async create(
    body: Endpoints["POST /applicationTemplates/{applicationTemplate-id}/instantiate"]["body"],
    params?: Endpoints["POST /applicationTemplates/{applicationTemplate-id}/instantiate"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/applicationTemplates/{applicationTemplate-id}/instantiate",
      [{ name: "applicationTemplate-id", in: "path" }],
      {
        ...(params || {}),
        "applicationTemplate-id": this.applicationTemplateId,
      },
    );

    return this.http
      .post(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints["POST /applicationTemplates/{applicationTemplate-id}/instantiate"]["response"],
      );
  }
}
