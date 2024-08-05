import http from 'http';

import { HttpError } from './error';
import { HttpRequest } from './request';

export interface HttpResponseOptions {
  readonly code?: number;
  readonly status?: string;
  readonly headers: http.IncomingHttpHeaders;
  readonly body?: string;
  readonly req: HttpRequest;
}

export class HttpResponse<Body = any> {
  readonly code?: number;
  readonly status?: string;
  readonly headers: http.IncomingHttpHeaders;
  readonly body: string;
  readonly req: HttpRequest;

  constructor(private readonly _options: HttpResponseOptions) {
    this.code = _options.code;
    this.status = _options.status;
    this.headers = _options.headers;
    this.body = _options.body || '';
    this.req = _options.req;
  }

  json(): Body {
    return JSON.parse(this.body);
  }

  error(): HttpError {
    return new HttpError(this._options);
  }
}
