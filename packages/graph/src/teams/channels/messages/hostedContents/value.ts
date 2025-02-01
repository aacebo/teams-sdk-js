import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

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
  for (const param of params) {
    if (param.in !== "path") continue;
    url = url.replace(`{${param.name}}`, data[param.name]);
  }

  return url;
}

/**
 * /teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}/value
 * Provides operations to manage the media for the team entity.
 */
export class ValueClient {
  protected baseUrl =
    "/teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}/value";
  protected http: AxiosInstance;

  constructor(
    protected readonly chatMessageHostedContentId: string,
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
   * `DELETE /teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}/$value`
   *
   * The unique identifier for an entity. Read-only.
   */
  async delete(
    body: Endpoints["DELETE /teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}/$value"]["body"],
    params?: Endpoints["DELETE /teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}/$value"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}/$value",
      [
        { name: "If-Match", in: "header" },
        { name: "team-id", in: "path" },
        { name: "channel-id", in: "path" },
        { name: "chatMessage-id", in: "path" },
        { name: "chatMessageHostedContent-id", in: "path" },
      ],
      {
        ...(params || {}),
        "chatMessageHostedContent-id": this.chatMessageHostedContentId,
      },
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints["DELETE /teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}/$value"]["response"],
      );
  }

  /**
   * `GET /teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}/$value`
   *
   * Retrieve the list of chatMessageHostedContent objects from a message. This API only lists the hosted content objects. To get the content bytes, see get chatmessage hosted content.
   */
  async get(
    params?: Endpoints["GET /teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}/$value"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}/$value",
      [
        { name: "team-id", in: "path" },
        { name: "channel-id", in: "path" },
        { name: "chatMessage-id", in: "path" },
        { name: "chatMessageHostedContent-id", in: "path" },
      ],
      {
        ...(params || {}),
        "chatMessageHostedContent-id": this.chatMessageHostedContentId,
      },
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints["GET /teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}/$value"]["response"],
      );
  }

  /**
   * `PUT /teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}/$value`
   *
   * The unique identifier for an entity. Read-only.
   */
  async set(
    body: Endpoints["PUT /teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}/$value"]["body"],
    params?: Endpoints["PUT /teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}/$value"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}/$value",
      [
        { name: "team-id", in: "path" },
        { name: "channel-id", in: "path" },
        { name: "chatMessage-id", in: "path" },
        { name: "chatMessageHostedContent-id", in: "path" },
      ],
      {
        ...(params || {}),
        "chatMessageHostedContent-id": this.chatMessageHostedContentId,
      },
    );

    return this.http
      .put(url, body)
      .then(
        (res) =>
          res.data as Endpoints["PUT /teams/{team-id}/channels/{channel-id}/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}/$value"]["response"],
      );
  }
}
