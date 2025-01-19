import fs from 'node:fs';
import path from 'node:path';

import { ObjectSchema } from '@teams.sdk/ai';

interface Args {
  readonly path: string;
  readonly content: string;
}

export const schema: ObjectSchema = {
  type: 'object',
  properties: {
    path: {
      type: 'string',
      title: 'path',
      description: 'the path to the file to create'
    },
    content: {
      type: 'string',
      title: 'content',
      description: 'the content of the new file'
    }
  },
  required: ['path', 'content']
};

export function handler(args: Args) {
  console.log('write-file', args.path);
  fs.writeFileSync(path.join(process.cwd(), args.path), args.content);
  return 'file created';
}
