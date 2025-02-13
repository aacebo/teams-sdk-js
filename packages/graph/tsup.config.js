/** @type {import('tsup').Options} */
module.exports = {
  ...require('@teams.sdk/config/tsup.config'),
  minify: true,
  bundle: true,
  sourcemap: 'inline',
  entry: ['src/index.ts'],
};
