# Bundle Optimization Plan for Moveable.js

_Comprehensive strategy to reduce bundle size and improve tree-shaking - September 2025_

## 📊 Current State Analysis

- **Bundle Size**: 336KB ESM (230KB CJS)
- **Architecture**: Monolithic - all 17+ ables bundled together
- **Tree-shaking**: Basic support but limited by current structure
- **Problem**: Users load entire library even for simple drag/resize operations

## 🎯 Bundle Optimization Strategy

### 1. **Able-Based Code Splitting** 🔥 **High Impact**

**Current Problem**:
```typescript
// Everything bundled regardless of usage
import Moveable from 'react-moveable'; // 336KB
```

**Optimized Solution**:
```typescript
// Cherry-pick ables for specific use cases
import { makeMoveable, Draggable, Resizable } from 'react-moveable/ables';
const CustomMoveable = makeMoveable([Draggable, Resizable]); // ~80KB (75% reduction)
```

### 2. **Enhanced Vite Configuration** ⚡ **Medium Impact**

**Update vite.config.ts with advanced chunking**:

```typescript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core engine (always needed)
          'moveable-core': [
            './src/MoveableManager',
            './src/InitialMoveable',
            './src/utilities'
          ],

          // Essential ables (commonly used together)
          'ables-basic': [
            './src/ables/Draggable',
            './src/ables/Resizable',
            './src/ables/Default'
          ],

          // Advanced ables (optional features)
          'ables-advanced': [
            './src/ables/Warpable',
            './src/ables/Clippable',
            './src/ables/Rotatable'
          ],

          // Utility ables
          'ables-utils': [
            './src/ables/Snappable',
            './src/ables/Scrollable',
            './src/ables/Pinchable'
          ],

          // Visual ables
          'ables-visual': [
            './src/ables/Roundable',
            './src/ables/Origin',
            './src/ables/Padding'
          ]
        },
      },
      treeshake: {
        preset: "recommended",
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false,
      },
    },
    target: 'es2020',
    minify: 'esbuild',
    sourcemap: true,
  },
});
```

### 3. **Subpath Exports Strategy** 📦 **High Impact**

**Enhanced package.json exports**:

```json
{
  "exports": {
    ".": {
      "import": "./dist/moveable.esm.js",
      "require": "./dist/moveable.cjs.js",
      "types": "./declaration/index.d.ts"
    },
    "./core": {
      "import": "./dist/core.js",
      "require": "./dist/core.cjs",
      "types": "./declaration/core.d.ts"
    },
    "./ables": {
      "import": "./dist/ables/index.js",
      "require": "./dist/ables/index.cjs",
      "types": "./declaration/ables/index.d.ts"
    },
    "./ables/basic": {
      "import": "./dist/ables/basic.js",
      "require": "./dist/ables/basic.cjs",
      "types": "./declaration/ables/basic.d.ts"
    },
    "./ables/advanced": {
      "import": "./dist/ables/advanced.js",
      "require": "./dist/ables/advanced.cjs",
      "types": "./declaration/ables/advanced.d.ts"
    },
    "./ables/*": {
      "import": "./dist/ables/*.js",
      "require": "./dist/ables/*.cjs",
      "types": "./declaration/ables/*.d.ts"
    }
  }
}
```

**Usage Examples**:

```typescript
// Basic usage (drag + resize only)
import { makeMoveable, Draggable, Resizable } from 'react-moveable/ables/basic';
const MoveDragResize = makeMoveable([Draggable, Resizable]); // ~80KB

// Advanced usage
import { Warpable, Clippable } from 'react-moveable/ables/advanced';
import { makeMoveable } from 'react-moveable/core';
const MoveAdvanced = makeMoveable([Warpable, Clippable]); // ~120KB

// Individual ables
import { Draggable } from 'react-moveable/ables/Draggable';
const MoveDragOnly = makeMoveable([Draggable]); // ~60KB

// Full library (backward compatibility)
import Moveable from 'react-moveable'; // 336KB (unchanged)
```

### 4. **Bundle Analysis & Monitoring** 📈 **Medium Impact**

**Add to package.json**:

