import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

const createManualChunks = () => (id: string) => {
  // Core engine files
  if (id.includes('/MoveableManager.') ||
      id.includes('/InitialMoveable.') ||
      id.includes('/src/utils/') ||
      id.includes('/utilities.')) {
    return 'moveable-core';
  }

  // Essential ables (commonly used together)
  if (id.includes('/ables/Draggable.') ||
      id.includes('/ables/Resizable.') ||
      id.includes('/ables/Default.') ||
      id.includes('/ables/BeforeRenderable.') ||
      id.includes('/ables/Renderable.')) {
    return 'ables-basic';
  }

  // Advanced ables (optional features)
  if (id.includes('/ables/Warpable.') ||
      id.includes('/ables/Clippable.') ||
      id.includes('/ables/Rotatable.') ||
      id.includes('/ables/Scalable.')) {
    return 'ables-advanced';
  }

  // Utility ables
  if (id.includes('/ables/Snappable.') ||
      id.includes('/ables/Scrollable.') ||
      id.includes('/ables/Pinchable.') ||
      id.includes('/ables/DragArea.') ||
      id.includes('/ables/Clickable.') ||
      id.includes('/ables/snappable/')) {
    return 'ables-utils';
  }

  // Visual ables
  if (id.includes('/ables/Roundable.') ||
      id.includes('/ables/Origin.') ||
      id.includes('/ables/Padding.') ||
      id.includes('/ables/OriginDraggable.') ||
      id.includes('/ables/roundable/')) {
    return 'ables-visual';
  }

  // Group management ables
  if (id.includes('/ables/Groupable.') ||
      id.includes('/ables/IndividualGroupable.') ||
      id.includes('/ables/edgeDraggable.')) {
    return 'ables-group';
  }

  // Node modules
  if (id.includes('node_modules')) {
    return 'vendor';
  }
};

export default defineConfig(({ command, mode }) => {
  const isUmdBuild = process.env.BUILD_UMD === 'true';

  return {
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
      emptyOutDir: !isUmdBuild, // Don't clear directory for UMD build
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'Moveable',
        formats: isUmdBuild ? ['umd'] : ['es', 'cjs'],
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
          // Only apply manual chunks for ES and CJS, not UMD
          ...(isUmdBuild ? {} : { manualChunks: createManualChunks() }),
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
  };
});