import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      'react': react,
      'import': importPlugin,
    },
    rules: {
      // Core ESLint rules
      'no-console': 'error',
      'no-unused-vars': 'off',
      'max-len': [
        'error',
        {
          code: 120,
          comments: 400,
          ignoreTemplateLiterals: true,
          ignorePattern: '^\\s*type\\s.+=\\s*',
        },
      ],
      'arrow-parens': 'off',
      'comma-dangle': ['error', 'always-multiline'],
      'semi': ['error', 'always'],

      // TypeScript ESLint rules
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-this-alias': 'off',
      '@typescript-eslint/no-inferrable-types': [
        'error',
        {
          ignoreParameters: true,
          ignoreProperties: false,
        },
      ],
      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/indent': ['error', 4],
      '@typescript-eslint/adjacent-overload-signatures': 'off',

      // Import rules
      'import/no-webpack-loader-syntax': 'off',

      // React rules
      'react/react-in-jsx-scope': 'off', // Not needed with modern React
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
    },
  },
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      'demo/**',
      '**/*.d.ts',
      'packages/*/declaration/**',
      'storybook-static/**',
    ],
  },
];