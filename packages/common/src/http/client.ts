import http from 'http';
import https from 'https';

import { HttpResponse } from './response';
import { HttpHeaders } from './headers';
import { HttpRequest } from './request';

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

export class HttpClient {
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
    options = {
      ...this.options.requestOptions,
      ...options,
      headers: {
        ...this.headers.entries,
        ...(options.headers || {}),
      },
    };

    options = await this._emit('request', options);

    return await new Promise<HttpResponse<T>>((resolve, reject) => {
      let client: typeof https | typeof http = https;

      if (this.options.baseUrl) {
        url = this.options.baseUrl + url;
      }

      if (url.includes('http://')) {
        client = http;
      }

      const req = client.request(url, options, (res) => {
        let body = '';

        res.on('error', reject);
        res.on('data', (chunk) => {
          body += chunk;
        });

        res.on('end', () => {
          const parsed = new HttpResponse<T>({
            code: res.statusCode || 200,
            status: res.statusMessage,
            headers: res.headers,
            body: body,
            req: new HttpRequest({
              headers: (options.headers || {}) as http.IncomingHttpHeaders,
              method: options.method || 'GET',
              body: data,
              url: url,
            }),
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
