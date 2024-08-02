import http from 'http';

export interface Response<D = any> {
  code?: number;
  status?: string;
  headers: http.OutgoingHttpHeaders;
  data: D;
}
