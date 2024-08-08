import http from 'http';

export interface ClientOptions {
  readonly baseUrl?: string;
  readonly requestOptions?: http.RequestOptions;
}
