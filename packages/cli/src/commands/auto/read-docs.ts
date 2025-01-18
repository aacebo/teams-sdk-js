import { readGithub } from './read-github';

export async function handler() {
  console.log('read-docs');

  try {
    const res = await readGithub('/book/src', true);
    return res;
  } catch (err) {
    if (err instanceof Error) {
      return err.message;
    }

    return 'error: failed to read docs';
  }
}
