import fs from 'node:fs';
import path from 'node:path';

import { ObjectSchema } from '@teams.sdk/ai';

interface Args {
  readonly path: string;
}

export const schema: ObjectSchema = {
  type: 'object',
  properties: {
    path: {
      type: 'string',
      title: 'path',
      description: 'the path to the file to read'
    }
  },
  required: ['path']
};

export function handler(args: Args) {
  console.log('read-file', args.path);

  if (!fs.existsSync(path.join(process.cwd(), args.path))) {
    console.log('path not found');
    return 'error: path not found';
  }

  const stat = fs.statSync(path.join(process.cwd(), args.path));

  if (stat.isDirectory()) {
    console.log('cannot use "read-file" on a directory');
    return 'error: cannot use "read-file" on a directory';
  }

  const data = fs.readFileSync(path.join(process.cwd(), args.path));
  return data.toString();
}
