const base = require('@teams/config/tsup.config');

module.exports = {
  ...base,
  entry: ['src/index.ts', 'src/**/index.ts'],
};
