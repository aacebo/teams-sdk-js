import http from 'http';

export interface HttpRequestOptions<Body = any> {
  readonly method: string;
  readonly url: string;
  readonly headers: http.IncomingHttpHeaders;
  readonly body?: Body;
}

export class HttpRequest<Body = any> {
  readonly method: string;
  readonly url: string;
  readonly headers: http.IncomingHttpHeaders;
  readonly body?: Body;

  constructor(options: HttpRequestOptions<Body>) {
    this.method = options.method;
    this.url = options.url;
    this.headers = options.headers;
    this.body = options.body;
  }
}
