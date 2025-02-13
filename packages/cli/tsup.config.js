const base = require('@teams.sdk/config/tsup.config');

/**
 * @type {import('tsup').Options}
 */
module.exports = {
  ...base,
  minify: true,
  bundle: true,
  entry: ['src/index.ts'],
};
