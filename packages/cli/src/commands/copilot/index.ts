import readline from 'node:readline';

import OpenAI from 'openai';
import { CommandModule } from 'yargs';

import { Context } from '../../context';

import { Root } from './prompts';

interface Args {
  readonly prompt?: string;
  readonly apiKey: string;
}

export function Copilot(ctx: Context): CommandModule<{}, Args> {
  return {
    command: 'copilot',
    aliases: 'c',
    describe: '[beta] ask teams copilot to make changes to your project',
    builder: (b) => {
      return b
        .option('prompt', {
          alias: 'p',
          type: 'string',
          describe: 'changes you want copilot to make',
        })
        .option('apiKey', {
          alias: 'k',
          type: 'string',
          demandOption: !process.env.OPENAI_API_KEY,
          default: process.env.OPENAI_API_KEY || 's',
        });
    },
    handler: async ({ prompt, apiKey }) => {
      const lines = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      const root = Root({
        ...ctx,
        apiKey,
        log: ctx.log.child('copilot'),
        openai: new OpenAI({ apiKey }),
      });

      if (prompt) {
        await root.chat(prompt, (chunk) => {
          lines.write(chunk);
        });

        return process.exit(0);
      }

      await root.chat('hello', (chunk) => {
        process.stdout.write(chunk);
      });

      process.stdout.write('\n$: ');

      for await (const line of lines) {
        const text = line.trim();

        if (text === 'exit') {
          return process.exit(0);
        }

        if (text === '/history') {
          console.log(root.messages);
          process.stdout.write('$: ');
          continue;
        }

        await root.chat(text, (chunk) => {
          process.stdout.write(chunk);
        });

        process.stdout.write('\n$: ');
      }
    },
  };
}
