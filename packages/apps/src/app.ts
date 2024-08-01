import { HttpClient } from '@teams/common';

export interface AppOptions {
  readonly http?: HttpClient;
}

export class App {
  constructor(readonly options?: AppOptions) {}
}
