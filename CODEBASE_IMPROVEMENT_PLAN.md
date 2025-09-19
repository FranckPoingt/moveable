# Codebase Improvement Plan

_Based on analysis of the modernized Moveable.js codebase - September 2025_

## Overview

The Moveable.js codebase is already well-modernized with Vite, Vitest, and flat ESLint config. This document outlines key areas for further improvement to push the codebase to cutting-edge standards.

## 🔧 Dependency Updates

### Major Version Bumps Available

-   **Storybook**: Delete it
-   **React Testing Libraries**: Update to latest versions
-   **Jest → Vitest Migration**: Replace Jest (v24) with Vitest (v30+) across all packages
-   **Security Updates**: Many dependencies are 2-3 major versions behind
-   **Bundle Size**: Newer versions often have smaller footprints

### Priority Dependencies

1. Storybook v8 → v9
2. Jest → Vitest migration for all packages
3. React testing ecosystem updates
4. Core build tool updates (Rollup, TypeScript, etc.)

## ⚡ Build & Performance Optimizations

### Vite Configuration Enhancement

```typescript
// Enhanced vite.config.ts
export default defineConfig({
    build: {
        target: "es2020", // vs current es2015
        minify: "esbuild", // vs current false
        cssMinify: "lightningcss",
        rollupOptions: {
            treeshake: {
                preset: "recommended",
            },
            output: {
                manualChunks: {
                    // Split ables into separate chunks for tree-shaking
                    "ables-core": ["./src/ables/Draggable", "./src/ables/Resizable"],
                    "ables-advanced": ["./src/ables/Warpable", "./src/ables/Clippable"],
                },
            },
        },
    },
    optimizeDeps: {
        include: ["react", "react-dom"],
    },
});
```

### TypeScript Modernization

```json
// tsconfig.json improvements
{
    "compilerOptions": {
        "target": "es2020", // vs current es5
        "module": "es2022", // vs current esnext
        "moduleResolution": "bundler", // vs current node
        "verbatimModuleSyntax": true,
        "exactOptionalPropertyTypes": true,
        "noUncheckedIndexedAccess": true,
        "allowUnusedLabels": false,
        "allowUnreachableCode": false,
        "strict": true,
        "noImplicitReturns": true,
        "noFallthroughCasesInSwitch": true
    }
}
```

## 🏗️ Architecture Improvements

### Bundle Splitting Strategy

-   **Code Splitting**: Split ables into separate chunks for better tree-shaking
-   **Dynamic Imports**: Load ables on-demand based on usage
-   **Micro-bundles**: Separate core functionality from optional features
-   **Lazy Loading**: Implement lazy loading for non-critical ables

### Modern JavaScript Features Implementation

-   **Top-level await**: Remove wrapper functions where applicable
-   **Private fields**: Replace `_private` conventions with `#private` fields
-   **Optional chaining**: Simplify null checks throughout codebase
-   **Nullish coalescing**: Replace `|| default` patterns with `?? default`
-   **Temporal API**: Consider for time-based animations (when stable)

### Package Structure Optimization

-   **ESM-first**: Make ES modules the primary format
-   **Dual Publishing**: Implement proper ESM/CJS dual package support
-   **Subpath Exports**: Enable tree-shaking of individual ables
-   **Remove UMD**: Focus on modern module formats only

## 🧪 Testing Modernization

### Jest → Vitest Migration

-   **Replace Jest**: Migrate all Jest configurations to Vitest across packages
-   **Benefits**: Better ES module support, faster execution, Vite integration
-   **Configuration**: Update all `jest.config.js` files to `vitest.config.ts`
-   **Test Scripts**: Update package.json test scripts from `jest` to `vitest`

### Enhanced Testing Strategy

-   **Unit Tests**: Migrate from Storybook Test Runner to native Vitest
-   **Component Testing**: Add comprehensive testing with Testing Library
-   **Performance Benchmarks**: Add benchmarks for resize/drag operations
-   **Visual Regression**: Implement visual regression testing with Playwright
-   **Integration Tests**: Add end-to-end testing for complex interactions

### Test Structure Improvements

```typescript
// Example Vitest setup
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Moveable } from "../src";

describe("Moveable Component", () => {
    it("should render with default props", () => {
        // Test implementation
    });
});
```

