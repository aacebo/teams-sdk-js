const base = require('@teams.sdk/config/tsup.config');

/**
 * @type {import('tsup').Options}
 */
module.exports = {
  dts: true,
  minify: false,
  bundle: false,
  sourcemap: true,
  treeshake: true,
  splitting: true,
  clean: true,
  outDir: 'dist',
  format: ['cjs', 'esm'],
  entry: ['src/index.ts'],
  tsconfig: 'tsconfig.node.json',
};
