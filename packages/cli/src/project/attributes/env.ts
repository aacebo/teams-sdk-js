import path from 'node:path';
import fs from 'node:fs';

import { ProjectAttribute } from '../project-attribute';
import { write } from '../write';

export class EnvAttribute implements ProjectAttribute {
  readonly id = 'env';
  readonly name = 'environment';
  readonly alias = 'env';
  readonly description = 'add environment variables';

  private readonly _filename: string;
  private readonly _key: string;
  private readonly _value: string;

  constructor(filename: string, key: string, value: string) {
    this._filename = filename;
    this._key = key;
    this._value = value;
  }

  typescript(targetDir: string) {
    const filePath = path.join(targetDir, this._filename);
    let lines: string[] = [];

    if (fs.existsSync(filePath)) {
      lines = fs.readFileSync(path.join(targetDir, this._filename), 'utf-8').split('\n');
    }

    lines.push(`${this._key}=${this._value}`);
    write(targetDir, targetDir, this._filename, lines.join('\n'));
  }

  csharp(_: string) {}
}
