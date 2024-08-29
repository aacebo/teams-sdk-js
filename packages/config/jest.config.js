/** @type {import('jest').Config} */
module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  collectCoverage: true,
  preset: 'ts-jest',
  coverageDirectory: 'coverage',
  passWithNoTests: true,
  collectCoverageFrom: [
    '**/*.ts',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/testing/**',
    '!**/index.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  testEnvironment: 'node',
  silent: false,
  verbose: true,
};
