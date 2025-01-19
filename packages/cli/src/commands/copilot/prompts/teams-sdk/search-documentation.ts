import { ObjectSchema } from '@teams.sdk/ai';
import OpenAI from 'openai';

import { storage } from '../../../../storage';
import { indexRepository } from './index-repository';

interface Args {
  readonly text: string;
}

const stores = storage();

export const schema: ObjectSchema = {
  type: 'object',
  properties: {
    path: {
      type: 'string',
      title: 'text',
      description: 'the topic or thing to search for'
    }
  },
  required: ['text']
};

export function handler(openai: OpenAI) {
  return async ({ text }: Args) => {
    console.log('search-documentation');

    try {
      let repository = await stores.repository.getOne('aacebo', 'teams-sdk-js');

      if (!repository) {
        repository = await stores.repository.create({
          owner: 'aacebo',
          name: 'teams-sdk-js',
          created_at: new Date(),
          updated_at: new Date(),
        });

        await indexRepository('aacebo', 'teams-sdk-js', '/book/src', async (text) => {
          return await openai.embeddings.create({
            input: text,
            model: 'text-embedding-3-small'
          }).then(res => res.data.map(d => d.embedding));
        });

        repository = await stores.repository.update(repository);
      }

      const files = await stores.file.search('aacebo', 'teams-sdk-js', text);
      return files.map(file => file.content || '').join('\n');
    } catch (err) {
      if (err instanceof Error) {
        return err.message;
      }

      return 'an error occurred';
    }
  };
}
