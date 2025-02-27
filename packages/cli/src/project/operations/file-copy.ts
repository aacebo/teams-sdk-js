import fs from 'node:fs';
import path from 'node:path';
import { String } from '@teams.sdk/common';

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
      throw new Error(`"${this._from}" does not exist`);
    }

    process.stdout.write(
      new String().cyan(`copying "${path.basename(this._from)}" => "${this._to}"...`).toString()
    );
    fs.copyFileSync(this._from, this._to);
    process.stdout.write('✅\n');
  }

  down() {
    if (!fs.existsSync(this._to)) {
      return;
    }

    process.stdout.write(new String().yellow(`deleting "${this._to}"...`).toString());
    fs.rmSync(this._to);
    process.stdout.write('✅\n');
  }
}
