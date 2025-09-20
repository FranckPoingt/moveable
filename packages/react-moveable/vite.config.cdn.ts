import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// CDN-optimized configuration for better caching and chunk reuse
export default defineConfig(({ command, mode }) => {
  return {
    plugins: [react()],
    build: {
      outDir: 'dist/cdn',
      emptyOutDir: true,
      lib: {
        entry: {
          // Core bundle - most cacheable
          'moveable-core': resolve(__dirname, 'src/core.ts'),

          // Vendor dependencies - highly cacheable (excluding React)
          'vendor-utils': resolve(__dirname, 'src/vendor-utils.ts'),

          // Able bundles by frequency of use (for optimal CDN caching)
          'ables-essential': resolve(__dirname, 'src/bundles/essential.ts'), // Most used
          'ables-common': resolve(__dirname, 'src/bundles/common.ts'),       // Commonly used
          'ables-advanced': resolve(__dirname, 'src/bundles/advanced.ts'),   // Advanced features
          'ables-utils': resolve(__dirname, 'src/bundles/utils.ts'),         // Utility features
          'ables-visual': resolve(__dirname, 'src/bundles/visual.ts'),       // Visual enhancements
          'ables-group': resolve(__dirname, 'src/bundles/group.ts'),         // Group features

          // Complete bundle for simple loading
          'moveable-complete': resolve(__dirname, 'src/index.ts'),
        },
        formats: ['es', 'iife'],
        fileName: (format, entryName) => {
          const ext = format === 'es' ? 'esm.js' : 'min.js';
          return `${entryName}.${ext}`;
        },
      },
      rollupOptions: {
        external: ['react', 'react-dom'], // Keep React external even for CDN
        output: {
          // Optimize for CDN caching
          chunkFileNames: (chunkInfo) => {
            // Hash-based naming for optimal caching
            const hash = chunkInfo.facadeModuleId ?
              require('crypto').createHash('md5').update(chunkInfo.facadeModuleId).digest('hex').slice(0, 8) :
              'chunk';
            return `chunks/[name]-${hash}.[hash].js`;
          },
          entryFileNames: '[name].[hash].js',

          // Manual chunks for optimal CDN performance
          manualChunks: {
            // Vendor chunks (rarely change - high cache value)
            'vendor-motion': ['@scena/event-emitter', 'framework-utils'],
            'vendor-geometry': ['@scena/matrix', 'gesto'],

            // Utility chunks (moderate cache value)
            'utils-dom': ['@daybrush/utils', '@egjs/agent'],
            'utils-css': ['css-styled', 'react-css-styled'],

            // Feature chunks (organized by usage patterns)
            'features-transform': [
              './src/ables/Draggable',
              './src/ables/Resizable',
              './src/ables/Rotatable',
              './src/ables/Scalable'
            ],
            'features-advanced': [
              './src/ables/Warpable',
              './src/ables/Clippable'
            ],
            'features-utility': [
              './src/ables/Snappable',
              './src/ables/Scrollable',
              './src/ables/Pinchable'
            ],
            'features-visual': [
              './src/ables/Roundable',
              './src/ables/Origin',
              './src/ables/Padding'
            ],
            'features-interaction': [
              './src/ables/Clickable',
              './src/ables/DragArea'
            ],
            'features-group': [
              './src/ables/Groupable',
              './src/ables/IndividualGroupable'
            ]
          },

          // Global variables for IIFE builds
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },

          // Optimize for compression
          compact: true,
          generatedCode: 'es2015',
        },
        treeshake: {
          preset: "recommended",
          moduleSideEffects: false,
          propertyReadSideEffects: false,
          unknownGlobalSideEffects: false,
        },
      },
      target: 'es2020',
      minify: 'terser', // Better compression for CDN
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug'],
        },
        mangle: {
          safari10: true,
        },
        format: {
          comments: false,
        },
      },
      sourcemap: false, // Reduce CDN bandwidth
      chunkSizeWarningLimit: 500,

      // Optimize for CDN delivery
      assetsInlineLimit: 0, // Don't inline assets for CDN
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
      legalComments: 'none',
    },
  };
});