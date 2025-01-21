import fs from 'node:fs';
import os from 'node:os';
import npath from 'node:path';
import cp from 'node:child_process';

import axios from 'axios';
import OpenAI from 'openai';
import { Logger } from '@teams.sdk/common';

import { Storage } from '../storage';

export class Crawler {
  private readonly _log: Logger;
  private readonly _openai: OpenAI;
  private readonly _storage: Storage;

  constructor(log: Logger, openai: OpenAI, storage: Storage) {
    this._log = log.child('crawler');
    this._openai = openai;
    this._storage = storage;
  }

  async start() {
    await this._downloadSource();
    await this._index(npath.join(os.homedir(), 'teams-sdk', 'teams-sdk-js-main/book/src'));
    await this._index(npath.join(os.homedir(), 'teams-sdk', 'teams-sdk-js-main/apps'));
    await this._index(npath.join(os.homedir(), 'teams-sdk', 'teams-sdk-js-main/samples'));
  }

  private _downloadSource() {
    return new Promise<void>(async (resolve) => {
      const teamsSdkPath = npath.join(os.homedir(), 'teams-sdk');
      const zipPath = npath.join(
        teamsSdkPath,
        'repository.zip',
      );

      const file = fs.createWriteStream(zipPath);
      const res = await axios.get('http://github.com/aacebo/teams-sdk-js/archive/refs/heads/main.zip', {
        responseType: 'stream'
      });

      res.data.pipe(file);
      file.on('finish', () => {
        cp.execSync(`unzip ${zipPath} -d ${teamsSdkPath}`);
        fs.rmSync(zipPath);
        resolve();
      });
    });
  }

  private async _index(path: string) {
    this._log.debug(path);

    if (!fs.existsSync(path)) {
      this._log.warn(`"${path}" not found`);
      return;
    }

    const stat = fs.statSync(path);

    if (stat.isDirectory()) {
      return await this._indexDir(path);
    }

    return await this._indexFile(path);
  }

  private async _indexDir(path: string) {
    const items = fs.readdirSync(path);

    for (const item of items) {
      const subPath = item.toString();

      if (subPath.includes('node_modules')) {
        continue;
      }

      await this._index(npath.join(path, subPath));
    }

    fs.rmSync(path, {
      recursive: true,
      force: true
    });
  }

  private async _indexFile(path: string) {
    if (
      !npath.matchesGlob(path, '**/*.ts') &&
      !npath.matchesGlob(path, '**/*/src/**/*.md') &&
      !npath.matchesGlob(path, '**/*/package.json')
    ) return;

    try {
      let file = await this._storage.file.getOne(path);

      if (!file) {
        file = await this._storage.file.create({
          path,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }

      file.content = fs.readFileSync(path, { encoding: 'utf8' }).toString();

      try {
        const res = await this._openai.embeddings.create({
          input: file.content,
          model: 'text-embedding-3-small',
          encoding_format: 'float',
        });

        file.embedding = res.data[0].embedding;
        file = await this._storage.file.update(file);
      } catch (err) {
        await this._storage.file.delete(path);
        throw err;
      }
    } catch (err) {
      this._log.error(err);
    }
  }
}
