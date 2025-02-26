import path from 'node:path';
import url from 'node:url';
import fs from 'node:fs';

import { ProjectAttribute } from '../project-attribute';
import { write } from '../write';

export class TeamsToolkitAttribute implements ProjectAttribute {
  readonly id: string;
  readonly name: string;
  readonly alias = 'ttk';
  readonly description = 'include Teams Toolkit configuration';

  constructor(name: string) {
    this.id = `ttk[${name}]`;
    this.name = name;
  }

  typescript(targetDir: string) {
    const ttkDir = path.resolve(
      url.fileURLToPath(import.meta.url),
      '../..',
      'configs',
      'ttk',
      this.name
    );
    const files = fs.readdirSync(ttkDir);
    const pkg = JSON.parse(fs.readFileSync(path.join(targetDir, 'package.json'), 'utf-8'));

    for (const file of files) {
      write(ttkDir, targetDir, file);
    }

    pkg.devDependencies['env-cmd'] = 'latest';
    pkg.scripts['dev:teamsfx'] = 'npx env-cmd --silent -f .env npm run dev';
    pkg.scripts['dev:teamsfx:testtool'] = 'npx env-cmd --silent -f .env npm run dev';
    pkg.scripts['dev:teamsfx:launch-testtool'] =
      'npx env-cmd --silent -f env/.env.testtool teamsapptester start';

    write(targetDir, targetDir, 'package.json', JSON.stringify(pkg, null, 2) + '\n');
  }

  csharp(_: string) {}
}
