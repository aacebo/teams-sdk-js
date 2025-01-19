export interface File {
  readonly repo_owner: string;
  readonly repo_name: string;
  readonly path: string;
  content?: string;
  embedding?: Array<number>;
  readonly created_at: Date;
  updated_at: Date;
}
