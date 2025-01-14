const base = require('@teams.sdk/config/tsup.config');

module.exports = {
  ...base,
  entry: ['src/index.ts', 'src/**/index.ts'],
};
