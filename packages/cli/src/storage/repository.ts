import { Knex } from 'knex';

import { Repository } from './models';

export class RepositoryStorage {
  constructor(private readonly _db: Knex) { }

  async migrate() {
    const exists = await this._db.schema.hasTable('repos');

    if (exists) return;

    return this._db.schema.createTable('repos', (table) => {
      table.text('owner').notNullable();
      table.text('name').notNullable();
      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').notNullable();

      table.primary(['owner', 'name']);
    });
  }

  async get() {
    const rows = await this._db.table<Repository>('repos').select('*');
    return rows;
  }

  async getOne(owner: string, name: string) {
    const res = await this._db.table<Repository>('repos')
      .select('*')
      .where('owner', '=', owner)
      .andWhere('name', '=', name)
      .first();

    return res;
  }

  async create(value: Repository) {
    await this._db.table<Repository>('repos').insert(value);
    return { ...value };
  }

  async update(value: Repository) {
    await this._db.table<Repository>('repos')
      .update(value)
      .where('owner', '=', value.owner)
      .andWhere('name', '=', value.name);

    return { ...value };
  }

  async delete(owner: string, name: string) {
    await this._db.table<Repository>('repos')
      .delete()
      .where('owner', '=', owner)
      .andWhere('name', '=', name);
  }
}
