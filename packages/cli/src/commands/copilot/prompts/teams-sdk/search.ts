import { ObjectSchema } from '@teams.sdk/ai';

import { CopilotContext } from '../../context';
import { Crawler } from '../../../../crawler';

interface Args {
  readonly text: string;
}

export const schema: ObjectSchema = {
  type: 'object',
  properties: {
    text: {
      type: 'string',
      title: 'text',
      description: 'the topic or subject to search for',
    },
  },
  required: ['text'],
};

export function handler(ctx: CopilotContext) {
  const { log, openai, stores, config } = ctx;
  const crawler = new Crawler(log, openai, stores);

  return async ({ text }: Args) => {
    log.debug(text);

    try {
      // 50min
      if (!config.syncedAt || new Date().getTime() - config.syncedAt.getTime() > 3000000) {
        console.log('please wait while I refresh my memory...');
        config.syncedAt = new Date();
        config.save();
        await crawler.start();
      }

      const res = await openai.embeddings.create({
        input: text,
        model: 'text-embedding-3-small',
        encoding_format: 'float',
      });

      const files = await stores.file.search(res.data[0].embedding);
      return files.map((file) => [`# File (${file.path})`, file.content].join('\n')).join('\n');
    } catch (err) {
      if (err instanceof Error) {
        log.debug(err.message);
        return err.message;
      }

      log.debug(err);
      return 'an error occurred';
    }
  };
}
