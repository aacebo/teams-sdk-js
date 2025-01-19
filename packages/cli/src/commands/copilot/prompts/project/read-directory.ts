import fs from 'node:fs';
import path from 'node:path';

import { ObjectSchema } from '@teams.sdk/ai';

import { CopilotContext } from '../../context';

interface Args {
  readonly path: string;
}

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

export function handler({ log }: CopilotContext) {
  return (args: Args) => {
    log.debug(args.path);

    if (!fs.existsSync(path.join(process.cwd(), args.path))) {
      log.error('path not found');
      return 'error: path not found';
    }

    const stat = fs.statSync(path.join(process.cwd(), args.path));

    if (!stat.isDirectory()) {
      log.error('cannot use "read-directory" on a file');
      return 'error: cannot use "read-directory" on a file';
    }

    const items = fs.readdirSync(
      path.join(process.cwd(), args.path),
      { recursive: true }
    );

    const contents: { [key: string]: string } = { };

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
  };
}
