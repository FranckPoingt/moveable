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
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        HTMLElement: 'readonly',
        SVGElement: 'readonly',
        Element: 'readonly',
        Node: 'readonly',
        Event: 'readonly',
        EventTarget: 'readonly',
        MouseEvent: 'readonly',
        TouchEvent: 'readonly',
        KeyboardEvent: 'readonly',
        CSSStyleDeclaration: 'readonly',
        ResizeObserver: 'readonly',
        MutationObserver: 'readonly',
        FrameRequestCallback: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
        SVGSVGElement: 'readonly',
        HTMLMediaElementEventMap: 'readonly',
        HTMLBodyElementEventMap: 'readonly',
        ElementEventMap: 'readonly',
        HTMLElementEventMap: 'readonly',
        SVGElementEventMap: 'readonly',
        Window: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      'react': react,
      'import': importPlugin,
    },
    rules: {
      // Core ESLint rules
      'no-console': 'warn',
      'no-unused-vars': 'off',
      'no-undef': 'off', // TypeScript handles this
      'no-redeclare': 'off', // TypeScript handles this
      'max-len': [
        'warn',
        {
          code: 120,
          comments: 400,
          ignoreTemplateLiterals: true,
          ignorePattern: '^\\s*type\\s.+=\\s*',
        },
      ],
      'arrow-parens': 'off',
      'comma-dangle': ['warn', 'always-multiline'],
      'semi': ['warn', 'always'],

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
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      'indent': ['warn', 4],
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