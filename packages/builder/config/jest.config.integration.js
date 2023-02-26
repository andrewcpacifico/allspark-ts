module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['jest-extended', 'jest-chain'],
  moduleNameMapper: {
    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@rest/(.*)$': '<rootDir>/src/rest/$1',
  },
  rootDir: process.cwd(),
  testMatch: ['<rootDir>/tests/integration/**/*.test.ts'],
};
