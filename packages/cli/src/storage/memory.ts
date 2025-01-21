import { Knex } from 'knex';

import { Memory } from './models';

export class MemoryStorage {
  constructor(private readonly _db: Knex) { }

  async migrate() {
    const exists = await this._db.schema.hasTable('memories');

    if (!exists) {
      return this._db.schema.createTable('memories', (table) => {
        table.string('id', 36).primary();
        table.string('parent_id', 36).references('id').inTable('memories');
        table.text('content').notNullable();
        table.specificType('embedding', 'float[1536]');
        table.timestamp('created_at').notNullable();
        table.timestamp('updated_at').notNullable();
      });
    }
  }

  async get() {
    const rows = await this._db.table<Memory>('memories').select('*');
    return rows;
  }

  async getById(id: string) {
    const res = await this._db.table<Memory>('memories')
      .select('*')
      .where('id', '=', id)
      .first();

    return res;
  }

  async search(embedding: Array<number>) {
    const res = await this._db.table<Memory>('memories')
      .select<File[]>(
        '*',
        this._db.raw(`vec_distance_L2(embedding, '${JSON.stringify(embedding)}') as distance`),
      )
      .orderBy('distance')
      .limit(3);

    return res;
  }

  async create(value: Memory) {
    await this._db.table<Memory>('memories')
      .insert({
        ...value,
        embedding: value.embedding ?
          this._db.raw(`vec_f32('${JSON.stringify(value.embedding)}')`) :
          undefined,
      });

    return { ...value };
  }

  async update(value: Memory) {
    value.updated_at = new Date();
    await this._db.table<Memory>('memories')
      .update({
        ...value,
        embedding: value.embedding ?
          this._db.raw(`vec_f32('${JSON.stringify(value.embedding)}')`) :
          undefined,
      })
      .where('id', '=', value.id);

    return { ...value };
  }

  async delete(id: string) {
    await this._db.table<Memory>('memories')
      .delete()
      .where('id', '=', id);
  }
}
