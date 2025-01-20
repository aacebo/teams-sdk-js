import fs from 'node:fs';
import path from 'node:path';

import { ObjectSchema } from '@teams.sdk/ai';

import { CopilotContext } from '../../context';

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

export function handler({ log }: CopilotContext) {
  return (args: Args) => {
    log.debug(args.path);

    fs.writeFileSync(path.join(process.cwd(), args.path), args.content, {
      encoding: 'utf8'
    });

    return 'file created';
  };
}
