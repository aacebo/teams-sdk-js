import { CommandModule } from 'yargs';

import { root } from './prompts';

interface Args {
  readonly prompt: string;
  readonly apiKey: string;
}

export const Copilot: CommandModule<{}, Args> = {
  command: 'copilot <prompt>',
  aliases: 'a',
  describe: 'ask teams copilot to make changes to your project',
  builder: (b) => {
    return b.positional('prompt', {
      alias: 'p',
      type: 'string',
      describe: 'changes you want copilot to make',
      demandOption: true
    }).option('apiKey', {
      alias: 'k',
      type: 'string',
      demandOption: !process.env.OPENAI_API_KEY,
      default: process.env.OPENAI_API_KEY || 's'
    });
  },
  handler: async ({ prompt, apiKey }) => {
    const p = root(apiKey);
    console.log(await p.chat(prompt));
  }
};
