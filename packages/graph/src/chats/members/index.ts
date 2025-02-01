import qs from "qs";
import axios, {
  AxiosInstance,
  CreateAxiosDefaults,
  AxiosRequestConfig,
} from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./index-types.d.ts";
import { AddClient } from "./add";
import { CountClient } from "./count";
import { RemoveClient } from "./remove";

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
 * /chats/{chat-id}/members
 * Provides operations to manage the members property of the microsoft.graph.chat entity.
 */
export class MembersClient {
  protected baseUrl = "/chats/{chat-id}/members";
  protected http: AxiosInstance;

  constructor(
    protected readonly chatId: string,
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
   * `/chats/{chat-id}/members/add`
   *
   * Provides operations to call the add method.
   */
  get add() {
    return new AddClient(this.http);
  }

  /**
   * `/chats/{chat-id}/members/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `/chats/{chat-id}/members/remove`
   *
   * Provides operations to call the remove method.
   */
  get remove() {
    return new RemoveClient(this.http);
  }

  /**
   * `DELETE /chats/{chat-id}/members/{conversationMember-id}`
   *
   * Remove a conversationMember from a chat.
   */
  async delete(
    params?: Endpoints["DELETE /chats/{chat-id}/members/{conversationMember-id}"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/chats/{chat-id}/members/{conversationMember-id}",
      [
        { name: "If-Match", in: "header" },
        { name: "chat-id", in: "path" },
        { name: "conversationMember-id", in: "path" },
      ],
      {
        ...(params || {}),
        "chat-id": this.chatId,
      },
    );

    return this.http
      .delete(url, config)
      .then(
        (res) =>
          res.data as Endpoints["DELETE /chats/{chat-id}/members/{conversationMember-id}"]["response"],
      );
  }

  /**
   * `GET /chats/{chat-id}/members`
   *
   * List all conversation members in a chat or channel.
   */
  async list(
    params?: Endpoints["GET /chats/{chat-id}/members"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/chats/{chat-id}/members",
      [
        { name: "$orderby", in: "query" },
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "chat-id", in: "path" },
      ],
      {
        ...(params || {}),
        "chat-id": this.chatId,
      },
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /chats/{chat-id}/members"]["response"],
      );
  }

  /**
   * `GET /chats/{chat-id}/members/{conversationMember-id}`
   *
   * Retrieve a conversationMember from a chat or channel.
   */
  async get(
    params?: Endpoints["GET /chats/{chat-id}/members/{conversationMember-id}"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/chats/{chat-id}/members/{conversationMember-id}",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "chat-id", in: "path" },
        { name: "conversationMember-id", in: "path" },
      ],
      {
        ...(params || {}),
        "chat-id": this.chatId,
      },
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /chats/{chat-id}/members/{conversationMember-id}"]["response"],
      );
  }

  /**
   * `PATCH /chats/{chat-id}/members/{conversationMember-id}`
   *
   */
  async update(
    body: Endpoints["PATCH /chats/{chat-id}/members/{conversationMember-id}"]["body"],
    params?: Endpoints["PATCH /chats/{chat-id}/members/{conversationMember-id}"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/chats/{chat-id}/members/{conversationMember-id}",
      [
        { name: "chat-id", in: "path" },
        { name: "conversationMember-id", in: "path" },
      ],
      {
        ...(params || {}),
        "chat-id": this.chatId,
      },
    );

    return this.http
      .patch(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints["PATCH /chats/{chat-id}/members/{conversationMember-id}"]["response"],
      );
  }

  /**
   * `POST /chats/{chat-id}/members`
   *
   * Add a conversationMember to a chat.
   */
  async create(
    body: Endpoints["POST /chats/{chat-id}/members"]["body"],
    params?: Endpoints["POST /chats/{chat-id}/members"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/chats/{chat-id}/members",
      [{ name: "chat-id", in: "path" }],
      {
        ...(params || {}),
        "chat-id": this.chatId,
      },
    );

    return this.http
      .post(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints["POST /chats/{chat-id}/members"]["response"],
      );
  }
}
