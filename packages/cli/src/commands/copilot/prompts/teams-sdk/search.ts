import os from 'node:os';
import path from 'node:path';

import { ObjectSchema } from '@teams.sdk/ai';

import { CopilotContext } from '../../context';
import { indexSource } from './index-source';
import { downloadSource } from './download-source';

interface Args {
  readonly text: string;
}

export const schema: ObjectSchema = {
  type: 'object',
  properties: {
    text: {
      type: 'string',
      title: 'text',
      description: 'the topic or subject to search for'
    }
  },
  required: ['text']
};

export function handler(ctx: CopilotContext) {
  const { log, config, openai, stores } = ctx;

  return async ({ text }: Args) => {
    log.debug(text);

    try {
      const res = await openai.embeddings.create({
        input: text,
        model: 'text-embedding-3-small',
        encoding_format: 'float'
      });

      // 50min
      if (!config.syncedAt || (new Date().getTime() - config.syncedAt.getTime()) > 3000000) {
        config.syncedAt = new Date();
        config.save();

        await downloadSource();
        await indexSource(path.join(
          os.homedir(),
          'teams-sdk',
          'teams-sdk-js-main',
        ), ctx);
      }

      const files = await stores.file.search(res.data[0].embedding);
      return files.map(file => [
        `# File (${file.path})`,
        file.content,
      ].join('\n')).join('\n');
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
