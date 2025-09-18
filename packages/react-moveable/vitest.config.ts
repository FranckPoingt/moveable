/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'test/',
        'stories/',
        'dist/',
        'declaration/',
        '**/*.d.ts',
        '**/*.config.*',
        'coverage/',
      ],
    },
  },
  resolve: {
    alias: {
      '@/stories': resolve(__dirname, 'stories'),
      '@/react-moveable': resolve(__dirname, 'src'),
      '@moveable/helper': resolve(__dirname, '../helper/src'),
    },
  },
});