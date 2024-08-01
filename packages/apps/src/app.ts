import { HttpClient } from '@teams/schema';

export interface AppOptions {
  readonly http?: HttpClient;
}

export class App {
  constructor(readonly options?: AppOptions) {}
}
