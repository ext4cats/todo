// @ts-check

import js from '@eslint/js';
import reactDom from 'eslint-plugin-react-dom';
import reactHooks from 'eslint-plugin-react-hooks';
import reactX from 'eslint-plugin-react-x';
import globals from 'globals';
import * as path from 'node:path';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['**/build', '**/dist'] },
  {
    files: ['client/**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      reactDom.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactX.configs['recommended-typescript'],
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: path.resolve(import.meta.dirname, 'client'),
      },
    },
  },
  {
    files: ['server/**/*.ts'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: path.resolve(import.meta.dirname, 'server'),
      },
    },
  },
);
