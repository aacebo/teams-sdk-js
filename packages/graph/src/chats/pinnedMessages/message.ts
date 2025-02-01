import qs from "qs";
import axios, {
  AxiosInstance,
  CreateAxiosDefaults,
  AxiosRequestConfig,
} from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./message-types.d.ts";

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
 * /chats/{chat-id}/pinnedMessages/{pinnedChatMessageInfo-id}/message
 * Provides operations to manage the message property of the microsoft.graph.pinnedChatMessageInfo entity.
 */
export class MessageClient {
  protected baseUrl =
    "/chats/{chat-id}/pinnedMessages/{pinnedChatMessageInfo-id}/message";
  protected http: AxiosInstance;

  constructor(
    protected readonly pinnedChatMessageInfoId: string,
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
   * `GET /chats/{chat-id}/pinnedMessages/{pinnedChatMessageInfo-id}/message`
   *
   * Represents details about the chat message that is pinned.
   */
  async get(
    params?: Endpoints["GET /chats/{chat-id}/pinnedMessages/{pinnedChatMessageInfo-id}/message"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/chats/{chat-id}/pinnedMessages/{pinnedChatMessageInfo-id}/message",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "chat-id", in: "path" },
        { name: "pinnedChatMessageInfo-id", in: "path" },
      ],
      {
        ...(params || {}),
        "pinnedChatMessageInfo-id": this.pinnedChatMessageInfoId,
      },
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /chats/{chat-id}/pinnedMessages/{pinnedChatMessageInfo-id}/message"]["response"],
      );
  }
}