## 📦 Package Structure Enhancements

### Modern Module System

```json
// package.json improvements
{
    "type": "module",
    "exports": {
        ".": {
            "import": "./dist/index.js",
            "require": "./dist/index.cjs",
            "types": "./dist/index.d.ts"
        },
        "./ables/*": {
            "import": "./dist/ables/*.js",
            "require": "./dist/ables/*.cjs",
            "types": "./dist/ables/*.d.ts"
        }
    },
    "sideEffects": false
}
```

### Monorepo Optimization

-   **Turbo Integration**: Add build caching for monorepo
-   **Workspace Dependencies**: Optimize internal package dependencies
-   **Shared Configurations**: Centralize common configurations

## 🔍 Developer Experience Improvements

### CI/CD Modernization

-   **GitHub Actions**: Replace outdated CI workflows with modern alternatives
-   **Build Matrix**: Test against multiple Node.js and browser versions
-   **Automated Releases**: Enhance Changesets integration (already implemented ✅)
-   **Performance Monitoring**: Add bundle size tracking

### Code Quality Tools

-   **Biome Consideration**: Evaluate replacing ESLint/Prettier with Biome for single-tool simplicity
-   **TypeScript Strict Mode**: Enable stricter TypeScript checking
-   **Import Sorting**: Add consistent import organization
-   **Commit Hooks**: Implement pre-commit quality checks

### Development Workflow

-   **Hot Module Replacement**: Enhance HMR for faster development
-   **Source Maps**: Optimize source map generation
-   **Debug Configuration**: Add VS Code debug configurations
-   **Documentation**: Auto-generate API documentation

## 📋 Priority Implementation Order

### Phase 1: Foundation (Weeks 1-2)

1. **Update TypeScript config** to es2020+ target
2. **Enable Vite minification** for smaller bundles
3. **Jest → Vitest migration** across all packages
4. **Update critical dependencies** (security patches)

### Phase 2: Architecture (Weeks 3-4)

1. **Implement code splitting** for ables system
2. **Add comprehensive unit tests** beyond Storybook
3. **Modernize package.json exports** for better tree-shaking
4. **Update major dependencies** (Storybook, testing libs)

### Phase 3: Optimization (Weeks 5-6)

1. **Performance benchmarking** implementation
2. **Bundle analysis and optimization**
3. **Modern JavaScript features** adoption
4. **CI/CD workflow improvements**

### Phase 4: Developer Experience (Weeks 7-8)

1. **Enhanced development tooling**
2. **Documentation improvements**
3. **Visual regression testing**
4. **Final performance optimizations**

## 🎯 Success Metrics

### Performance Targets

-   **Bundle Size**: Reduce by 20-30% through better tree-shaking
-   **Build Time**: Improve by 40-50% with Vite optimizations
-   **Test Speed**: 3x faster with Vitest vs Jest
-   **Cold Start**: Improve development server startup by 60%

### Quality Metrics

-   **Test Coverage**: Maintain >90% coverage during migration
-   **Type Safety**: Achieve 100% TypeScript strict mode compliance
-   **Dependencies**: Reduce security vulnerabilities to zero
-   **Bundle Analysis**: Achieve optimal chunk splitting

## 🔧 Migration Scripts

### Jest to Vitest Migration Script

```bash
# Automated migration script
npm install -D vitest @vitest/ui
npm uninstall jest @types/jest
find . -name "jest.config.js" -exec rename 's/jest.config.js/vitest.config.ts/' {} \;
# Update package.json scripts programmatically
```

### Dependency Update Strategy

```bash
# Safe update approach
npx npm-check-updates --target minor
npm audit fix
npm test # Ensure no breaking changes
npx npm-check-updates --target major # Manual review required
```

## 📝 Notes

-   **Backward Compatibility**: Maintain compatibility during transition periods
-   **Progressive Migration**: Implement changes incrementally to minimize risk
-   **Community Feedback**: Gather feedback from major users before breaking changes
-   **Documentation**: Update all documentation to reflect new patterns and APIs

---

_This improvement plan represents a strategic approach to modernizing an already well-structured codebase. The focus is on leveraging cutting-edge tools and patterns while maintaining the stability and performance that Moveable.js is known for._
