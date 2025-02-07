const base = require('@teams.sdk/config/tsup.config');

/**
 * @type {import('tsup').Options}
 */
module.exports = {
  ...base,
  entry: ['src/index.ts'],
  tsconfig: 'tsconfig.node.json',
};
