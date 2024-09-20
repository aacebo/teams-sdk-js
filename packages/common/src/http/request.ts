import http from 'http';
import { URL } from 'url';

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

export interface Request<Body = any, Query = any> extends http.IncomingMessage {
  uri?: URL;
  query?: Query;
  body?: Body;
}
