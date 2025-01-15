export interface Plugin {
  name: string;
  version: string;

  register(): void | Promise<void>;
}
