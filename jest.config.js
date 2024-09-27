module.exports = {
  collectCoverage: false,
  preset: 'ts-jest',
  rootDir: process.cwd(),
  setupFilesAfterEnv: ['jest-extended/all', 'jest-chain'],
  testEnvironment: 'node',
  testMatch: ['<rootDir>/test/**/*.spec.ts'],
};
