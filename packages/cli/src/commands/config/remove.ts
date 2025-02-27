import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

import { CommandModule } from 'yargs';
import { String } from '@teams.sdk/common';

import { Context } from '../../context';
import { Project } from '../../project';

interface Args {
  name: string;
}

export function Remove(_: Context): CommandModule<{}, Args> {
  const configsPath = path.resolve(url.fileURLToPath(import.meta.url), '../..', 'configs');

  return {
    command: 'remove <name>',
    describe: 'remove a configuration',
    builder: (b) => {
      return b.positional('name', {
        type: 'string',
        demandOption: true,
        choices: fs
          .readdirSync(configsPath)
          .map((name) =>
            fs.readdirSync(path.join(configsPath, name)).map((type) => `${name}.${type}`)
          )
          .flat(),
      });
    },
    handler: async ({ name }) => {
      const [type, subType] = name.split('.');
      const project = Project.load();

      if (type === 'ttk') {
        project.addTeamsToolkit(subType);
      }

      await project.down();
      console.log(
        new String()
          .bold(new String().yellow(`✅ config "${name}" successfully removed`).toString())
          .toString()
      );
    },
  };
}
