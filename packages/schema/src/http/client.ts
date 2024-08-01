import http from 'http';

import { HttpResponse } from './response';
import * as parsers from './parsers';

const ContentParsers: Record<string, parsers.Parser> = {
  'application/json': parsers.json,
};

export interface HttpClient {
  get(url: string, options?: http.RequestOptions): Promise<HttpResponse>;

  post(url: string, data?: any, options?: http.RequestOptions): Promise<HttpResponse>;

  patch(url: string, data?: any, options?: http.RequestOptions): Promise<HttpResponse>;

  delete(url: string, data?: any, options?: http.RequestOptions): Promise<HttpResponse>;

  request(url: string, data?: any, options?: http.RequestOptions): Promise<HttpResponse>;
}

export class DefaultHttpClient {
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

  async request<T = any>(url: string, data?: any, options?: http.RequestOptions) {
    const contentType = (options?.headers || {})['Content-Type']?.toString() || 'application/json';
    const parser = ContentParsers[contentType] || parsers.text;

    return new Promise<HttpResponse<T>>((resolve, reject) => {
      const req = http.request(url, options || {}, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          resolve({
            code: res.statusCode,
            status: res.statusMessage,
            headers: res.headers,
            data: parser.output(data),
          });
        });
      });

      if (data) {
        req.write(parser.input(data), reject);
      }

      req.on('error', reject);
    });
  }
}
