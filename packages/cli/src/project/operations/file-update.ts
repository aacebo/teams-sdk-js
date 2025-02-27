import path from 'node:path';
import fs from 'node:fs';

import { ProjectAttributeOperation } from '../project-attribute';

export class FileUpdateOperation implements ProjectAttributeOperation {
  readonly name = 'file.update';

  private _path: string;
  private _filename: string;
  private _content?: string;

  constructor(path: string, filename: string, content?: string) {
    this._path = path;
    this._filename = filename;
    this._content = content;
  }

  up() {
    const filePath = path.join(this._path, this._filename);

    if (!fs.existsSync(filePath)) {
      throw new Error(`file "${filePath}" does not exist`);
    }

    process.stdout.write(`updating file "${filePath}"...`);
    fs.writeFileSync(filePath, this._content || '', 'utf8');
    process.stdout.write('done\n');
  }

  down() {}
}
