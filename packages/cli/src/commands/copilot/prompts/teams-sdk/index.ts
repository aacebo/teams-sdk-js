import { ChatPrompt } from '@teams.sdk/ai';
import { OpenAIChatModel } from '@teams.sdk/openai';

import { CopilotContext } from '../../context';

import * as search from './search';

export function TeamsSDK(ctx: CopilotContext) {
  return new ChatPrompt({
    role: 'system',
    instructions: [
      'you are an assistant that helps developers learn and understand how to use the Teams SDK.',
      'the Teams SDK are a suite of packages in the namespace `@teams.sdk/*`.',
      'the Teams SDK packages exist to make bot/app/ai development simple, easy, and fun.'
    ].join('\n'),
    model: new OpenAIChatModel({
      model: 'gpt-4o',
      apiKey: ctx.apiKey,
      temperature: 0
    })
  }).function(
    'search',
    'search the Teams SDK documentation and codebase',
    search.schema,
    search.handler({
      ...ctx,
      log: ctx.log.child('search'),
    })
  );
}
