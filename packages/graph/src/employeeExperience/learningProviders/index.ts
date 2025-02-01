import qs from "qs";
import axios, {
  AxiosInstance,
  CreateAxiosDefaults,
  AxiosRequestConfig,
} from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./index-types.d.ts";
import { CountClient } from "./count";
import { LearningContentsClient } from "./learningContents";
import { LearningCourseActivitiesClient } from "./learningCourseActivities";

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
 * /employeeExperience/learningProviders
 * Provides operations to manage the learningCourseActivities property of the microsoft.graph.learningProvider entity.
 */
export class LearningProvidersClient {
  protected baseUrl = "/employeeExperience/learningProviders";
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
   * `/employeeExperience/learningProviders/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `/employeeExperience/learningProviders/{learningProvider-id}/learningContents`
   *
   * Provides operations to manage the learningContents property of the microsoft.graph.learningProvider entity.
   */
  learningContents(learningProviderId: string) {
    return new LearningContentsClient(learningProviderId, this.http);
  }

  /**
   * `/employeeExperience/learningProviders/{learningProvider-id}/learningCourseActivities`
   *
   * Provides operations to manage the learningCourseActivities property of the microsoft.graph.learningProvider entity.
   */
  learningCourseActivities(learningProviderId: string) {
    return new LearningCourseActivitiesClient(learningProviderId, this.http);
  }

  /**
   * `DELETE /employeeExperience/learningProviders/{learningProvider-id}`
   *
   * Delete a learningProvider resource and remove its registration in Viva Learning for a tenant.
   */
  async delete(
    params?: Endpoints["DELETE /employeeExperience/learningProviders/{learningProvider-id}"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/employeeExperience/learningProviders/{learningProvider-id}",
      [
        { name: "If-Match", in: "header" },
        { name: "learningProvider-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .delete(url, config)
      .then(
        (res) =>
          res.data as Endpoints["DELETE /employeeExperience/learningProviders/{learningProvider-id}"]["response"],
      );
  }

  /**
   * `DELETE /employeeExperience/learningProviders/{learningProvider-id}/learningContents(externalId&#x3D;&#x27;{externalId}&#x27;)`
   *
   * Delete the specified learningContent resource that represents the metadata of the specified provider&#x27;s ingested content.
   */
  async delete$1(
    params?: Endpoints["DELETE /employeeExperience/learningProviders/{learningProvider-id}/learningContents(externalId&#x3D;&#x27;{externalId}&#x27;)"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/employeeExperience/learningProviders/{learningProvider-id}/learningContents(externalId&#x3D;&#x27;{externalId}&#x27;)",
      [
        { name: "If-Match", in: "header" },
        { name: "learningProvider-id", in: "path" },
        { name: "externalId", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .delete(url, config)
      .then(
        (res) =>
          res.data as Endpoints["DELETE /employeeExperience/learningProviders/{learningProvider-id}/learningContents(externalId&#x3D;&#x27;{externalId}&#x27;)"]["response"],
      );
  }

  /**
   * `DELETE /employeeExperience/learningProviders/{learningProvider-id}/learningCourseActivities(externalcourseActivityId&#x3D;&#x27;{externalcourseActivityId}&#x27;)`
   *
   * Delete a learningCourseActivity object using the course activity ID of either an assignment or a self-initiated activity.
   */
  async delete$2(
    params?: Endpoints["DELETE /employeeExperience/learningProviders/{learningProvider-id}/learningCourseActivities(externalcourseActivityId&#x3D;&#x27;{externalcourseActivityId}&#x27;)"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/employeeExperience/learningProviders/{learningProvider-id}/learningCourseActivities(externalcourseActivityId&#x3D;&#x27;{externalcourseActivityId}&#x27;)",
      [
        { name: "If-Match", in: "header" },
        { name: "learningProvider-id", in: "path" },
        { name: "externalcourseActivityId", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .delete(url, config)
      .then(
        (res) =>
          res.data as Endpoints["DELETE /employeeExperience/learningProviders/{learningProvider-id}/learningCourseActivities(externalcourseActivityId&#x3D;&#x27;{externalcourseActivityId}&#x27;)"]["response"],
      );
  }

  /**
   * `GET /employeeExperience/learningProviders`
   *
   * Get a list of the learningProvider resources registered in Viva Learning for a tenant.
   */
  async list(
    params?: Endpoints["GET /employeeExperience/learningProviders"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/employeeExperience/learningProviders",
      [
        { name: "$orderby", in: "query" },
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /employeeExperience/learningProviders"]["response"],
      );
  }

  /**
   * `GET /employeeExperience/learningProviders/{learningProvider-id}`
   *
   * Read the properties and relationships of a learningProvider object.
   */
  async get(
    params?: Endpoints["GET /employeeExperience/learningProviders/{learningProvider-id}"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/employeeExperience/learningProviders/{learningProvider-id}",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "learningProvider-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /employeeExperience/learningProviders/{learningProvider-id}"]["response"],
      );
  }

  /**
   * `GET /employeeExperience/learningProviders/{learningProvider-id}/learningContents(externalId&#x3D;&#x27;{externalId}&#x27;)`
   *
   * Get the specified learningContent resource which represents the metadata of the specified provider&#x27;s ingested content.
   */
  async get$1(
    params?: Endpoints["GET /employeeExperience/learningProviders/{learningProvider-id}/learningContents(externalId&#x3D;&#x27;{externalId}&#x27;)"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/employeeExperience/learningProviders/{learningProvider-id}/learningContents(externalId&#x3D;&#x27;{externalId}&#x27;)",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "learningProvider-id", in: "path" },
        { name: "externalId", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /employeeExperience/learningProviders/{learningProvider-id}/learningContents(externalId&#x3D;&#x27;{externalId}&#x27;)"]["response"],
      );
  }

  /**
   * `GET /employeeExperience/learningProviders/{learningProvider-id}/learningCourseActivities(externalcourseActivityId&#x3D;&#x27;{externalcourseActivityId}&#x27;)`
   *
   */
  async get$2(
    params?: Endpoints["GET /employeeExperience/learningProviders/{learningProvider-id}/learningCourseActivities(externalcourseActivityId&#x3D;&#x27;{externalcourseActivityId}&#x27;)"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/employeeExperience/learningProviders/{learningProvider-id}/learningCourseActivities(externalcourseActivityId&#x3D;&#x27;{externalcourseActivityId}&#x27;)",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "learningProvider-id", in: "path" },
        { name: "externalcourseActivityId", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /employeeExperience/learningProviders/{learningProvider-id}/learningCourseActivities(externalcourseActivityId&#x3D;&#x27;{externalcourseActivityId}&#x27;)"]["response"],
      );
  }

  /**
   * `PATCH /employeeExperience/learningProviders/{learningProvider-id}`
   *
   * Update the properties of a learningProvider object.
   */
  async update(
    body: Endpoints["PATCH /employeeExperience/learningProviders/{learningProvider-id}"]["body"],
    params?: Endpoints["PATCH /employeeExperience/learningProviders/{learningProvider-id}"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/employeeExperience/learningProviders/{learningProvider-id}",
      [{ name: "learningProvider-id", in: "path" }],
      {
        ...(params || {}),
      },
    );

    return this.http
      .patch(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints["PATCH /employeeExperience/learningProviders/{learningProvider-id}"]["response"],
      );
  }

  /**
   * `PATCH /employeeExperience/learningProviders/{learningProvider-id}/learningContents(externalId&#x3D;&#x27;{externalId}&#x27;)`
   *
   */
  async update$1(
    body: Endpoints["PATCH /employeeExperience/learningProviders/{learningProvider-id}/learningContents(externalId&#x3D;&#x27;{externalId}&#x27;)"]["body"],
    params?: Endpoints["PATCH /employeeExperience/learningProviders/{learningProvider-id}/learningContents(externalId&#x3D;&#x27;{externalId}&#x27;)"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/employeeExperience/learningProviders/{learningProvider-id}/learningContents(externalId&#x3D;&#x27;{externalId}&#x27;)",
      [
        { name: "learningProvider-id", in: "path" },
        { name: "externalId", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .patch(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints["PATCH /employeeExperience/learningProviders/{learningProvider-id}/learningContents(externalId&#x3D;&#x27;{externalId}&#x27;)"]["response"],
      );
  }

  /**
   * `PATCH /employeeExperience/learningProviders/{learningProvider-id}/learningCourseActivities(externalcourseActivityId&#x3D;&#x27;{externalcourseActivityId}&#x27;)`
   *
   * Update the properties of a learningCourseActivity object.
   */
  async update$2(
    body: Endpoints["PATCH /employeeExperience/learningProviders/{learningProvider-id}/learningCourseActivities(externalcourseActivityId&#x3D;&#x27;{externalcourseActivityId}&#x27;)"]["body"],
    params?: Endpoints["PATCH /employeeExperience/learningProviders/{learningProvider-id}/learningCourseActivities(externalcourseActivityId&#x3D;&#x27;{externalcourseActivityId}&#x27;)"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/employeeExperience/learningProviders/{learningProvider-id}/learningCourseActivities(externalcourseActivityId&#x3D;&#x27;{externalcourseActivityId}&#x27;)",
      [
        { name: "learningProvider-id", in: "path" },
        { name: "externalcourseActivityId", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .patch(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints["PATCH /employeeExperience/learningProviders/{learningProvider-id}/learningCourseActivities(externalcourseActivityId&#x3D;&#x27;{externalcourseActivityId}&#x27;)"]["response"],
      );
  }

  /**
   * `POST /employeeExperience/learningProviders`
   *
   * Create a new learningProvider object and register it with Viva Learning using the specified display name and logos for different themes.
   */
  async create(
    body: Endpoints["POST /employeeExperience/learningProviders"]["body"],
    params?: Endpoints["POST /employeeExperience/learningProviders"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl("/employeeExperience/learningProviders", [], {
      ...(params || {}),
    });

    return this.http
      .post(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints["POST /employeeExperience/learningProviders"]["response"],
      );
  }
}
