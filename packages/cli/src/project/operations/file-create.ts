import path from 'node:path';
import fs from 'node:fs';

import { ProjectAttributeOperation } from '../project-attribute';

export class FileCreateOperation implements ProjectAttributeOperation {
  readonly name = 'file.create';

  private _path: string;
  private _filename: string;
  private _content?: string;

  constructor(path: string, filename: string, content?: string) {
    this._path = path;
    this._filename = filename;
    this._content = content;
  }

  apply() {
    const filePath = path.join(this._path, this._filename);

    if (!fs.existsSync(this._path)) {
      fs.mkdirSync(this._path, { recursive: true });
    }

    if (fs.existsSync(filePath)) {
      throw new Error(`file "${filePath}" already exists`);
    }

    process.stdout.write(`creating file "${filePath}"...`);
    fs.writeFileSync(filePath, this._content || '', 'utf8');
    process.stdout.write('done');
  }

  undo() {
    const filePath = path.join(this._path, this._filename);

    if (!fs.existsSync(filePath)) {
      return;
    }

    process.stdout.write(`deleting file "${filePath}"...`);
    fs.rmSync(filePath);
    process.stdout.write('done');
  }
}
