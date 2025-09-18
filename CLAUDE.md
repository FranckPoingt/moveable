# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

This is a Lerna monorepo for Moveable - a JavaScript library for creating draggable, resizable, scalable, rotatable, warpable, pinchable components. The repository is in transition to be slimmed down and modernized (see MODERNIZATION_PLAN.md).

### Core Packages

- **`packages/react-moveable/`** - Main React wrapper and primary development package
- **`packages/moveable/`** - Vanilla JS core that wraps react-moveable via croact
- **`packages/croact-moveable/`** - Internal croact wrapper for UMD builds
- **`packages/helper/`** - Helper utilities for group management
- **`packages/snappable/`** - Snapping utilities

### Architecture Overview

**Core Architecture Pattern:**
- **Able System**: Moveable uses a plugin-like "Able" system where each interaction (drag, resize, rotate, etc.) is implemented as an independent "Able" module
- **Ables** are defined in `packages/react-moveable/src/ables/` and registered in `packages/react-moveable/src/ables/consts.ts:25-36`
- Main component extends `InitialMoveable` which extends `MoveableManager` - the core engine

**Key Components:**
- `MoveableManager.tsx` - Core component managing state, events, and rendering
- `Moveable.tsx` - Main export that includes default ables
- `types.ts` - Central type definitions for all props and events
- `AbleManager.ts` - Utilities for creating new ables

**Event System:**
- Uses custom event system via `@scena/event-emitter`
- Events are auto-generated from able definitions
- React events are camelCased versions (e.g., `drag` → `onDrag`)

## Common Development Commands

### Primary Development (react-moveable)

```bash
# Development with Storybook
cd packages/react-moveable
npm run storybook

# Build package
npm run build

# Run linting
npm run lint

# Type checking
npm run test:type

# Run tests via Storybook test runner
npm run test

# Run tests in CI mode
npm run test:ci
```

### Root Level Commands

```bash
# Bootstrap all packages
npm run bootstrap

# Build all packages
npm run packages:build

# Build and deploy demo
npm run demo:build && npm run demo:deploy

# Update version and build
npm run packages:update
```

### Testing

- Tests are implemented using **Storybook Test Runner** with `@storybook/testing-library`
- Test files are stories in Storybook with interaction tests
- Coverage via `npm run coverage` in react-moveable package
- Type checking via `npm run test:type`

### Building

- Uses `@daybrush/builder` (custom Rollup wrapper)
- Builds both ESM and CJS formats
- TypeScript declarations generated separately
- Build process: `lint → type-check → rollup → declarations → size analysis`

## Key Files to Understand

- **`packages/react-moveable/src/ables/consts.ts`** - Registry of all available ables
- **`packages/react-moveable/src/types.ts`** - Central type definitions
- **`packages/react-moveable/src/MoveableManager.tsx`** - Core component logic
- **`packages/react-moveable/rollup.config.js`** - Build configuration

## TypeScript Configuration

- Target: ES5 with ESNext modules
- Strict mode enabled
- Path aliases configured for internal imports
- Declaration files generated to `declaration/` directory

## Development Notes

- Main development happens in `packages/react-moveable/`
- Other packages are wrappers or utilities that depend on react-moveable
- Storybook serves as both documentation and test runner
- Legacy Yarn workspaces setup (planned for modernization)
- Uses Lerna for version management and publishing