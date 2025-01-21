export interface Memory {
  readonly id: string;
  readonly parent_id?: string;
  content: string;
  embedding?: Array<number>;
  readonly created_at: Date;
  updated_at: Date;
}
