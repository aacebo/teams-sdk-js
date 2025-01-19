import { Knex } from 'knex';

import { Repository } from './models';

export class RepositoryStorage {
  constructor(private readonly _db: Knex) {
    this._db.schema.createTableIfNotExists('repos', (table) => {
      table.string('owner').notNullable();
      table.string('name').notNullable();
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
