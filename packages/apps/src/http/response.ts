import http from 'http';

export interface HttpResponse<D = any> {
  code?: number;
  status?: string;
  headers: http.IncomingHttpHeaders;
  data: D;
}
