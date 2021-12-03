module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*main*',
    '!<rootDir>/node_modules/',
    '!<rootDir>/src/__mocks__',
    '!<rootDir>/src/common/interfaces/*',
    '!<rootDir>/bin/*'
  ]
};
