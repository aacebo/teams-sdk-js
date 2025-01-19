import { ChatPrompt } from '@teams.sdk/ai';
import { OpenAIChatModel } from '@teams.sdk/openai';

import * as readDirectory from './read-directory';
import * as readFile from './read-file';
import * as writeFile from './write-file';

export function project(apiKey: string) {
  return new ChatPrompt({
    role: 'user',
    instructions: [
      'you are an assistant that helps developers read/write files and directories to their project.',
      'upon request, you should read files and directories in the project for the developer.',
      'upon request, you should create and update files in the project for the developer.',

      'use `read-file` to read a project files content.',
      'use `read-directory` to list the files and directories in a projects directory or sub directory.',
      'use `write-file` to create or update a project files content',
    ].join('\n'),
    model: new OpenAIChatModel({
      model: 'gpt-4o',
      apiKey,
      temperature: 0
    })
  }).function(
    'read-file',
    'read a project files source code',
    readFile.schema,
    readFile.handler
  ).function(
    'read-directory',
    'list the files and directories in a projects directory or sub directory',
    readDirectory.schema,
    readDirectory.handler
  ).function(
    'write-file',
    'create or update a project file',
    writeFile.schema,
    writeFile.handler
  );
}
