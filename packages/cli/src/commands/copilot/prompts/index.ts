import { ChatPrompt } from '@teams.sdk/ai';
import { OpenAIChatModel } from '@teams.sdk/openai';

import { project } from './project';
import { teamsSdk } from './teams-sdk';

export function root(apiKey: string) {
  const projectPrompt = project(apiKey);
  const teamsSdkPrompt = teamsSdk(apiKey);

  return new ChatPrompt({
    role: 'user',
    instructions: [
      'you are an assistant that helps developers build bots for Microsoft Teams.',
      'you help developers build using the `@teams.sdk` packages https://github.com/aacebo/teams-sdk-js.',

      'you should first read all the projects code so you can understand how it can be updated.',
      'you should ask the `teams-sdk-assistant` about the `@teams.sdk/*` packages so you can write efficient and correct code.',
      'you should always prioritize using features in packages named `@teams.sdk/*` over others.',
      'when the user asks for something to be added, use the `@teams.sdk/*` packages to do so.',
      'its your job to make the changes the developer requested, don\'t instruct them to make changes.',
    ].join('\n'),
    model: new OpenAIChatModel({
      model: 'gpt-4o',
      apiKey,
      temperature: 0
    })
  }).function(
    'project-assistant',
    'ask the project assistant to read and write files and directories to the project source code',
    {
      type: 'object',
      properties: {
        text: {
          type: 'string',
          title: 'text',
          description: 'the io operation you want the assistant to perform'
        }
      },
      required: ['text']
    },
    async ({ text }: { text: string }) => {
      try {
        return await projectPrompt.chat(text);
      } catch (err) {
        if (err instanceof Error) {
          return err.message;
        }

        return 'an error occurred';
      }
    }
  ).function(
    'teams-sdk-assistant',
    'ask the Teams SDK assistant about the packages and syntax that should be used when making an app/bot for Teams',
    {
      type: 'object',
      properties: {
        text: {
          type: 'string',
          title: 'text',
          description: 'the question you want to ask'
        }
      },
      required: ['text']
    },
    async ({ text }: { text: string }) => {
      try {
        return await teamsSdkPrompt.chat(text);
      } catch (err) {
        if (err instanceof Error) {
          return err.message;
        }

        return 'an error occurred';
      }
    }
  );
}
