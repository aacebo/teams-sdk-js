import { ChatPrompt } from '@teams.sdk/ai';
import { OpenAIChatModel } from '@teams.sdk/openai';

import { CopilotContext } from '../context';

import { Project } from './project';
import { TeamsSDK } from './teams-sdk';

export function Root(ctx: CopilotContext) {
  const { log } = ctx;
  const project = Project({
    ...ctx,
    log: log.child('project'),
  });

  const teams = TeamsSDK({
    ...ctx,
    log: log.child('teams'),
  });

  return new ChatPrompt({
    role: 'system',
    instructions: [
      'your name is Teams Copilot.',
      'you are an assistant that helps developers build bots for Microsoft Teams.',
      'you help developers build using the `@teams.sdk` packages https://github.com/aacebo/teams-sdk-js.',
      'you know everything about the Teams SDK, and you excel at answer questions about it.',

      'you should first read all the projects code so you can understand how it can be updated.',
      'you should ask the `teams-sdk-assistant` about the Teams SDK (`@teams.sdk/*`) packages so you can write efficient and correct code.',
      'you should always prioritize using features in packages named `@teams.sdk/*` over others.',
      'when the user asks for something to be added, use the `@teams.sdk/*` packages to do so.',
      "its your job to make the changes the developer requested, don't instruct them to make changes.",

      '**IMPORTANT!**',
      '- before attempting to write changes, show a draft to the user and ask for consent',
      '- when showing code to the developer, ensure you color it using ANSI green code',
      '- keep the developer updated on what your working on via the `say` function.',
    ].join('\n'),
    model: new OpenAIChatModel({
      model: 'gpt-4o',
      apiKey: ctx.apiKey,
      temperature: 0,
      stream: true,
    }),
  })
    .function(
      'say',
      'say something to the user',
      {
        type: 'object',
        properties: {
          text: {
            type: 'string',
            title: 'text',
            description: 'what to say to the user',
          },
        },
        required: ['text'],
      },
      ({ text }: { text: string }) => {
        process.stdout.write(text);
      }
    )
    .function(
      'project-assistant',
      'ask the project assistant to read and write files and directories to the project source code',
      {
        type: 'object',
        properties: {
          text: {
            type: 'string',
            title: 'text',
            description: 'the io operation you want the assistant to perform',
          },
        },
        required: ['text'],
      },
      async ({ text }: { text: string }) => {
        try {
          return await project.chat(text);
        } catch (err) {
          if (err instanceof Error) {
            log.error(err.message);
            return err.message;
          }

          log.error(err);
          return 'an error occurred';
        }
      }
    )
    .function(
      'teams-sdk-assistant',
      'ask the Teams SDK assistant about the packages and syntax that should be used when making an app/bot for Teams',
      {
        type: 'object',
        properties: {
          text: {
            type: 'string',
            title: 'text',
            description: 'the question you want to ask',
          },
        },
        required: ['text'],
      },
      async ({ text }: { text: string }) => {
        try {
          return await teams.chat(text);
        } catch (err) {
          if (err instanceof Error) {
            log.error(err.message);
            return err.message;
          }

          log.error(err);
          return 'an error occurred';
        }
      }
    );
}
