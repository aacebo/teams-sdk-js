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
  readonly clientId?: string;
  readonly clientSecret?: string;
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
          type: 'boolean',
          describe: 'include Teams Toolkit configuration',
          default: false,
        })
        .option('client-id', {
          type: 'string',
          describe: 'the apps client id (app id)',
          default: process.env.CLIENT_ID,
        })
        .option('client-secret', {
          type: 'string',
          describe: 'the apps client secret',
          default: process.env.CLIENT_SECRET,
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
    handler: async ({ name, template, ttk, start, clientId, clientSecret }) => {
      const projectDir = path.join(process.cwd(), name);
      const project = new Project(projectDir, name, 'typescript').addTemplate(template);

      if (ttk) {
        project.addTeamsToolkit();
        project.addEnv('PORT', '3978');
      }

      if (clientId) {
        project.addEnv('CLIENT_ID', clientId);
      }

      if (clientSecret) {
        project.addEnv('CLIENT_SECRET', clientSecret);
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
