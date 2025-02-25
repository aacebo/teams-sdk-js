import { CommandModule } from 'yargs';

import { Context } from '../../context';
import { Typescript } from './typescript';
import { CSharp } from './csharp';

export function New(_: Context): CommandModule<{}, {}> {
  return {
    command: 'new',
    aliases: 'n',
    describe: 'create a new app project',
    builder: (b) => b.command(Typescript()).command(CSharp()),
    handler: () => {},
  };
}
