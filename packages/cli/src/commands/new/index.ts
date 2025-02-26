import { CommandModule } from 'yargs';

import { Context } from '../../context';
import { Typescript } from './typescript';
import { CSharp } from './csharp';

export function New(context: Context): CommandModule<{}, {}> {
  const log = context.log.child('new');

  return {
    command: 'new',
    aliases: 'n',
    describe: 'create a new app project',
    builder: (b) => {
      let args = b.command(Typescript({ ...context, log: log.child('typescript') }));

      if (process.env.TEAMS_CLI_ENV === 'development') {
        args = args.command(CSharp());
      }

      return args;
    },
    handler: () => {},
  };
}
