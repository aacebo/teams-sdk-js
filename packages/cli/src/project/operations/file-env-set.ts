import path from 'node:path';
import fs from 'node:fs';

import { ProjectAttributeOperation } from '../project-attribute';

export class FileEnvSetOperation implements ProjectAttributeOperation {
  readonly name = 'file.env.set';

  private _path: string;
  private _filename: string;
  private _key: string;
  private _value: any;

  constructor(path: string, filename: string, key: string, value: any) {
    this._path = path;
    this._filename = filename;
    this._key = key;
    this._value = value;
  }

  up() {
    const filePath = path.join(this._path, this._filename);
    process.stdout.write(`updating file "${filePath}"...`);
    let lines: string[] = [];

    if (fs.existsSync(filePath)) {
      lines = fs.readFileSync(filePath, 'utf8').split('\n');
    }

    const env: Record<string, string> = {};

    for (const line of lines) {
      const [key, value] = line.split('=');
      env[key] = value;
    }

    env[this._key] = this._value;
    lines = Object.entries(env).map(([key, value]) => `${key}=${value}`);
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
    process.stdout.write('done\n');
  }

  down() {
    const filePath = path.join(this._path, this._filename);

    if (!fs.existsSync(filePath)) {
      return;
    }

    process.stdout.write(`updating file "${filePath}"...`);
    let lines: string[] = [];

    if (fs.existsSync(filePath)) {
      lines = fs.readFileSync(filePath, 'utf8').split('\n');
    }

    const env: Record<string, string> = {};

    for (const line of lines) {
      const [key, value] = line.split('=');
      env[key] = value;
    }

    delete env[this._key];
    lines = Object.entries(env).map(([key, value]) => `${key}=${value}`);
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
    process.stdout.write('done\n');
  }
}
