import path from 'node:path';
import fs from 'node:fs';

import { ProjectAttributeOperation } from '../project-attribute';

export class FileCopyOperation implements ProjectAttributeOperation {
  readonly name = 'file.copy';

  private _from: string;
  private _to: string;
  private _filename: string;

  constructor(from: string, to: string, filename: string) {
    this._from = from;
    this._to = to;
    this._filename = filename;
  }

  apply() {
    const from = path.join(this._from, this._filename);
    const to = path.join(this._to, this._filename);

    if (!fs.existsSync(from)) {
      throw new Error(`file "${from}" does not exist`);
    }

    process.stdout.write(`copying file "${from}" to "${to}"...`);
    fs.copyFileSync(from, to);
    process.stdout.write('done');
  }

  undo() {
    const to = path.join(this._to, this._filename);

    if (!fs.existsSync(to)) {
      return;
    }

    process.stdout.write(`deleting file "${to}"...`);
    fs.rmSync(to);
    process.stdout.write('done');
  }
}
