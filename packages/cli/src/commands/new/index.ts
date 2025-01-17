import { CommandModule } from 'yargs';

interface Args {
  readonly name: string;
}

export const New: CommandModule<{}, Args> = {
  command: 'new <name>',
  aliases: 'n',
  describe: 'create a new app project',
  builder: (b) => b.positional('name', {
    alias: 'n',
    type: 'string',
    describe: 'the apps name',
    demandOption: true
  }),
  handler: async (args) => {
    console.log(args);
  }
};
