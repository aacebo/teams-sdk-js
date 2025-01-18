import { ChatPrompt } from '@teams.sdk/ai';
import { OpenAIChatModel } from '@teams.sdk/openai';
import { CommandModule } from 'yargs';

import * as writeProjectFile from './write-project-file';
import * as readProjectFile from './read-project-file';
import * as readProjectDirectory from './read-project-directory';
import * as readSample from './read-sample';

interface Args {
  readonly prompt: string;
  readonly apiKey: string;
}

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
      role: 'user',
      instructions: [
        'you are an assistant that helps developers build bots for Microsoft Teams.',
        'you help developers build using the `@teams.sdk` packages https://github.com/aacebo/teams-sdk-js.',
        'use `read-project-file` to read a project files content.',
        'use `read-project-directory` to list the files and directories in a projects directory or sub directory.',
        'use `read-sample` to read code for @teams.sdk packages to understand how to use them.',
        'use `write-project-file` to create or update a project files content',
        'you should first read all the projects code so you can understand how it can be updated.',
        'you should then read one or more samples to understand how to acheive the developers desired outcome in the simplest way.',
        'you should always prioritize using features in packages named `@teams.sdk/*` over others.',
        'when the user asks for something to be added, use the `@teams.sdk/*` packages to do so.'
      ].join('\n'),
      model: new OpenAIChatModel({
        model: 'gpt-4o',
        apiKey
      })
    }).function(
      'read-project-file',
      'read a project files source code',
      readProjectFile.schema,
      readProjectFile.handler
    ).function(
      'read-project-directory',
      'list the files and directories in a projects directory or sub directory',
      readProjectDirectory.schema,
      readProjectDirectory.handler
    ).function(
      'write-project-file',
      'create or update a project file',
      writeProjectFile.schema,
      writeProjectFile.handler
    ).function(
      'read-sample',
      'read sample code for @teams.sdk packages to understand how to use them',
      readSample.schema,
      readSample.handler
    );

    console.log(await p.chat(prompt));
  }
};
