import http from 'http';

export interface Request<Body = any> {
  method: string;
  url: string;
  headers: http.IncomingHttpHeaders;
  body: Body;
}
