export interface File {
  readonly path: string;
  content?: string;
  embedding?: Array<number>;
  readonly created_at: Date;
  updated_at: Date;
}
