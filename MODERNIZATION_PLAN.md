# Modernization Plan for Moveable Repository

## Current State Analysis

You've already removed most framework wrappers (Angular, Vue, Svelte, Preact, Lit). The remaining packages are:

-   `react-moveable` - Main React wrapper
-   `moveable` - Vanilla JS core
-   `croact-moveable` - Internal croact wrapper
-   `snappable` - Utility package
-   `helper` - Utility package

## Phase 1: Repository Structure Modernization

**Remove Legacy Tooling:**

-   Remove Lerna - replace with modern workspace management
-   Remove Yarn workspaces - migrate to npm workspaces or pnpm
-   Simplify to single package architecture

**Update Package Management:**

-   Migrate from `package.json:75-96` complex workspaces to simple structure
-   Remove unnecessary `nohoist` configurations
-   Update to modern lockfile format

## Phase 2: Dependencies Modernization

**Critical Updates Needed:**

-   TypeScript: `^4.8 <4.9` → `^5.0.0` (latest stable)
-   React: `^16.8.6` → `^19.0.0` (3+ major versions behind)
-   Storybook: `6.5.16` → `^8.0.0` (major modernization)
-   Node.js: Support Node 18+ only (drop older versions)

**Remove Outdated Dependencies:**

-   `@daybrush/builder` - replace with Vite/Rollup modern setup
-   `croact` dependency - can likely be eliminated
-   Legacy ESLint rules and configs

## Phase 3: Build System Modernization

**Replace Current Build:**

-   Replace Rollup config with Vite for faster builds
-   Use native TypeScript compilation
-   Implement modern bundling (ESM-first)
-   Add tree-shaking optimizations

**Testing Modern Stack:**

-   Keep Storybook but upgrade to v8
-   Replace custom test runner with Vitest
-   Add modern coverage reporting

## Phase 4: Architecture Simplification

**Consolidate Packages:**

-   Merge `croact-moveable` into main `react-moveable`
-   Consider merging `helper` and `snappable` into core
-   Single package.json with optional React peer dependency

**Code Organization:**

-   Modern ESM exports with proper tree-shaking
-   TypeScript strict mode enabled
-   Remove build complexity from `package.json:44-59`

## Phase 5: Developer Experience

**Modern Tooling:**

-   Update ESLint to flat config
-   Implement changesets for releases

**Documentation:**

-   Modernize README with current examples
-   Add TypeScript-first documentation
-   Remove outdated handbook references

## Recommended Implementation Order:

1. **Start with dependency updates** - Update TypeScript, React, and core deps
2. **Simplify package structure** - Remove Lerna, consolidate packages
3. **Modernize build system** - Replace with Vite/modern tooling
4. **Update testing/storybook** - Upgrade to latest versions
5. **Clean up configuration** - Remove legacy configs and scripts

## Benefits of This Modernization:

-   **Reduced complexity**: From ~8 packages to 1-2 core packages
-   **Better performance**: Modern build tools and updated dependencies
-   **Improved DX**: Better tooling, faster builds, modern IDE support
-   **Future-proof**: Up-to-date dependencies and best practices
-   **Easier maintenance**: Simplified structure and modern tooling

This plan would significantly reduce the repository size while modernizing the entire stack for better performance and developer experience.
