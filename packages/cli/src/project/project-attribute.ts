export interface ProjectAttribute {
  readonly id: string;
  readonly name: string;
  readonly alias?: string;
  readonly description: string;

  typescript(targetDir: string): void | Promise<void>;
  csharp(targetDir: string): void | Promise<void>;
}
