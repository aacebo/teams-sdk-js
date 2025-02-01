import qs from "qs";
import axios, {
  AxiosInstance,
  CreateAxiosDefaults,
  AxiosRequestConfig,
} from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./index-types.d.ts";
import { CountClient } from "./count";
import { ValueClient } from "./value";

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
 * /chats/{chat-id}/messages/{chatMessage-id}/hostedContents
 * Provides operations to manage the hostedContents property of the microsoft.graph.chatMessage entity.
 */
export class HostedContentsClient {
  protected baseUrl =
    "/chats/{chat-id}/messages/{chatMessage-id}/hostedContents";
  protected http: AxiosInstance;

  constructor(
    protected readonly chatMessageId: string,
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
   * `/chats/{chat-id}/messages/{chatMessage-id}/hostedContents/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `/chats/{chat-id}/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}/value`
   *
   * Provides operations to manage the media for the chat entity.
   */
  value(chatMessageHostedContentId: string) {
    return new ValueClient(chatMessageHostedContentId, this.http);
  }

  /**
   * `DELETE /chats/{chat-id}/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}`
   *
   */
  async delete(
    params?: Endpoints["DELETE /chats/{chat-id}/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/chats/{chat-id}/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}",
      [
        { name: "If-Match", in: "header" },
        { name: "chat-id", in: "path" },
        { name: "chatMessage-id", in: "path" },
        { name: "chatMessageHostedContent-id", in: "path" },
      ],
      {
        ...(params || {}),
        "chatMessage-id": this.chatMessageId,
      },
    );

    return this.http
      .delete(url, config)
      .then(
        (res) =>
          res.data as Endpoints["DELETE /chats/{chat-id}/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}"]["response"],
      );
  }

  /**
   * `GET /chats/{chat-id}/messages/{chatMessage-id}/hostedContents`
   *
   * Retrieve the list of chatMessageHostedContent objects from a message. This API only lists the hosted content objects. To get the content bytes, see get chatmessage hosted content.
   */
  async list(
    params?: Endpoints["GET /chats/{chat-id}/messages/{chatMessage-id}/hostedContents"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/chats/{chat-id}/messages/{chatMessage-id}/hostedContents",
      [
        { name: "$orderby", in: "query" },
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "chat-id", in: "path" },
        { name: "chatMessage-id", in: "path" },
      ],
      {
        ...(params || {}),
        "chatMessage-id": this.chatMessageId,
      },
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /chats/{chat-id}/messages/{chatMessage-id}/hostedContents"]["response"],
      );
  }

  /**
   * `GET /chats/{chat-id}/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}`
   *
   * Retrieve the properties and relationships of chatMessageHostedContent object.
   */
  async get(
    params?: Endpoints["GET /chats/{chat-id}/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/chats/{chat-id}/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "chat-id", in: "path" },
        { name: "chatMessage-id", in: "path" },
        { name: "chatMessageHostedContent-id", in: "path" },
      ],
      {
        ...(params || {}),
        "chatMessage-id": this.chatMessageId,
      },
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /chats/{chat-id}/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}"]["response"],
      );
  }

  /**
   * `PATCH /chats/{chat-id}/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}`
   *
   */
  async update(
    body: Endpoints["PATCH /chats/{chat-id}/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}"]["body"],
    params?: Endpoints["PATCH /chats/{chat-id}/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/chats/{chat-id}/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}",
      [
        { name: "chat-id", in: "path" },
        { name: "chatMessage-id", in: "path" },
        { name: "chatMessageHostedContent-id", in: "path" },
      ],
      {
        ...(params || {}),
        "chatMessage-id": this.chatMessageId,
      },
    );

    return this.http
      .patch(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints["PATCH /chats/{chat-id}/messages/{chatMessage-id}/hostedContents/{chatMessageHostedContent-id}"]["response"],
      );
  }

  /**
   * `POST /chats/{chat-id}/messages/{chatMessage-id}/hostedContents`
   *
   */
  async create(
    body: Endpoints["POST /chats/{chat-id}/messages/{chatMessage-id}/hostedContents"]["body"],
    params?: Endpoints["POST /chats/{chat-id}/messages/{chatMessage-id}/hostedContents"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/chats/{chat-id}/messages/{chatMessage-id}/hostedContents",
      [
        { name: "chat-id", in: "path" },
        { name: "chatMessage-id", in: "path" },
      ],
      {
        ...(params || {}),
        "chatMessage-id": this.chatMessageId,
      },
    );

    return this.http
      .post(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints["POST /chats/{chat-id}/messages/{chatMessage-id}/hostedContents"]["response"],
      );
  }
}
