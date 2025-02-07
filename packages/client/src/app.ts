import * as http from '@teams.sdk/common/http';

import pkg from '../package.json';

export interface AppOptions {}

export class App {
  readonly options: AppOptions;
  readonly http: http.Client;

  constructor(options?: AppOptions) {
    this.options = options || {};
    this.http = new http.Client({
      headers: {
        'User-Agent': `teams[client]/${pkg.version}`,
      },
    });
  }

  async call<T = any>(name: string, ...args: any[]) {
    const res = await this.http.post<T>(`/api/functions/${name}`, args);
    return res.data;
  }
}
