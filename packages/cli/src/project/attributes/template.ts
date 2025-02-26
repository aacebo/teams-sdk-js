import path from 'node:path';
import url from 'node:url';
import fs from 'node:fs';

import { ProjectAttribute } from '../project-attribute';
import { write } from '../write';

export class TemplateAttribute implements ProjectAttribute {
  readonly id: string;
  readonly name: string;
  readonly alias = 't';
  readonly description = 'the app template to use';

  constructor(name: string) {
    this.id = `template[${name}]`;
    this.name = name;
  }

  typescript(targetDir: string) {
    fs.mkdirSync(targetDir, { recursive: true });

    const templateDir = path.resolve(
      url.fileURLToPath(import.meta.url),
      '../..',
      'templates',
      'typescript',
      this.name
    );

    const files = fs.readdirSync(templateDir);

    for (const file of files) {
      write(templateDir, targetDir, file);
    }

    const pkg = JSON.parse(fs.readFileSync(path.join(templateDir, 'package.json'), 'utf-8'));
    pkg.name = this.name;
    write(templateDir, targetDir, 'package.json', JSON.stringify(pkg, null, 2) + '\n');

    const manifest = JSON.parse(
      fs.readFileSync(path.join(targetDir, 'appPackage', 'manifest.json'), 'utf-8')
    );
    manifest.name.short = `${this.name}-\${{APP_NAME_SUFFIX}}`;
    manifest.name.full = this.name;

    write(
      path.join(templateDir, 'appPackage'),
      path.join(targetDir, 'appPackage'),
      'manifest.json',
      JSON.stringify(manifest, null, 2) + '\n'
    );
  }

  csharp(_: string) {}
}
