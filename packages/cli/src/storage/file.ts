import { Knex } from 'knex';

import { File } from './models';

export class FileStorage {
  constructor(private readonly _db: Knex) {}

  async migrate() {
    const exists = await this._db.schema.hasTable('files');

    if (!exists) {
      return this._db.schema.createTable('files', (table) => {
        table.text('path').primary();
        table.text('content');
        table.specificType('embedding', 'float[1536]');
        table.timestamp('created_at').notNullable();
        table.timestamp('updated_at').notNullable();
      });
    }
  }

  async get() {
    const rows = await this._db.table<File>('files').select('*');
    return rows;
  }

  async getOne(path: string) {
    const res = await this._db.table<File>('files').select('*').where('path', '=', path).first();

    return res;
  }

  async search(embedding: Array<number>) {
    const res = await this._db
      .table<File>('files')
      .select<File[]>(
        '*',
        this._db.raw(`vec_distance_L2(embedding, '${JSON.stringify(embedding)}') as distance`)
      )
      .orderBy('distance')
      .limit(3);

    return res;
  }

  async create(value: File) {
    await this._db.table<File>('files').insert({
      ...value,
      embedding: value.embedding
        ? this._db.raw(`vec_f32('${JSON.stringify(value.embedding)}')`)
        : undefined,
    });

    return { ...value };
  }

  async update(value: File) {
    value.updated_at = new Date();
    await this._db
      .table<File>('files')
      .update({
        ...value,
        embedding: value.embedding
          ? this._db.raw(`vec_f32('${JSON.stringify(value.embedding)}')`)
          : undefined,
      })
      .where('path', '=', value.path);

    return { ...value };
  }

  async delete(path: string) {
    await this._db.table<File>('files').delete().where('path', '=', path);
  }
}
