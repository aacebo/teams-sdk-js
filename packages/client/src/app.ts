export interface AppOptions {}

export class App {
  readonly options: AppOptions;

  constructor(options?: AppOptions) {
    this.options = options || {};
  }
}
