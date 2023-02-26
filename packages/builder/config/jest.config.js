module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/domain/**/*.ts',
    '!<rootDir>/src/domain/entities/**/*.ts',
    '!**/index.ts',
  ],
  coverageProvider: 'v8',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  moduleNameMapper: {
    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@rest/(.*)$': '<rootDir>/src/rest/$1',
  },
  preset: 'ts-jest',
  rootDir: process.cwd(),
  setupFilesAfterEnv: ['jest-extended', 'jest-chain'],
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/unit/**/*.test.ts'],
};
