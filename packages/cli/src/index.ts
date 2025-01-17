#! /usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import * as commands from './commands';

(async () => {
  await yargs(hideBin(process.argv))
    .command(commands.New)
    .parse();
})();
