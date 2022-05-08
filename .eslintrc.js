const config = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsConfigRootDir: __dirname,
    project: "./tsconfig.json"
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  ignorePatterns: [
    ".eslintrc.js"
  ],
  rules: {
    "@typescript-eslint/no-empty-interface": 1
  }
};
module.exports = config;
