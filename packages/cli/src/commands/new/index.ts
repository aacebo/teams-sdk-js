import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import cp from 'node:child_process';

import { CommandModule } from 'yargs';

import { Context } from '../../context';
import { write } from './write';

interface Args {
  readonly name: string;
  readonly template: string;
  readonly ttk?: boolean;
  readonly start?: boolean;
}

export function New(_: Context): CommandModule<{}, Args> {
  return {
    command: 'new <name>',
    aliases: 'n',
    describe: 'create a new app project',
    builder: (b) => {
      return b
        .positional('name', {
          alias: 'n',
          type: 'string',
          describe: 'the apps name',
          demandOption: true,
          coerce: (name: string) => {
            return name
              .trim()
              .toLowerCase()
              .replace(/\s+/g, '-')
              .replace(/^[._]/, '')
              .replace(/[^a-z\d\-~]+/g, '-');
          },
        })
        .check(({ name }) => {
          if (fs.existsSync(path.join(process.cwd(), name))) {
            throw new Error(`"${name}" already exists!`);
          }

          if (!/^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(name)) {
            throw new Error(`"${name}" is not a valid package name`);
          }

          return true;
        })
        .option('template', {
          alias: 't',
          type: 'string',
          describe: 'the app template to use',
          default: 'echo-ts',
          choices: fs.readdirSync(
            path.resolve(url.fileURLToPath(import.meta.url), '../..', 'templates')
          ),
        })
        .option('ttk', {
          type: 'boolean',
          describe: 'include Teams Toolkit',
          default: false,
        })
        .option('start', {
          alias: 's',
          type: 'boolean',
          describe: 'start the project',
          default: false,
        });
    },
    handler: async ({ name, template, ttk, start }) => {
      const projectDir = path.join(process.cwd(), name);
      const templateDir = path.resolve(
        url.fileURLToPath(import.meta.url),
        '../..',
        'templates',
        template
      );

      const files = fs.readdirSync(templateDir);

      for (const file of files.filter((f) => f !== 'package.json')) {
        write(templateDir, projectDir, file);
      }

      const pkg = JSON.parse(fs.readFileSync(path.join(templateDir, `package.json`), 'utf-8'));

      pkg.name = name;

      if (ttk) {
        const ttkDir = path.resolve(url.fileURLToPath(import.meta.url), '../..', 'configs', 'ttk');
        const files = fs.readdirSync(ttkDir);

        for (const file of files) {
          write(ttkDir, projectDir, file);
        }

        pkg.devDependencies['env-cmd'] = 'latest';
        pkg.devDependencies['@microsoft/teams-app-test-tool'] = 'latest';
        pkg.scripts['dev:teamsfx'] = 'env-cmd --silent -f .localConfigs npm run dev';
        pkg.scripts['dev:teamsfx:testtool'] = 'env-cmd --silent -f env/.env.testtool npm run dev';
        pkg.scripts['dev:teamsfx:launch-testtool'] =
          "env-cmd --silent -f env/.env.testtool npx '@microsoft/teams-app-test-tool' start";
      }

      write(templateDir, projectDir, 'package.json', JSON.stringify(pkg, null, 2) + '\n');

      if (start) {
        console.log(`cd ${name} && npm install && npm run dev`);
        cp.spawnSync(`cd ${name} && npm install && npm run dev`, {
          stdio: 'inherit',
          shell: true,
        });
      }
    },
  };
}
