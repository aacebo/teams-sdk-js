import npath from 'node:path';
import { Octokit } from '@octokit/rest';

import { storage } from '../../../../storage';

export type ValueOrObject<T> = T | { [key: string]: ValueOrObject<T> };

const octokit = new Octokit();
const stores = storage();

export async function indexRepository(
  owner: string,
  name: string,
  path: string,
  embed: (text: string) => Promise<Array<Array<number>>>,
) {
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

        await indexRepository(
          owner,
          name,
          npath.join(path, item.path),
          embed
        );
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

      if (data.encoding === 'base64') {
        file.content = Buffer.from(data.content, 'base64').toString('utf-8');
        file.embedding = await embed(file.content);
      }

      file = await stores.file.update(file);
    }
  } catch (err) {
    console.error(err);
  }
}
