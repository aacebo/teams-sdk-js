import os from 'node:os';
import fs from 'node:fs';
import path from 'node:path';

import Knex from 'knex';
import sqlite from 'sqlite3';
import * as sqliteVec from 'sqlite-vec';

import { FileStorage } from './file';
import { MemoryStorage } from './memory';

export class Storage {
  readonly file: FileStorage;
  readonly memory: MemoryStorage;

  constructor(private readonly db: Knex.Knex) {
    this.file = new FileStorage(db);
    this.memory = new MemoryStorage(db);
  }

  destroy() {
    this.db.destroy();
  }

  private async migrate() {
    await this.file.migrate();
    await this.memory.migrate();
  }

  static async create() {
    if (!fs.existsSync(path.join(os.homedir(), 'teams-sdk'))) {
      fs.mkdirSync(path.join(os.homedir(), 'teams-sdk'), { recursive: true });
    }

    const db = Knex({
      client: 'sqlite3',
      useNullAsDefault: true,
      connection: {
        filename: path.join(os.homedir(), 'teams-sdk', 'memory.db'),
      },
      pool: {
        max: 5,
        afterCreate: (conn: sqlite.Database, done: (...args: any[]) => void) => {
          sqliteVec.load(conn as any);
          done(null, conn);
        },
      },
    });

    try {
      const storage = new Storage(db);
      await storage.migrate();
      return storage;
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.name, err.message, err.stack);
      }

      throw err;
    }
  }
}
