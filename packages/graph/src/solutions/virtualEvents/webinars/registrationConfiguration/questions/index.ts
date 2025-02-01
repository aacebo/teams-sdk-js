import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./index-types.d.ts";
import { CountClient } from "./count";

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
 * /solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationConfiguration/questions
 * Provides operations to manage the questions property of the microsoft.graph.virtualEventRegistrationConfiguration entity.
 */
export class QuestionsClient {
  protected baseUrl =
    "/solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationConfiguration/questions";
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
   * `/solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationConfiguration/questions/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `DELETE /solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationConfiguration/questions/{virtualEventRegistrationQuestionBase-id}`
   *
   * Delete a registration question from a webinar. The question can either be a predefined registration question or a custom registration question.
   */
  async delete(
    body: Endpoints["DELETE /solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationConfiguration/questions/{virtualEventRegistrationQuestionBase-id}"]["body"],
    params?: Endpoints["DELETE /solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationConfiguration/questions/{virtualEventRegistrationQuestionBase-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationConfiguration/questions/{virtualEventRegistrationQuestionBase-id}",
      [
        { name: "If-Match", in: "header" },
        { name: "virtualEventWebinar-id", in: "path" },
        { name: "virtualEventRegistrationQuestionBase-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints["DELETE /solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationConfiguration/questions/{virtualEventRegistrationQuestionBase-id}"]["response"],
      );
  }

  /**
   * `GET /solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationConfiguration/questions`
   *
   * Get a list of all registration questions for a webinar. The list can include either predefined registration questions or custom registration questions.
   */
  async list(
    params?: Endpoints["GET /solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationConfiguration/questions"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationConfiguration/questions",
      [
        { name: "$orderby", in: "query" },
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "virtualEventWebinar-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints["GET /solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationConfiguration/questions"]["response"],
      );
  }

  /**
   * `GET /solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationConfiguration/questions/{virtualEventRegistrationQuestionBase-id}`
   *
   * Registration questions.
   */
  async get(
    params?: Endpoints["GET /solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationConfiguration/questions/{virtualEventRegistrationQuestionBase-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationConfiguration/questions/{virtualEventRegistrationQuestionBase-id}",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "virtualEventWebinar-id", in: "path" },
        { name: "virtualEventRegistrationQuestionBase-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints["GET /solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationConfiguration/questions/{virtualEventRegistrationQuestionBase-id}"]["response"],
      );
  }

  /**
   * `PATCH /solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationConfiguration/questions/{virtualEventRegistrationQuestionBase-id}`
   *
   */
  async update(
    body: Endpoints["PATCH /solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationConfiguration/questions/{virtualEventRegistrationQuestionBase-id}"]["body"],
    params?: Endpoints["PATCH /solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationConfiguration/questions/{virtualEventRegistrationQuestionBase-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationConfiguration/questions/{virtualEventRegistrationQuestionBase-id}",
      [
        { name: "virtualEventWebinar-id", in: "path" },
        { name: "virtualEventRegistrationQuestionBase-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .patch(url, body)
      .then(
        (res) =>
          res.data as Endpoints["PATCH /solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationConfiguration/questions/{virtualEventRegistrationQuestionBase-id}"]["response"],
      );
  }

  /**
   * `POST /solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationConfiguration/questions`
   *
   * Create a registration question for a webinar. You can create either a predefined registration question or a custom registration question.
   */
  async create(
    body: Endpoints["POST /solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationConfiguration/questions"]["body"],
    params?: Endpoints["POST /solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationConfiguration/questions"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationConfiguration/questions",
      [{ name: "virtualEventWebinar-id", in: "path" }],
      {
        ...(params || {}),
      },
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints["POST /solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationConfiguration/questions"]["response"],
      );
  }
}
