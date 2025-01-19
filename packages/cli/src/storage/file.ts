import { Knex } from 'knex';

import { File } from './models';

export class FileStorage {
  constructor(private readonly _db: Knex) { }

  async migrate() {
    const exists = await this._db.schema.hasTable('files');

    if (exists) return;

    return this._db.schema.createTable('files', (table) => {
      table.text('repo_owner').notNullable();
      table.text('repo_name').notNullable();
      table.text('path').notNullable();
      table.text('content');
      table.specificType('embedding', 'float[1536]');
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

  async search(owner: string, name: string, embedding: Array<number>) {
    const res = await this._db.table<File>('files')
      .select<File[]>(
        '*',
        this._db.raw(`vec_distance_L2(embedding, '${JSON.stringify(embedding)}') as distance`),
      )
      .where('repo_owner', '=', owner)
      .andWhere('repo_name', '=', name)
      .orderBy('distance')
      .limit(3);

    return res;
  }

  async create(value: File) {
    await this._db.table<File>('files')
      .insert({
        ...value,
        embedding: value.embedding ?
          this._db.raw(`vec_f32('${JSON.stringify(value.embedding)}')`) :
          undefined,
      });

    return { ...value };
  }

  async update(value: File) {
    value.updated_at = new Date();
    await this._db.table<File>('files')
      .update({
        ...value,
        embedding: value.embedding ?
          this._db.raw(`vec_f32('${JSON.stringify(value.embedding)}')`) :
          undefined,
      })
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
