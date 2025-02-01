import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./setReaction-types.d.ts";

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
 * /chats/{chat-id}/messages/{chatMessage-id}/setReaction
 * Provides operations to call the setReaction method.
 */
export class SetReactionClient {
  protected baseUrl = "/chats/{chat-id}/messages/{chatMessage-id}/setReaction";
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
   * `POST /chats/{chat-id}/messages/{chatMessage-id}/setReaction`
   *
   */
  async create(
    body: Endpoints["POST /chats/{chat-id}/messages/{chatMessage-id}/setReaction"]["body"],
    params?: Endpoints["POST /chats/{chat-id}/messages/{chatMessage-id}/setReaction"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/chats/{chat-id}/messages/{chatMessage-id}/setReaction",
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
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints["POST /chats/{chat-id}/messages/{chatMessage-id}/setReaction"]["response"],
      );
  }
}
