import os from 'node:os';
import fs from 'node:fs';
import path from 'node:path';

import Knex from 'knex';
import sqlite from 'sqlite3';
import * as sqliteVec from 'sqlite-vec';

import { RepositoryStorage } from './repository';
import { FileStorage } from './file';

export function storage() {
  if (!fs.existsSync(path.join(os.homedir(), 'teams-sdk'))) {
    fs.mkdirSync(path.join(os.homedir(), 'teams-sdk'), { recursive: true });
  }

  const db = Knex({
    client: 'sqlite3',
    connection: {
      filename: path.join(
        os.homedir(),
        'teams-sdk',
        'memory.db'
      )
    },
    pool: {
      afterCreate: (conn: sqlite.Database, done: (...args: any[]) => void) => {
        console.log(typeof conn);
        sqliteVec.load(conn as any);
        done(conn);
      }
    }
  });

  const repository = new RepositoryStorage(db);
  const file = new FileStorage(db);
  return { repository, file };
}
