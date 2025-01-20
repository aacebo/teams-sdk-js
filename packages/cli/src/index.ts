#! /usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { ConsoleLogger } from '@teams.sdk/common';

import { Context } from './context';
import { Storage } from './storage';
import { Config } from './config';
import * as commands from './commands';
import { banner } from './banner';

(async () => {
  const storage = await Storage.create();
  const ctx: Context = {
    log: new ConsoleLogger('@teams.sdk/cli', { level: 'debug' }),
    config: Config.load(),
    stores: storage,
  };

  process.stdout.write(banner);
  await yargs(hideBin(process.argv))
    .command(commands.New(ctx))
    .command(commands.Copilot(ctx))
    .parse();

  storage.destroy();
})();
