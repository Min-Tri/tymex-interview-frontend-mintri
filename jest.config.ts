import type { Config } from 'jest'
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './src',
})

const customJestConfig: Config = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
    '^@/hooks/(.*)$': '<rootDir>/hooks/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  collectCoverageFrom: [
    'components/**/*.{js,jsx,ts,tsx}',
    'hooks/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    'pages/**/*.{js,jsx,ts,tsx}',
    '!pages/_app.tsx',
    '!pages/_document.tsx',
  ],
  coverageThreshold: {
    global: {
      statements: 40,
      branches: 40,
      functions: 40,
      lines: 40,
    },
  },
}

module.exports = createJestConfig(customJestConfig)