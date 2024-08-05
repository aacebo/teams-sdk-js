import http from 'http';

import { HttpResponseOptions } from './response';

export interface HttpErrorOptions extends HttpResponseOptions {}

export class HttpError extends Error {
  readonly code?: number;
  readonly status?: string;
  readonly headers: http.IncomingHttpHeaders;
  readonly body: string;

  constructor(options: HttpResponseOptions) {
    super(options.body || options.status);
    this.code = options.code;
    this.status = options.status;
    this.headers = options.headers;
    this.body = options.body || '';
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
      body,
    };
  }
}
