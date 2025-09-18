import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src/**/*'],
      exclude: ['stories/**/*', 'test/**/*'],
      outDir: 'declaration',
      insertTypesEntry: true,
      rollupTypes: false,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Moveable',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => {
        if (format === 'es') return `moveable.esm.js`;
        if (format === 'cjs') return `moveable.cjs.js`;
        return `moveable.umd.js`;
      },
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false,
      },
    },
    sourcemap: true,
    target: 'es2015',
    minify: false,
    chunkSizeWarningLimit: 1000,
  },
  resolve: {
    alias: {
      '@/stories': resolve(__dirname, 'stories'),
      '@/react-moveable': resolve(__dirname, 'src'),
    },
  },
  esbuild: {
    target: 'es2015',
    jsx: 'automatic',
  },
});