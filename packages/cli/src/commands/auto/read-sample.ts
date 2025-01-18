import { ObjectSchema } from '@teams.sdk/ai';

import { readGithub } from './read-github';

interface Args {
  readonly name: string;
}

export const schema: ObjectSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      title: 'name',
      description: 'the name of the sample to read',
      enum: ['auth', 'botbuilder', 'console', 'echo', 'lights']
    }
  },
  required: []
};

export async function handler({ name }: Args) {
  console.log('read-sample', name);

  try {
    const res = await readGithub(`/samples/${name}/src`, true);
    return res;
  } catch (err) {
    if (err instanceof Error) {
      return err.message;
    }

    return 'error: failed to get content';
  }
}
