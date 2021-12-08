module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*main*',
    '!<rootDir>/src/__mocks__',
    '!<rootDir>/src/common/interfaces/*',
    '!<rootDir>/src/Templates/**',
    '!<rootDir>/src/Prompts/**',
    '!<rootDir>/src/**/index.ts'
  ]
};
