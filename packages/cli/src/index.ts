#! /usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { ConsoleLogger } from '@teams.sdk/common';

import { Context } from './context';
import { Storage } from './storage';
import { Config } from './config';
import { banner } from './banner';
import * as commands from './commands';

(async () => {
  const storage = await Storage.create();
  const config = Config.load();
  const ctx: Context = {
    log: new ConsoleLogger('@teams.sdk/cli', { level: 'debug' }),
    stores: storage,
    config,
  };

  process.stdout.write(banner);

  await yargs(hideBin(process.argv))
    .command(commands.New(ctx))
    .command(commands.Copilot(ctx))
    .parse();

  storage.destroy();
})();
