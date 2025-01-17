// import fs from 'node:fs';
// import path from 'node:path';
// import url from 'node:url';

import { ChatPrompt } from '@teams.sdk/ai';
import { CommandModule } from 'yargs';
import { OpenAIChatModel } from '@teams.sdk/openai';

interface Args {
  readonly prompt: string;
  readonly apiKey: string;
}

const instructions = `
`;

export const Add: CommandModule<{}, Args> = {
  command: 'add <prompt>',
  aliases: 'a',
  describe: 'add features do you app',
  builder: (b) => {
    return b.positional('prompt', {
      alias: 'p',
      type: 'string',
      describe: 'add features to your project',
      demandOption: true
    }).option('apiKey', {
      alias: 'k',
      type: 'string',
      demandOption: !process.env.OPENAI_API_KEY,
      default: process.env.OPENAI_API_KEY || 's'
    });
  },
  handler: async ({ prompt, apiKey }) => {
    const p = new ChatPrompt({
      instructions,
      model: new OpenAIChatModel({
        model: 'gpt-4o',
        apiKey,
        temperature: 0
      })
    });

    await p.chat(prompt);
  }
};
