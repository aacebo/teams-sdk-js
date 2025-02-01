import qs from "qs";
import axios, {
  AxiosInstance,
  CreateAxiosDefaults,
  AxiosRequestConfig,
} from "axios";

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
 * /solutions/bookingBusinesses/{bookingBusiness-id}/customers
 * Provides operations to manage the customers property of the microsoft.graph.bookingBusiness entity.
 */
export class CustomersClient {
  protected baseUrl =
    "/solutions/bookingBusinesses/{bookingBusiness-id}/customers";
  protected http: AxiosInstance;

  constructor(
    protected readonly bookingBusinessId: string,
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
   * `/solutions/bookingBusinesses/{bookingBusiness-id}/customers/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `DELETE /solutions/bookingBusinesses/{bookingBusiness-id}/customers/{bookingCustomerBase-id}`
   *
   * Delete the specified bookingCustomer object.
   */
  async delete(
    params?: Endpoints["DELETE /solutions/bookingBusinesses/{bookingBusiness-id}/customers/{bookingCustomerBase-id}"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/solutions/bookingBusinesses/{bookingBusiness-id}/customers/{bookingCustomerBase-id}",
      [
        { name: "If-Match", in: "header" },
        { name: "bookingBusiness-id", in: "path" },
        { name: "bookingCustomerBase-id", in: "path" },
      ],
      {
        ...(params || {}),
        "bookingBusiness-id": this.bookingBusinessId,
      },
    );

    return this.http
      .delete(url, config)
      .then(
        (res) =>
          res.data as Endpoints["DELETE /solutions/bookingBusinesses/{bookingBusiness-id}/customers/{bookingCustomerBase-id}"]["response"],
      );
  }

  /**
   * `GET /solutions/bookingBusinesses/{bookingBusiness-id}/customers`
   *
   * Get a list of bookingCustomer objects of a business.
   */
  async list(
    params?: Endpoints["GET /solutions/bookingBusinesses/{bookingBusiness-id}/customers"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/solutions/bookingBusinesses/{bookingBusiness-id}/customers",
      [
        { name: "$orderby", in: "query" },
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "bookingBusiness-id", in: "path" },
      ],
      {
        ...(params || {}),
        "bookingBusiness-id": this.bookingBusinessId,
      },
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /solutions/bookingBusinesses/{bookingBusiness-id}/customers"]["response"],
      );
  }

  /**
   * `GET /solutions/bookingBusinesses/{bookingBusiness-id}/customers/{bookingCustomerBase-id}`
   *
   * Get the properties and relationships of a bookingCustomer object.
   */
  async get(
    params?: Endpoints["GET /solutions/bookingBusinesses/{bookingBusiness-id}/customers/{bookingCustomerBase-id}"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/solutions/bookingBusinesses/{bookingBusiness-id}/customers/{bookingCustomerBase-id}",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "bookingBusiness-id", in: "path" },
        { name: "bookingCustomerBase-id", in: "path" },
      ],
      {
        ...(params || {}),
        "bookingBusiness-id": this.bookingBusinessId,
      },
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /solutions/bookingBusinesses/{bookingBusiness-id}/customers/{bookingCustomerBase-id}"]["response"],
      );
  }

  /**
   * `PATCH /solutions/bookingBusinesses/{bookingBusiness-id}/customers/{bookingCustomerBase-id}`
   *
   * Update the properties of a bookingCustomer object.
   */
  async update(
    body: Endpoints["PATCH /solutions/bookingBusinesses/{bookingBusiness-id}/customers/{bookingCustomerBase-id}"]["body"],
    params?: Endpoints["PATCH /solutions/bookingBusinesses/{bookingBusiness-id}/customers/{bookingCustomerBase-id}"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/solutions/bookingBusinesses/{bookingBusiness-id}/customers/{bookingCustomerBase-id}",
      [
        { name: "bookingBusiness-id", in: "path" },
        { name: "bookingCustomerBase-id", in: "path" },
      ],
      {
        ...(params || {}),
        "bookingBusiness-id": this.bookingBusinessId,
      },
    );

    return this.http
      .patch(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints["PATCH /solutions/bookingBusinesses/{bookingBusiness-id}/customers/{bookingCustomerBase-id}"]["response"],
      );
  }

  /**
   * `POST /solutions/bookingBusinesses/{bookingBusiness-id}/customers`
   *
   * Create a new bookingCustomer object.
   */
  async create(
    body: Endpoints["POST /solutions/bookingBusinesses/{bookingBusiness-id}/customers"]["body"],
    params?: Endpoints["POST /solutions/bookingBusinesses/{bookingBusiness-id}/customers"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/solutions/bookingBusinesses/{bookingBusiness-id}/customers",
      [{ name: "bookingBusiness-id", in: "path" }],
      {
        ...(params || {}),
        "bookingBusiness-id": this.bookingBusinessId,
      },
    );

    return this.http
      .post(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints["POST /solutions/bookingBusinesses/{bookingBusiness-id}/customers"]["response"],
      );
  }
}
