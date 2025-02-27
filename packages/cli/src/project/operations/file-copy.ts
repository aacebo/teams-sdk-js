import fs from 'node:fs';

import { ProjectAttributeOperation } from '../project-attribute';

export class FileCopyOperation implements ProjectAttributeOperation {
  readonly name = 'file.copy';

  private _from: string;
  private _to: string;

  constructor(from: string, to: string) {
    this._from = from;
    this._to = to;
  }

  up() {
    if (!fs.existsSync(this._from)) {
      throw new Error(`file "${this._from}" does not exist`);
    }

    process.stdout.write(`copying file "${this._from}" to "${this._to}"...`);
    fs.copyFileSync(this._from, this._to);
    process.stdout.write('done\n');
  }

  down() {
    if (!fs.existsSync(this._to)) {
      return;
    }

    process.stdout.write(`deleting file "${this._to}"...`);
    fs.rmSync(this._to);
    process.stdout.write('done\n');
  }
}
