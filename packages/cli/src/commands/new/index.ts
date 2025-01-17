import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import cp from 'node:child_process';

import { CommandModule } from 'yargs';

interface Args {
  readonly name: string;
  readonly template: string;
}

export const New: CommandModule<{}, Args> = {
  command: 'new <name>',
  aliases: 'n',
  describe: 'create a new app project',
  builder: (b) => {
    return b.positional('name', {
      alias: 'n',
      type: 'string',
      describe: 'the apps name',
      demandOption: true,
      coerce: (name: string) => {
        return name.trim()
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/^[._]/, '')
          .replace(/[^a-z\d\-~]+/g, '-');
      }
    }).check(({ name }) => {
      if (fs.existsSync(path.join(process.cwd(), name))) {
        throw new Error(`"${name}" already exists!`);
      }

      if (!(/^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(name))) {
        throw new Error(`"${name}" is not a valid package name`);
      }

      return true;
    }).option('template', {
      alias: 't',
      type: 'string',
      describe: 'the app template to use',
      default: 'echo-ts',
      choices: fs.readdirSync(path.resolve(
        url.fileURLToPath(import.meta.url),
        '../..',
        'templates'
      ))
    });
  },
  handler: async ({ name, template }) => {
    const projectDir = path.join(process.cwd(), name);
    const templateDir = path.resolve(
      url.fileURLToPath(import.meta.url),
      '../..',
      'templates',
      template,
    );

    const write = (file: string, content?: string) => {
      const targetPath = path.join(projectDir, file);

      if (content) {
        return fs.writeFileSync(targetPath, content);
      }

      copy(path.join(templateDir, file), targetPath);
    };

    const files = fs.readdirSync(templateDir);

    for (const file of files.filter((f) => f !== 'package.json')) {
      write(file);
    }

    const pkg = JSON.parse(
      fs.readFileSync(path.join(templateDir, `package.json`), 'utf-8'),
    );

    pkg.name = name;
    write('package.json', JSON.stringify(pkg, null, 2) + '\n');

    console.log(`cd ${name} && npm install && npm run dev`);
    cp.spawnSync(`cd ${name} && npm install && npm run dev`, {
      stdio: 'inherit',
      shell: true,
    });
  }
};

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
