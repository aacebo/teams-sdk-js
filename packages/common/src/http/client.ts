import http from 'http';
import https from 'https';

import { HttpResponse } from './response';
import { HttpHeaders } from './headers';

interface HttpClientEventPayloads {
  request: http.RequestOptions;
  response: HttpResponse;
}

export type HttpClientEventHandler<Event extends keyof HttpClientEventPayloads> = (
  value: HttpClientEventPayloads[Event]
) => HttpClientEventPayloads[Event] | Promise<HttpClientEventPayloads[Event]>;

export type HttpClientEvents = {
  [K in keyof HttpClientEventPayloads]?: HttpClientEventHandler<K>;
};

export interface HttpClientOptions {
  baseUrl?: string;
  requestOptions?: http.RequestOptions;
}

export interface HttpClient {
  readonly headers: HttpHeaders;
  readonly options: HttpClientOptions;

  get<T = any>(url: string, options?: http.RequestOptions): Promise<HttpResponse<T>>;
  post<T = any>(url: string, data?: any, options?: http.RequestOptions): Promise<HttpResponse<T>>;
  patch<T = any>(url: string, data?: any, options?: http.RequestOptions): Promise<HttpResponse<T>>;
  put<T = any>(url: string, data?: any, options?: http.RequestOptions): Promise<HttpResponse<T>>;
  delete<T = any>(url: string, data?: any, options?: http.RequestOptions): Promise<HttpResponse<T>>;
  request<T = any>(
    url: string,
    data?: any,
    options?: http.RequestOptions
  ): Promise<HttpResponse<T>>;
  on<Event extends keyof HttpClientEvents>(event: Event, cb: HttpClientEventHandler<Event>): void;
}

export class DefaultHttpClient implements HttpClient {
  readonly headers: HttpHeaders;

  private readonly _events: HttpClientEvents = {};

  constructor(readonly options: HttpClientOptions = {}) {
    this.headers = new HttpHeaders(this.options.requestOptions?.headers);
  }

  get<T = any>(url: string, options?: http.RequestOptions) {
    return this.request<T>(url, null, { ...options, method: 'GET' });
  }

  post<T = any>(url: string, data?: any, options?: http.RequestOptions) {
    return this.request<T>(url, data, { ...options, method: 'POST' });
  }

  patch<T = any>(url: string, data?: any, options?: http.RequestOptions) {
    return this.request<T>(url, data, { ...options, method: 'PATCH' });
  }

  put<T = any>(url: string, data?: any, options?: http.RequestOptions) {
    return this.request<T>(url, data, { ...options, method: 'PUT' });
  }

  delete<T = any>(url: string, data?: any, options?: http.RequestOptions) {
    return this.request<T>(url, data, { ...options, method: 'DELETE' });
  }

  async request<T = any>(url: string, data?: any, options: http.RequestOptions = {}) {
    options = { ...this.options.requestOptions, ...options };
    options = await this._emit('request', options);

    return await new Promise<HttpResponse<T>>((resolve, reject) => {
      if (this.options.baseUrl) {
        url = this.options.baseUrl + url;
      }

      const req = https.request(url, options, (res) => {
        let data = '';

        res.on('error', reject);
        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          const parsed = new HttpResponse<T>({
            code: res.statusCode || 200,
            status: res.statusMessage,
            headers: res.headers,
            body: data,
          });

          if ((parsed.code || 200) >= 400) {
            return reject(parsed.error());
          }

          this._emit('response', parsed).then(resolve).catch(reject);
        });
      });

      if (data) {
        if (typeof data !== 'string') {
          data = JSON.stringify(data);
        }

        req.write(data, (err) => {
          if (!err) return;
          reject(err);
        });
      }

      req.on('error', reject);
      req.end();
    });
  }

  on<Event extends keyof HttpClientEvents>(event: Event, cb: HttpClientEventHandler<Event>) {
    this._events[event] = cb as any;
  }

  private async _emit<Event extends keyof HttpClientEvents>(
    event: Event,
    data: HttpClientEventPayloads[Event]
  ) {
    if (!this._events[event]) return data;
    return this._events[event](data);
  }
}
