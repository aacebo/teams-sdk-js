import fs from 'node:fs';
import path from 'node:path';

export function write(from: string, to: string, file: string, content?: string) {
  const fromPath = path.join(from, file);
  const toPath = path.join(to, file);

  if (content) {
    return fs.writeFileSync(toPath, content);
  }

  copy(fromPath, toPath);
}

function copy(src: string, dest: string) {
  const stat = fs.statSync(src);

  if (stat.isDirectory()) {
    return copyDir(src, dest);
  }

  fs.copyFileSync(src, dest);
}

function copyDir(srcDir: string, destDir: string) {
  fs.mkdirSync(destDir, { recursive: true });

  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    copy(srcFile, destFile);
  }
}
