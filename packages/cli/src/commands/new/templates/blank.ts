import fs from 'node:fs';
import path from 'node:path';

const tsconfig = {
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "module": "NodeNext",
    "target": "ESNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noImplicitAny": true,
    "declaration": true,
    "inlineSourceMap": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": false,
    "resolveJsonModule": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "pretty": true,
    "outDir": "dist",
    "rootDir": "src",
    "types": ["jest", "node"]
  }
};

const pkg = {
  "name": "app",
  "version": "0.0.0",
  "license": "MIT",
  "private": true,
  "main": "dist/index",
  "types": "dist/index",
  "scripts": {
    "clean": "npx rimraf ./dist",
    "build": "npx tsup",
    "start": "node .",
    "dev": "npx nodemon -w \"./src/**\" -e ts --exec \"node -r ts-node/register -r dotenv/config ./src/index.ts\""
  },
  "dependencies": {
    "@teams.sdk/api": "latest",
    "@teams.sdk/apps": "latest",
    "@teams.sdk/common": "latest",
    "@teams.sdk/dev": "latest",
    "@teams.sdk/devtools": "latest"
  },
  "devDependencies": {
    "@types/node": "^22.5.4",
    "dotenv": "^16.4.5",
    "nodemon": "^3.1.4",
    "rimraf": "^6.0.1",
    "ts-node": "^10.9.2",
    "tsup": "^8.2.4",
    "typescript": "^5.4.5"
  }
};

const code = `import { App, HttpPlugin } from '@teams.sdk/apps';
import { DevtoolsPlugin } from '@teams.sdk/dev';

const app = new App({
  plugins: [new DevtoolsPlugin(), new HttpPlugin()],
});

app.on('message', async ({ send, activity, next }) => {
  await send({ type: 'typing' });
  await send({
    type: 'message',
    text: \`you said "\${activity.text}"\`,
  });

  return next();
});

(async () => {
  await app.start();
})();`;

const tsup = `/** @type {import('tsup').Options} */
module.exports = {
  dts: true,
  minify: true,
  sourcemap: true,
  treeshake: true,
  splitting: true,
  clean: true,
  outDir: 'dist',
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
};`;

export function blank(name: string) {
  const pkgJson = { ...pkg };
  pkgJson.name = name;

  fs.writeFileSync(path.join(process.cwd(), name, 'package.json'), JSON.stringify(pkgJson, null, 2), 'utf-8');
  fs.writeFileSync(path.join(process.cwd(), name, 'src', 'index.ts'), code, 'utf-8');
  fs.writeFileSync(path.join(process.cwd(), name, 'tsconfig.json'), JSON.stringify(tsconfig, null, 2), 'utf-8');
  fs.writeFileSync(path.join(process.cwd(), name, 'tsup.config.js'), tsup, 'utf-8');
}
