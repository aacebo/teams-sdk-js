import { ChatPrompt } from '@teams.sdk/ai';
import { OpenAIChatModel } from '@teams.sdk/openai';

import { CopilotContext } from '../../context';

export function Typescript(ctx: CopilotContext) {
  return new ChatPrompt({
    role: 'user',
    instructions: [
      'you are an assistant that helps developers debug errors and lookup documentation on Typescript.',
    ].join('\n'),
    model: new OpenAIChatModel({
      model: 'o1-mini',
      apiKey: ctx.apiKey,
    })
  });
}
