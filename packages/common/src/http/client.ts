import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  RawAxiosRequestHeaders,
} from 'axios';

import { ConsoleLogger, Logger } from '../logging';

import { Interceptor } from './interceptor';

export interface ClientOptions {
  /**
   * The client name
   */
  readonly name?: string;

  /**
   * The authorization token to use
   */
  readonly token?: string | ((config: AxiosRequestConfig) => string | Promise<string>);

  /**
   * Logger instance to use
   */
  readonly logger?: Logger;

  /**
   * The baseUrl to prefix all client requests with
   */
  readonly baseUrl?: string;

  /**
   * Default request timeout (ms)
   */
  readonly timeout?: number;

  /**
   * Default headers
   */
  readonly headers?: RawAxiosRequestHeaders;

  /**
   * Default interceptors to register
   */
  readonly interceptors?: Array<Interceptor>;
}

export interface RequestConfig<D = any> extends AxiosRequestConfig<D> {
  /**
   * If provided, this token will be used instead of
   * the default token provided in the `ClientOptions`
   */
  readonly token?: string | ((config: AxiosRequestConfig) => string | Promise<string>);
}

interface InterceptorRegistry {
  readonly requestId?: number;
  readonly responseId?: number;
}

export class Client {
  token?: string | ((config: AxiosRequestConfig) => string | Promise<string>);
  readonly name: string;

  protected options: ClientOptions;
  protected log: Logger;
  protected http: AxiosInstance;
  protected seq: number = 0;
  protected interceptors: Map<number, InterceptorRegistry>;

  constructor(options: ClientOptions = { }) {
    this.options = options;
    this.name = options.name || 'http';
    this.token = options.token;
    this.log = options.logger || new ConsoleLogger(this.name);
    this.interceptors = new Map<number, InterceptorRegistry>();
    this.http = axios.create({
      baseURL: options.baseUrl,
      timeout: options.timeout,
    });

    for (const interceptor of options.interceptors || []) {
      this.use(interceptor);
    }
  }

  async get<T = any, R = axios.AxiosResponse<T>, D = any>(url: string, config?: RequestConfig<D>) {
    return this.http.get<T, R, D>(url, await this.withConfig(config));
  }

  async post<T = any, R = axios.AxiosResponse<T>, D = any>(url: string, data?: D, config?: RequestConfig<D>) {
    return this.http.post<T, R, D>(url, data, await this.withConfig(config));
  }

  async put<T = any, R = axios.AxiosResponse<T>, D = any>(url: string, data?: D, config?: RequestConfig<D>) {
    return this.http.put<T, R, D>(url, data, await this.withConfig(config));
  }

  async patch<T = any, R = axios.AxiosResponse<T>, D = any>(url: string, data?: D, config?: RequestConfig<D>) {
    return this.http.patch<T, R, D>(url, data, await this.withConfig(config));
  }

  async delete<T = any, R = axios.AxiosResponse<T>, D = any>(url: string, config?: RequestConfig<D>) {
    return this.http.delete<T, R, D>(url, await this.withConfig(config));
  }

  async request<T = any, R = axios.AxiosResponse<T>, D = any>(config: RequestConfig<D>) {
    return this.http.request<T, R, D>(await this.withConfig(config));
  }

  /**
   * Register an interceptor to use
   * as middleware for the request/response/error
   */
  use(interceptor: Interceptor) {
    const id = ++this.seq;
    let requestId: number | undefined = undefined;
    let responseId: number | undefined = undefined;

    if (interceptor.request) {
      requestId = this.http.interceptors.request.use((config) => {
        return interceptor.request!({ config, log: this.log });
      }, (error: any) => {
        if (!interceptor.error) return error;
        return interceptor.error({ error, log: this.log });
      });
    }

    if (interceptor.response) {
      responseId = this.http.interceptors.response.use((res) => {
        return interceptor.response!({ res, log: this.log });
      }, (error: any) => {
        if (!interceptor.error) return error;
        return interceptor.error({ error, log: this.log });
      });
    }

    this.interceptors.set(id, {
      requestId,
      responseId,
    });

    return id;
  }

  /**
   * Eject an interceptor
   */
  eject(id: number) {
    const registry = this.interceptors.get(id);

    if (!registry) return;

    if (registry.requestId) {
      this.http.interceptors.request.eject(registry.requestId);
    }

    if (registry.responseId) {
      this.http.interceptors.response.eject(registry.responseId);
    }

    this.interceptors.delete(id);
  }

  /**
   * Clear (Eject) all interceptors
   */
  clear() {
    for (const id of this.interceptors.keys()) {
      this.eject(id);
    }
  }

  protected async withConfig(config: RequestConfig = { }) {
    let token = config.token || this.token;

    if (!config.headers) {
      config.headers = { };
    }

    for (const key in this.options.headers || { }) {
      config.headers[key] = (this.options.headers || { })[key];
    }

    if (token) {
      if (typeof token !== 'string') {
        token = await token(config);
      }

      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  }
}
