import { Octokit } from '@octokit/rest';

import { CopilotContext } from '../../context';

export type ValueOrObject<T> = T | { [key: string]: ValueOrObject<T> };
const octokit = new Octokit();

export function indexRepository(ctx: CopilotContext) {
  const { stores, openai } = ctx;
  const index = indexRepository(ctx);

  return async (owner: string, name: string, path: string) => {
    console.log('index', `${owner} => ${name} => ${path}`);

    try {
      const { data } = await octokit.repos.getContent({
        owner,
        repo: name,
        path,
      });

      if (Array.isArray(data)) {
        for (const item of data) {
          if (
            item.type === 'submodule' ||
            item.type === 'symlink'
          ) continue;

          await index(owner, name, item.path);
        }

        return;
      }

      if (data.type === 'file') {
        let file = await stores.file.getOne(owner, name, path);

        if (!file) {
          file = await stores.file.create({
            repo_owner: owner,
            repo_name: name,
            path,
            created_at: new Date(),
            updated_at: new Date(),
          });
        }

        file.content = data.content;

        if (data.encoding === 'base64') {
          file.content = Buffer.from(data.content, 'base64').toString('utf-8');

          const res = await openai.embeddings.create({
            input: file.content,
            model: 'text-embedding-3-small',
            encoding_format: 'float',
          });

          file.embedding = res.data[0].embedding;
        }

        file = await stores.file.update(file);
      }
    } catch (err) {
      console.error(err);
    }
  };
}
