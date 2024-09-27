module.exports = {
  collectCoverage: false,
  preset: 'ts-jest',
  rootDir: process.cwd(),
  setupFilesAfterEnv: [],
  testEnvironment: 'node',
  testMatch: ['<rootDir>/test/**/*.spec.ts'],
};
