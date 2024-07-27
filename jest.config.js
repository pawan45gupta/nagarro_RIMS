module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/contexts/(.*)$': '<rootDir>/src/contexts/$1',
    '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
    '^next/router$': '<rootDir>/__mocks__/next/router.js',
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
};
