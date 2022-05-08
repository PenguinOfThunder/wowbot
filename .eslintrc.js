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
};
module.exports = config;