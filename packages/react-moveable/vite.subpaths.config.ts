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
    emptyOutDir: false, // Don't clear directory - we're building multiple entries
    lib: {
      entry: {
        // Core entry point
        'core': resolve(__dirname, 'src/core.ts'),

        // Ables entry points
        'ables/index': resolve(__dirname, 'src/ables-exports/index.ts'),
        'ables/basic': resolve(__dirname, 'src/ables-exports/basic.ts'),
        'ables/advanced': resolve(__dirname, 'src/ables-exports/advanced.ts'),
        'ables/utils': resolve(__dirname, 'src/ables-exports/utils.ts'),
        'ables/visual': resolve(__dirname, 'src/ables-exports/visual.ts'),
      },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        const ext = format === 'es' ? 'js' : 'cjs';
        return `${entryName}.${ext}`;
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
        preset: "recommended",
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false,
      },
      onwarn(warning, warn) {
        // Suppress specific @daybrush/utils annotation warnings
        if (warning.code === 'SOURCEMAP_BROKEN' ||
            (warning.message && warning.message.includes('@daybrush/utils') && warning.message.includes('/*#__PURE__*/'))) {
          return;
        }
        warn(warning);
      },
    },
    sourcemap: true,
    target: 'es2020',
    minify: 'esbuild',
    chunkSizeWarningLimit: 1000,
  },
  resolve: {
    alias: {
      '@/stories': resolve(__dirname, 'stories'),
      '@/react-moveable': resolve(__dirname, 'src'),
    },
  },
  esbuild: {
    target: 'es2020',
    jsx: 'automatic',
  },
});