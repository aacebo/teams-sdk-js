import http from 'http';

import { HttpError } from './error';

export interface HttpResponseOptions {
  readonly code?: number;
  readonly status?: string;
  readonly headers: http.IncomingHttpHeaders;
  readonly body?: string;
}

export class HttpResponse<Body = any> {
  readonly code?: number;
  readonly status?: string;
  readonly headers: http.IncomingHttpHeaders;
  readonly body: string;

  constructor(private readonly _options: HttpResponseOptions) {
    this.code = _options.code;
    this.status = _options.status;
    this.headers = _options.headers;
    this.body = _options.body || '';
  }

  json(): Body {
    return JSON.parse(this.body);
  }

  error(): HttpError {
    return new HttpError(this._options);
  }
}
