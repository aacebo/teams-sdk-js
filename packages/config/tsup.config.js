/** @type {import('tsup').Config} */
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
};
