import http from 'http';

import { Response } from './response';
import * as parsers from './parsers';

const ContentParsers: Record<string, parsers.Parser> = {
  'application/json': parsers.json,
};

interface HttpClientEventPayloads {
  request: http.RequestOptions;
  response: Response;
}

export type HttpClientEventHandler<Event extends keyof HttpClientEventPayloads> = (
  value: HttpClientEventPayloads[Event]
) => HttpClientEventPayloads[Event] | Promise<HttpClientEventPayloads[Event]>;

export type HttpClientEvents = {
  [K in keyof HttpClientEventPayloads]?: HttpClientEventHandler<K>;
};

export interface HttpClient {
  get<T = any>(url: string, options?: http.RequestOptions): Promise<Response<T>>;
  post<T = any>(url: string, data?: any, options?: http.RequestOptions): Promise<Response<T>>;
  patch<T = any>(url: string, data?: any, options?: http.RequestOptions): Promise<Response<T>>;
  delete<T = any>(url: string, data?: any, options?: http.RequestOptions): Promise<Response<T>>;
  request<T = any>(url: string, data?: any, options?: http.RequestOptions): Promise<Response<T>>;
  on<Event extends keyof HttpClientEvents>(event: Event, cb: HttpClientEventHandler<Event>): void;
}

export class DefaultHttpClient implements HttpClient {
  private readonly _events: HttpClientEvents = {};

  constructor(readonly options: http.RequestOptions = {}) {}

  async get<T = any>(url: string, options?: http.RequestOptions) {
    return this.request<T>(url, null, { ...options, method: 'GET' });
  }

  async post<T = any>(url: string, data?: any, options?: http.RequestOptions) {
    return this.request<T>(url, data, { ...options, method: 'POST' });
  }

  async patch<T = any>(url: string, data?: any, options?: http.RequestOptions) {
    return this.request<T>(url, data, { ...options, method: 'PATCH' });
  }

  async delete<T = any>(url: string, data?: any, options?: http.RequestOptions) {
    return this.request<T>(url, data, { ...options, method: 'DELETE' });
  }

  async request<T = any>(url: string, data?: any, options: http.RequestOptions = {}) {
    options = { ...this.options, ...options };
    const contentType = (options.headers || {})['Content-Type']?.toString() || 'application/json';
    const parser = ContentParsers[contentType] || parsers.text;

    return new Promise<Response<T>>(async (resolve, reject) => {
      options = await this._emit('request', options);
      const req = http.request(url, options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', async () => {
          resolve(
            await this._emit('response', {
              code: res.statusCode || 200,
              status: res.statusMessage,
              headers: res.headers,
              data: parser.output(data),
            })
          );
        });
      });

      if (data) {
        req.write(parser.input(data), reject);
      }

      req.on('error', reject);
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
