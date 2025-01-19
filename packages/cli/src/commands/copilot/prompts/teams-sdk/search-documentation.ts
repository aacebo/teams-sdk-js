import { ObjectSchema } from '@teams.sdk/ai';

import { CopilotContext } from '../../context';
import { indexRepository } from './index-repository';

interface Args {
  readonly text: string;
}

export const schema: ObjectSchema = {
  type: 'object',
  properties: {
    text: {
      type: 'string',
      title: 'text',
      description: 'the topic or thing to search for'
    }
  },
  required: ['text']
};

export function handler(ctx: CopilotContext) {
  const { stores, openai } = ctx;

  return async ({ text }: Args) => {
    console.log('search-documentation', text);

    try {
      const embedding = await openai.embeddings.create({
        input: text,
        model: 'text-embedding-3-small',
        encoding_format: 'float'
      });

      let repository = await stores.repository.getOne('aacebo', 'teams-sdk-js');

      if (!repository) {
        repository = await stores.repository.create({
          owner: 'aacebo',
          name: 'teams-sdk-js',
          created_at: new Date(),
          updated_at: new Date(),
        });

        await indexRepository(ctx)('aacebo', 'teams-sdk-js', '/book/src');
        repository = await stores.repository.update(repository);
      }

      const files = await stores.file.search(
        'aacebo',
        'teams-sdk-js',
        embedding.data[0].embedding,
      );

      return files.map(file => file.content || '').join('\n');
    } catch (err) {
      console.error(err);

      if (err instanceof Error) {
        return err.message;
      }

      return 'an error occurred';
    }
  };
}
