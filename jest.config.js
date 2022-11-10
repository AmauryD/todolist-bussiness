/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  testEnvironment: 'node',
};