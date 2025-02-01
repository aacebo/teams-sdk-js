import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./sendActivityNotification-types.d.ts";

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
 * /users/{user-id}/teamwork/sendActivityNotification
 * Provides operations to call the sendActivityNotification method.
 */
export class SendActivityNotificationClient {
  protected baseUrl = "/users/{user-id}/teamwork/sendActivityNotification";
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
   * `POST /users/{user-id}/teamwork/sendActivityNotification`
   *
   * Send an activity feed notification to a user. For more information, see sending Teams activity notifications.
   */
  async create(
    body: Endpoints["POST /users/{user-id}/teamwork/sendActivityNotification"]["body"],
    params?: Endpoints["POST /users/{user-id}/teamwork/sendActivityNotification"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/users/{user-id}/teamwork/sendActivityNotification",
      [{ name: "user-id", in: "path" }],
      {
        ...(params || {}),
      },
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints["POST /users/{user-id}/teamwork/sendActivityNotification"]["response"],
      );
  }
}
