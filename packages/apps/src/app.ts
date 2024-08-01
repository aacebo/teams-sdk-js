import { HttpClient } from './http';

export interface AppOptions {
  readonly http?: HttpClient;
}

export class App {
  constructor(readonly options?: AppOptions) {}
}
