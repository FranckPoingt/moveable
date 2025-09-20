import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import { readdirSync } from 'fs';

// Get all able files dynamically
function getAbleFiles() {
  const ablesDir = resolve(__dirname, 'src/ables');
  const files = readdirSync(ablesDir);

  const ableEntries: Record<string, string> = {};

  files.forEach(file => {
    if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      const name = file.replace(/\.(ts|tsx)$/, '');
      // Skip directories and index files
      if (name !== 'index' && name !== 'consts' && !name.includes('.')) {
        ableEntries[`ables/${name}`] = resolve(ablesDir, file);
      }
    }
  });

  return ableEntries;
}

// Create micro-bundles configuration
export default defineConfig(({ command, mode }) => {
  const ableEntries = getAbleFiles();

  return {
    plugins: [
      react(),
      dts({
        include: ['src/**/*'],
        exclude: ['stories/**/*', 'test/**/*'],
        outDir: 'dist/declaration',
        insertTypesEntry: true,
        rollupTypes: false,
      }),
    ],
    build: {
      emptyOutDir: false, // Don't clear the main build output
      outDir: 'dist/micro',
      lib: {
        entry: {
          // Core entries
          'core': resolve(__dirname, 'src/core.ts'),
          'factory': resolve(__dirname, 'src/MoveableFactory.ts'),
          'dynamic': resolve(__dirname, 'src/DynamicMoveable.tsx'),
          'dynamic-loader': resolve(__dirname, 'src/ables/DynamicAbleLoader.ts'),

          // Individual ables
          ...ableEntries,

          // Preset bundles
          'presets/basic': resolve(__dirname, 'src/presets/basic.ts'),
          'presets/advanced': resolve(__dirname, 'src/presets/advanced.ts'),
          'presets/full': resolve(__dirname, 'src/presets/full.ts'),
        },
        formats: ['es', 'cjs'],
        fileName: (format, entryName) => {
          const ext = format === 'es' ? 'js' : 'cjs';
          return `${entryName}.${ext}`;
        },
      },
      rollupOptions: {
        external: [
          'react',
          'react-dom',
          // Mark other ables as external for individual bundles
          /^\.\.?\//,  // Relative imports
          /^@\//,      // Alias imports
        ],
        output: {
          exports: 'named',
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
          // Preserve module structure for better tree-shaking
          preserveModules: false,
          // Each file gets its own chunk
          manualChunks: undefined,
        },
        treeshake: {
          preset: "recommended",
          moduleSideEffects: false,
          propertyReadSideEffects: false,
          unknownGlobalSideEffects: false,
        },
      },
      sourcemap: true,
      target: 'es2020',
      minify: 'esbuild',
      chunkSizeWarningLimit: 100, // Lower threshold for micro-bundles
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
  };
});