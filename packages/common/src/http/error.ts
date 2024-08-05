import http from 'http';

import { HttpResponseOptions } from './response';
import { HttpRequest } from './request';

export interface HttpErrorOptions extends HttpResponseOptions {}

export class HttpError extends Error {
  readonly code?: number;
  readonly status?: string;
  readonly headers: http.IncomingHttpHeaders;
  readonly body: string;
  readonly req: HttpRequest;

  constructor(options: HttpResponseOptions) {
    super(options.body || options.status);
    this.code = options.code;
    this.status = options.status;
    this.headers = options.headers;
    this.body = options.body || '';
    this.req = options.req;
  }

  json(): Body {
    return JSON.parse(this.body);
  }

  toJSON() {
    let body: any = this.body;

    try {
      body = this.json();
    } catch {}

    return {
      code: this.code,
      status: this.status,
      headers: this.headers,
      req: this.req,
      body,
    };
  }
}
