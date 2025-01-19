import { Knex } from 'knex';

import { File } from './models';

export class FileStorage {
  constructor(private readonly _db: Knex) {
    this._db.schema.createTableIfNotExists('files', (table) => {
      table.string('repo_owner').notNullable();
      table.string('repo_name').notNullable();
      table.string('path').notNullable();
      table.string('content');
      table.specificType('embedding', 'F32_BLOB(3)');
      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').notNullable();

      table.foreign(['repo_owner', 'repo_name']).references(['owner', 'name']).inTable('repos');
      table.primary(['repo_owner', 'repo_name', 'path']);
    });
  }

  async get(owner: string, name: string) {
    const rows = await this._db.table<File>('files')
      .select('*')
      .where('repo_owner', '=', owner)
      .andWhere('repo_name', '=', name);

    return rows;
  }

  async getOne(owner: string, name: string, path: string) {
    const res = await this._db.table<File>('files')
      .select('*')
      .where('repo_owner', '=', owner)
      .andWhere('repo_name', '=', name)
      .andWhere('path', '=', path)
      .first();

    return res;
  }

  async search(owner: string, name: string, text: string) {
    const res = await this._db.table<File>('files')
      .select('*')
      .where('repo_owner', '=', owner)
      .andWhere('repo_name', '=', name)
      .andWhere('embedding', 'match', this._db.raw(`embed('${text}')`));

    return res;
  }

  async create(value: File) {
    await this._db.table<File>('files').insert(value);
    return { ...value };
  }

  async update(value: File) {
    value.updated_at = new Date();
    await this._db.table<File>('files')
      .update(value)
      .where('repo_owner', '=', value.repo_owner)
      .andWhere('repo_name', '=', value.repo_name)
      .andWhere('path', '=', value.path);

    return { ...value };
  }

  async delete(owner: string, name: string, path: string) {
    await this._db.table<File>('files')
      .delete()
      .where('repo_owner', '=', owner)
      .andWhere('repo_name', '=', name)
      .andWhere('path', '=', path);
  }
}
