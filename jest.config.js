const esmModules = ["@triptyk/nfw-core"];

/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest/presets/default-esm",
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transformIgnorePatterns: [
    `<rootDir>/node_modules/.pnpm/(?!(${esmModules.join("|")})@)`,
  ],
  transform: {
    "^.+\\.(t|j)sx?$": ["ts-jest"],
  },
  testMatch: ["<rootDir>/packages/*/__tests__/**/*.test.ts"],
  testEnvironment: "node",
};
