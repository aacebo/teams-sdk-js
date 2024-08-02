import http from 'http';

import { HttpClient } from '@teams/common';

export interface ClientOptions {
  readonly http?: HttpClient;
  readonly requestOptions?: http.RequestOptions;
}
