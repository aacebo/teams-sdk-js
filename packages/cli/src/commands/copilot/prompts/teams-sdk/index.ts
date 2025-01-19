import { ChatPrompt } from '@teams.sdk/ai';
import { OpenAIChatModel } from '@teams.sdk/openai';
import OpenAI from 'openai';

import * as searchDocumentation from './search-documentation';

export function teamsSdk(apiKey: string) {
  const openai = new OpenAI({ apiKey });

  return new ChatPrompt({
    role: 'user',
    instructions: [
      'you are an assistant that helps developers learn and understand how to use the Teams SDK.',
      'the Teams SDK are a suite of packages in the namespace `@teams.sdk/*`.',
      'the Teams SDK packages exist to make bot/app/ai development simple, easy, and fun.'
    ].join('\n'),
    model: new OpenAIChatModel({
      model: 'gpt-4o',
      apiKey,
      temperature: 0
    })
  }).function(
    'search-documentation',
    'search the Teams SDK documentation',
    searchDocumentation.schema,
    searchDocumentation.handler(openai)
  );
}