```json
{
  "scripts": {
    "analyze": "vite-bundle-analyzer dist/",
    "size-limit": "size-limit",
    "build:analyze": "npm run build && npm run analyze",
    "build:size": "npm run build && bundlesize"
  },
  "devDependencies": {
    "vite-bundle-analyzer": "^0.7.0",
    "size-limit": "^8.2.0",
    "@size-limit/preset-small-lib": "^8.2.0",
    "bundlesize": "^0.18.0"
  },
  "bundlesize": [
    {
      "path": "./dist/moveable.esm.js",
      "maxSize": "350kb"
    },
    {
      "path": "./dist/ables/basic.js",
      "maxSize": "100kb"
    }
  ]
}
```

### 5. **Dead Code Elimination** 🧹 **Low-Medium Impact**

- **Audit utils directory**: Remove unused utility functions
- **Optimize imports**: Replace `import *` with named imports throughout codebase
- **Modern JS patterns**: Use `??` instead of `||` for better minification
- **Remove development-only code**: Ensure dev helpers are tree-shaken in production

## 🚀 Implementation Plan

### **Phase 1: Foundation** (Immediate - 2-3 days)

#### Priority Tasks:
1. **Enhanced Vite config** with manual chunks
2. **Bundle analyzer setup** for size monitoring
3. **Size regression testing** in CI pipeline
4. **Baseline measurements** of current bundle composition

#### Deliverables:
- [ ] Updated `vite.config.ts` with manual chunks
- [ ] Bundle analysis scripts in package.json
- [ ] CI integration for size monitoring
- [ ] Documentation of current bundle breakdown

### **Phase 2: Architecture** (1-2 weeks)

#### Priority Tasks:
1. **Subpath exports** implementation in package.json
2. **Core/ables separation** - refactor entry points
3. **Able grouping** - create basic/advanced/utils bundles
4. **TypeScript declarations** for new export paths

#### Deliverables:
- [ ] New export structure in package.json
- [ ] Separate entry points for ables categories
- [ ] Updated TypeScript configs for multi-entry builds
- [ ] Migration guide for new import patterns

### **Phase 3: Advanced Optimization** (Future)

#### Priority Tasks:
1. **Dynamic imports** for on-demand able loading
2. **Micro-bundle strategy** for individual ables
3. **CDN-optimized** chunking strategy
4. **Lazy loading** documentation and examples

#### Deliverables:
- [ ] Dynamic import system for ables
- [ ] Individual able bundles
- [ ] CDN distribution strategy
- [ ] Performance benchmarks

## 📈 Expected Results

### Bundle Size Reductions:

| Use Case | Current | Optimized | Reduction |
|----------|---------|-----------|-----------|
| **Basic (drag + resize)** | 336KB | 60-80KB | **75%** |
| **Advanced (warp + clip)** | 336KB | 150-200KB | **40%** |
| **Single able (drag only)** | 336KB | 40-60KB | **82%** |
| **Full featured** | 336KB | 336KB* | Better caching |

*_Same size but improved caching through chunking_

### Performance Improvements:

- **Initial load**: 75% faster for basic usage
- **Caching**: Better chunk reuse across applications
- **Tree-shaking**: More effective with granular exports
- **Development**: Faster builds with targeted bundles

## 📋 Success Metrics

### Size Targets:
- **Basic bundle**: < 100KB (currently 336KB)
- **Core engine**: < 50KB
- **Individual ables**: < 30KB each
- **Advanced features**: < 200KB

### Performance Targets:
- **Build time**: No regression (maintain current speed)
- **Tree-shaking effectiveness**: >80% unused code elimination
- **Chunk optimization**: <5 chunks for typical usage
- **Cache hit rate**: >90% for returning users

## 🔧 Implementation Notes

### Backward Compatibility:
- **Default export**: Maintains full compatibility `import Moveable from 'react-moveable'`
- **Gradual migration**: New patterns are opt-in
- **Documentation**: Clear migration paths for each use case

### Development Workflow:
- **Local testing**: Bundle analysis on every build
- **CI integration**: Size regression prevention
- **Performance monitoring**: Track bundle metrics over time

### Community Impact:
- **Developer experience**: Clearer import patterns
- **Bundle awareness**: Explicit about what features are included
- **Performance gains**: Significant load time improvements

---

_This plan focuses on practical bundle size reductions while maintaining the flexibility and power that makes Moveable.js popular. The phased approach ensures we can deliver immediate improvements while building toward more advanced optimizations._