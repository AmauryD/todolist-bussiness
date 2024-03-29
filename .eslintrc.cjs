module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "unused-imports"],
  rules: {
    indent: "off",
    "@typescript-eslint/indent": ["error", "tab"],
    "unused-imports/no-unused-imports": "error",
    "@typescript-eslint/explicit-member-accessibility": "error",
    "@typescript-eslint/member-ordering": "error",
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
  },
};
