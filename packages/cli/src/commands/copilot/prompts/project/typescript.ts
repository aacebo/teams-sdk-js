import { ObjectSchema } from '@teams.sdk/ai';

import { CopilotContext } from '../../context';
import { Typescript } from '../typescript';

export const schema: ObjectSchema = {
  type: 'object',
  properties: {
    text: {
      type: 'string',
      title: 'text',
      description: 'the question you want to ask'
    }
  },
  required: ['text']
};

export function handler(ctx: CopilotContext) {
  const { log } = ctx;
  const prompt = Typescript(ctx);

  return async ({ text }: { text: string }) => {
    log.debug(text);

    try {
      return await prompt.chat(text);
    } catch (err) {
      if (err instanceof Error) {
        log.error(err.message);
        return err.message;
      }

      log.error(err);
      return 'an error occurred';
    }
  };
}
