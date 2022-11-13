/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  testEnvironment: 'node',
};