#! /usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { ConsoleLogger } from '@teams.sdk/common';

import { Context } from './context';
import { Storage } from './storage';
import { Config } from './config';
import * as commands from './commands';

(async () => {
  const storage = await Storage.create();
  const config = Config.load();
  const ctx: Context = {
    log: new ConsoleLogger('@teams.sdk/cli'),
    stores: storage,
    config,
  };

  let args = yargs(hideBin(process.argv))
    .scriptName('teams')
    .command(commands.New(ctx))
    .command(commands.Config(ctx));

  if (process.env.TEAMS_CLI_ENV === 'development') {
    args = args.command(commands.Copilot(ctx));
  }

  args.parse();
  storage.destroy();
})();
