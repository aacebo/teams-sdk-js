import fs from 'node:fs';
import path from 'node:path';

import { ObjectSchema } from '@teams.sdk/ai';

interface Args {
  readonly path: string;
}

type ValueOrObject<T> = T | {
  [key: string]: ValueOrObject<T>;
};

export const schema: ObjectSchema = {
  type: 'object',
  properties: {
    path: {
      type: 'string',
      title: 'path',
      description: 'the path to the directory'
    }
  },
  required: ['path']
};

export function handler(args: Args) {
  console.log('read-project-directory', args.path);

  if (!fs.existsSync(path.join(process.cwd(), args.path))) {
    console.log('path not found');
    return 'error: path not found';
  }

  const stat = fs.statSync(path.join(process.cwd(), args.path));

  if (!stat.isDirectory()) {
    console.log('cannot use "read-project-directory" on a file');
    return 'error: cannot use "read-project-directory" on a file';
  }

  const items = fs.readdirSync(
    path.join(process.cwd(), args.path),
    { recursive: true }
  );

  const contents: { [key: string]: ValueOrObject<string> } = { };

  for (const item of items) {
    const subPath = item.toString();

    if (
      subPath.includes('node_modules') ||
      subPath.includes('-lock.json')
    ) continue;

    const stat = fs.statSync(path.join(
      process.cwd(),
      args.path,
      subPath
    ));

    contents[subPath] = stat.isFile() ? 'file' : 'directory';
  }

  return contents;
}
