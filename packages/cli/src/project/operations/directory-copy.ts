import path from 'node:path';
import fs from 'node:fs';

import { ProjectAttributeOperation } from '../project-attribute';
import { FileCopyOperation } from './file-copy';

export class DirectoryCopyOperation implements ProjectAttributeOperation {
  readonly name = 'directory.copy';

  private _from: string;
  private _to: string;
  private _name: string;

  constructor(from: string, to: string, name: string) {
    this._from = from;
    this._to = to;
    this._name = name;
  }

  async apply() {
    const operations: Array<ProjectAttributeOperation> = [];
    const from = path.join(this._from, this._name);
    const to = path.join(this._to, this._name);

    if (!fs.existsSync(from)) {
      throw new Error(`directory "${from}" does not exist`);
    }

    const items = fs.readdirSync(from);

    for (const item of items) {
      const stat = fs.statSync(item);

      if (stat.isDirectory()) {
        operations.push(new DirectoryCopyOperation(from, to, item));
      } else {
        operations.push(new FileCopyOperation(from, to, item));
      }
    }

    for (const op of operations) {
      await op.apply();
    }
  }

  async undo() {
    const operations: Array<ProjectAttributeOperation> = [];
    const from = path.join(this._from, this._name);
    const to = path.join(this._to, this._name);

    if (!fs.existsSync(to)) {
      throw new Error(`directory "${to}" does not exist`);
    }

    const items = fs.readdirSync(to);

    for (const item of items) {
      const stat = fs.statSync(item);

      if (stat.isDirectory()) {
        operations.push(new DirectoryCopyOperation(from, to, item));
      } else {
        operations.push(new FileCopyOperation(from, to, item));
      }
    }

    for (const op of operations) {
      await op.undo();
    }
  }
}
