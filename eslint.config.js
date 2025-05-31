// eslint.config.js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  importPlugin.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      import: importPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      'import/no-default-export': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'import/order': ['warn', { alphabetize: { order: 'asc', caseInsensitive: true } }],
      'prettier/prettier': 'warn',
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: ['tsconfig.base.json', 'apps/*/tsconfig.json', 'packages/*/tsconfig.json'],
        },
      },
    },
    ignores: ['dist', 'node_modules', '.turbo'],
    prettierConfig,
  },
];
