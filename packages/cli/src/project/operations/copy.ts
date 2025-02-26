import path from 'node:path';
import fs from 'node:fs';

import { ProjectAttributeOperation } from '../project-attribute';
import { FileCopyOperation } from './file-copy';
import { DirectoryCopyOperation } from './directory-copy';

export class CopyOperation implements ProjectAttributeOperation {
  readonly name = 'copy';

  private _from: string;
  private _to: string;
  private _name: string;

  constructor(from: string, to: string, name: string) {
    this._from = from;
    this._to = to;
    this._name = name;
  }

  async apply() {
    const from = path.join(this._from, this._name);

    if (!fs.existsSync(from)) {
      throw new Error(`"${from}" does not exist`);
    }

    const stat = fs.statSync(from);

    if (stat.isDirectory()) {
      return new DirectoryCopyOperation(this._from, this._to, this._name).apply();
    }

    return new FileCopyOperation(this._from, this._to, this._name).apply();
  }

  async undo() {
    const to = path.join(this._to, this._name);

    if (!fs.existsSync(to)) {
      return;
    }

    const stat = fs.statSync(to);

    if (stat.isDirectory()) {
      return new DirectoryCopyOperation(this._from, this._to, this._name).undo();
    }

    return new FileCopyOperation(this._from, this._to, this._name).undo();
  }
}
