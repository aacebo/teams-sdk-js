import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import cp from 'node:child_process';

import { CommandModule } from 'yargs';

import { Project } from '../../project';

interface Args {
  readonly name: string;
  readonly template: string;
  readonly ttk?: boolean;
  readonly start?: boolean;
}

export function Typescript(): CommandModule<{}, Args> {
  return {
    command: ['$0 <name>', 'typescript <name>'],
    aliases: 'ts',
    describe: 'create a new typescript app project',
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
        .option('template', {
          alias: 't',
          type: 'string',
          describe: 'the app template to use',
          default: 'echo',
          choices: fs.readdirSync(
            path.resolve(url.fileURLToPath(import.meta.url), '../..', 'templates', 'typescript')
          ),
        })
        .option('start', {
          alias: 's',
          type: 'boolean',
          describe: 'start the project',
          default: false,
        })
        .option('ttk', {
          alias: 'ttk',
          type: 'boolean',
          describe: 'include Teams Toolkit configuration',
          default: false,
        })
        .check(({ name }) => {
          if (fs.existsSync(path.join(process.cwd(), name))) {
            throw new Error(`"${name}" already exists!`);
          }

          if (!/^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(name)) {
            throw new Error(`"${name}" is not a valid package name`);
          }

          return true;
        });
    },
    handler: async ({ name, template, ttk, start }) => {
      const projectDir = path.join(process.cwd(), name);
      const project = new Project(projectDir, name, 'typescript').addTemplate(template);

      if (ttk) {
        project.addTeamsToolkit();
      }

      await project.write();

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
