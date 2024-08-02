import { Client } from '@teams/api';
import { HttpClient } from '@teams/common';

export interface AppOptions {
  readonly http?: HttpClient;
}

export class App {
  readonly api: Client;

  constructor(readonly options?: AppOptions) {
    this.api = new Client({ http: this.options?.http });
  }
}
