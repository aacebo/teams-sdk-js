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
 * /employeeExperience/learningProviders/{learningProvider-id}/learningCourseActivities
 * Provides operations to manage the learningCourseActivities property of the microsoft.graph.learningProvider entity.
 */
export class LearningCourseActivitiesClient {
  protected baseUrl =
    "/employeeExperience/learningProviders/{learningProvider-id}/learningCourseActivities";
  protected http: AxiosInstance;

  constructor(
    protected readonly learningProviderId: string,
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
   * `/employeeExperience/learningProviders/{learningProvider-id}/learningCourseActivities/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `DELETE /employeeExperience/learningProviders/{learningProvider-id}/learningCourseActivities/{learningCourseActivity-id}`
   *
   * Delete a learningCourseActivity object using the course activity ID of either an assignment or a self-initiated activity.
   */
  async delete(
    body: Endpoints["DELETE /employeeExperience/learningProviders/{learningProvider-id}/learningCourseActivities/{learningCourseActivity-id}"]["body"],
    params?: Endpoints["DELETE /employeeExperience/learningProviders/{learningProvider-id}/learningCourseActivities/{learningCourseActivity-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/employeeExperience/learningProviders/{learningProvider-id}/learningCourseActivities/{learningCourseActivity-id}",
      [
        { name: "If-Match", in: "header" },
        { name: "learningProvider-id", in: "path" },
        { name: "learningCourseActivity-id", in: "path" },
      ],
      {
        ...(params || {}),
        "learningProvider-id": this.learningProviderId,
      },
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints["DELETE /employeeExperience/learningProviders/{learningProvider-id}/learningCourseActivities/{learningCourseActivity-id}"]["response"],
      );
  }

  /**
   * `GET /employeeExperience/learningProviders/{learningProvider-id}/learningCourseActivities`
   *
   * Get the specified learningCourseActivity object using either an ID or an externalCourseActivityId of the learning provider, or a courseActivityId of a user.
   */
  async list(
    params?: Endpoints["GET /employeeExperience/learningProviders/{learningProvider-id}/learningCourseActivities"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/employeeExperience/learningProviders/{learningProvider-id}/learningCourseActivities",
      [
        { name: "$orderby", in: "query" },
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "learningProvider-id", in: "path" },
      ],
      {
        ...(params || {}),
        "learningProvider-id": this.learningProviderId,
      },
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints["GET /employeeExperience/learningProviders/{learningProvider-id}/learningCourseActivities"]["response"],
      );
  }

  /**
   * `GET /employeeExperience/learningProviders/{learningProvider-id}/learningCourseActivities/{learningCourseActivity-id}`
   *
   */
  async get(
    params?: Endpoints["GET /employeeExperience/learningProviders/{learningProvider-id}/learningCourseActivities/{learningCourseActivity-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/employeeExperience/learningProviders/{learningProvider-id}/learningCourseActivities/{learningCourseActivity-id}",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "learningProvider-id", in: "path" },
        { name: "learningCourseActivity-id", in: "path" },
      ],
      {
        ...(params || {}),
        "learningProvider-id": this.learningProviderId,
      },
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints["GET /employeeExperience/learningProviders/{learningProvider-id}/learningCourseActivities/{learningCourseActivity-id}"]["response"],
      );
  }

  /**
   * `PATCH /employeeExperience/learningProviders/{learningProvider-id}/learningCourseActivities/{learningCourseActivity-id}`
   *
   * Update the properties of a learningCourseActivity object.
   */
  async update(
    body: Endpoints["PATCH /employeeExperience/learningProviders/{learningProvider-id}/learningCourseActivities/{learningCourseActivity-id}"]["body"],
    params?: Endpoints["PATCH /employeeExperience/learningProviders/{learningProvider-id}/learningCourseActivities/{learningCourseActivity-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/employeeExperience/learningProviders/{learningProvider-id}/learningCourseActivities/{learningCourseActivity-id}",
      [
        { name: "learningProvider-id", in: "path" },
        { name: "learningCourseActivity-id", in: "path" },
      ],
      {
        ...(params || {}),
        "learningProvider-id": this.learningProviderId,
      },
    );

    return this.http
      .patch(url, body)
      .then(
        (res) =>
          res.data as Endpoints["PATCH /employeeExperience/learningProviders/{learningProvider-id}/learningCourseActivities/{learningCourseActivity-id}"]["response"],
      );
  }

  /**
   * `POST /employeeExperience/learningProviders/{learningProvider-id}/learningCourseActivities`
   *
   * Create a new learningCourseActivity object. A learning course activity can be one of two types: 
- Assignment
- Self-initiated Use this method to create either type of activity.
   */
  async create(
    body: Endpoints["POST /employeeExperience/learningProviders/{learningProvider-id}/learningCourseActivities"]["body"],
    params?: Endpoints["POST /employeeExperience/learningProviders/{learningProvider-id}/learningCourseActivities"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/employeeExperience/learningProviders/{learningProvider-id}/learningCourseActivities",
      [{ name: "learningProvider-id", in: "path" }],
      {
        ...(params || {}),
        "learningProvider-id": this.learningProviderId,
      },
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints["POST /employeeExperience/learningProviders/{learningProvider-id}/learningCourseActivities"]["response"],
      );
  }
}
