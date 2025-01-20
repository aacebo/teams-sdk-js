import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const filePath = path.join(
  os.homedir(),
  'teams-sdk',
  '.config.json',
);

export class Config {
  syncedAt?: Date;

  save() {
    fs.writeFileSync(filePath, JSON.stringify(this), {
      encoding: 'utf8'
    });
  }

  static load() {
    const config = new Config();

    if (!fs.existsSync(filePath)) {
      return config;
    }

    try {
      const json = JSON.parse(fs.readFileSync(
        filePath,
        { encoding: 'utf8' },
      ));

      config.syncedAt = new Date(json.syncedAt);
    } catch (err) { }

    return config;
  }
}
