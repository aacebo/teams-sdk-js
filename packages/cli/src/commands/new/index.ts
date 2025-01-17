import fs from 'node:fs';
import path from 'node:path';

import { CommandModule } from 'yargs';

import * as templates from './templates';

interface Args {
  readonly name: string;
}

export const New: CommandModule<{}, Args> = {
  command: 'new <name>',
  aliases: 'n',
  describe: 'create a new app project',
  builder: (b) => {
    return b.positional('name', {
      alias: 'n',
      type: 'string',
      describe: 'the apps name',
      demandOption: true
    }).check(({ name }) => {
      if (fs.existsSync(path.join(process.cwd(), name))) {
        throw new Error(`"${name}" already exists!`);
      }

      return true;
    });
  },
  handler: async ({ name }) => {
    fs.mkdirSync(path.join(process.cwd(), name));
    fs.mkdirSync(path.join(process.cwd(), name, 'src'));
    templates.blank(name);
  }
};
