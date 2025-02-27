import path from 'node:path';
import fs from 'node:fs';

import { ProjectAttributeOperation } from '../project-attribute';

export class FileJsonSetOperation implements ProjectAttributeOperation {
  readonly name = 'file.json.set';

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
    const ext = path.extname(this._filename).toLowerCase();
    const filePath = path.join(this._path, this._filename);

    if (!fs.existsSync(filePath)) {
      throw new Error(`file "${filePath}" does not exist`);
    }

    if (ext !== '.json') {
      throw new Error(`file "${filePath}" is not a json type`);
    }

    process.stdout.write(`updating file "${filePath}"...`);
    let json = {};

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      json = JSON.parse(content);
    } catch (err) {
      throw new Error(`"${filePath}" could not be parsed`);
    }

    this._set(json, this._key, this._value);
    fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + '\n', 'utf8');
    process.stdout.write('done\n');
  }

  down() {}

  private _set(object: any, path: string, value: any) {
    const parts = path.split('.');
    let current = object;

    while (parts.length) {
      const key = parts.shift();

      if (!key) continue;
      if (!current[key]) {
        current[key] = {};
      }

      if (!parts.length) {
        current[key] = value;
      } else {
        current = current[key];
      }
    }
  }
}
