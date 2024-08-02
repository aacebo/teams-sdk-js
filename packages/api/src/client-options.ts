import http from 'http';

import { HttpClient } from '@teams/common/http';

export interface ClientOptions {
  readonly http?: HttpClient;
  readonly requestOptions?: http.RequestOptions;
}
