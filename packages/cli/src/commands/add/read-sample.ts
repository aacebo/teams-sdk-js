import { Octokit } from '@octokit/rest';

import { ObjectSchema } from '@teams.sdk/ai';

interface Args {
  readonly name: string;
}

const octokit = new Octokit();

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
    const res = await read(`/samples/${name}/src`);
    return res;
  } catch (err) {
    if (err instanceof Error) {
      return err.message;
    }

    return 'error: failed to get content';
  }
}

type ValueOrObject<T> = T | { [key: string]: ValueOrObject<T> };

async function read(path: string): Promise<ValueOrObject<string | undefined>> {
  try {
    const { data } = await octokit.repos.getContent({
      owner: 'aacebo',
      repo: 'teams-sdk-js',
      path,
    });

    if (Array.isArray(data)) {
      const contents: { [key: string]: ValueOrObject<string | undefined> } = { };

      for (const item of data) {
        if (
          item.type === 'submodule' ||
          item.type === 'symlink'
        ) continue;

        if (item.content) {
          contents[item.path] = item.content;
        } else {
          const res = await read(item.path);

          if (res) {
            contents[item.path] = res;
          }
        }
      }

      return contents;
    }

    if (data.type === 'file') {
      return data.content;
    }
  } catch (err) {
    console.error(err);
  }
}
