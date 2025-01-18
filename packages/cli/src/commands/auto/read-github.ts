import { Octokit } from '@octokit/rest';

export type ValueOrObject<T> = T | { [key: string]: ValueOrObject<T> };
const octokit = new Octokit();

export async function readGithub(path: string, recursive = false): Promise<ValueOrObject<string | undefined>> {
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
          if (!recursive) {
            contents[item.path] = 'directory';
          }

          const res = await readGithub(item.path);

          if (res) {
            contents[item.path] = res;
          }
        }
      }

      return contents;
    }

    if (data.type === 'file') {
      if (data.encoding === 'base64') {
        return Buffer.from(data.content, 'base64').toString('utf-8');
      }

      return data.content;
    }
  } catch (err) {
    console.error(err);
  }
}
