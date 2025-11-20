export default {
  verbose: true,
  testEnvironment: 'jsdom',
  testMatch: [
    '**/test/**/*.test.[jt]s?(x)', // Match tests in the `uswds/test` directory
    '<rootDir>/../core/test/**/*.test.[jt]s?(x)', // Match tests in the `core/test` directory
    '<rootDir>/../snapshot-tests/src/**/*.test.[jt]s?(x)', // Match tests in the `snapshot-tests/src` directory
  ],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': ['babel-jest', { configFile: './babel.config.json' }],
  },
  transformIgnorePatterns: ['/node_modules/(?!(@rjsf|nanoid|@x0k)/)'],
  moduleNameMapper: {
    '^@rjsf/core/(.*)$': '<rootDir>/../core/src/$1',
    '^@rjsf/core$': '<rootDir>/../core/src',
    '^@rjsf/utils/(.*)$': '<rootDir>/../utils/src/$1',
    '^@rjsf/utils$': '<rootDir>/../utils/src',
    '^@rjsf/snapshot-tests/(.*)$': '<rootDir>/../snapshot-tests/src/$1',
    '^@rjsf/core/test/(.*)$': '<rootDir>/../core/test/$1', // Add mapping for core/test
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Ensure Jest setup file is included
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
  coveragePathIgnorePatterns: ['/node_modules/', '/test/'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/lib/'],
  passWithNoTests: true,
};
