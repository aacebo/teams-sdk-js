import http from 'http';

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

  constructor(options: HttpResponseOptions) {
    this.code = options.code;
    this.status = options.status;
    this.headers = options.headers;
    this.body = options.body || '';
  }

  json(): Body {
    return JSON.parse(this.body);
  }
}
