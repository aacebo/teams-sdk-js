import fs from 'node:fs';
import npath from 'node:path';

import { CopilotContext } from '../../context';

export async function indexSource(path: string, ctx: CopilotContext) {
  const log = ctx.log.child('index');
  log.debug(path);

  if (!fs.existsSync(path)) {
    log.warn(`"${path}" not found`);
    return;
  }

  const stat = fs.statSync(path);

  if (stat.isDirectory()) {
    return await indexDir(path, ctx);
  }

  return await indexFile(path, ctx);
}

async function indexDir(path: string, ctx: CopilotContext) {
  const items = fs.readdirSync(path);

  for (const item of items) {
    const subPath = item.toString();

    if (subPath.includes('node_modules')) {
      continue;
    }

    await indexSource(npath.join(path, subPath), ctx);
  }

  fs.rmSync(path, {
    recursive: true,
    force: true
  });
}

async function indexFile(path: string, { log, stores, openai }: CopilotContext) {
  if (
    !npath.matchesGlob(path, '**/*.ts') &&
    !npath.matchesGlob(path, '**/*/src/**/*.md') &&
    !npath.matchesGlob(path, '**/*/package.json')
  ) return;

  try {
    let file = await stores.file.getOne(path);

    if (!file) {
      file = await stores.file.create({
        path,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    file.content = fs.readFileSync(path, { encoding: 'utf8' }).toString();

    try {
      const res = await openai.embeddings.create({
        input: file.content,
        model: 'text-embedding-3-small',
        encoding_format: 'float',
      });

      file.embedding = res.data[0].embedding;
      file = await stores.file.update(file);
    } catch (err) {
      await stores.file.delete(path);
      throw err;
    }
  } catch (err) {
    log.error(err);
  }
}
