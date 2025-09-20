# Lazy Loading Guide for Moveable.js

*Comprehensive guide to optimizing bundle size with lazy loading - Phase 3 Implementation*

## 🚀 Quick Start

### Basic Usage (75% smaller bundle)

```typescript
// Before: 336KB bundle
import Moveable from 'react-moveable';

// After: ~80KB bundle
import { BasicMoveable } from 'react-moveable/presets/basic';

function App() {
  return (
    <BasicMoveable
      target={".target"}
      draggable={true}
      resizable={true}
    />
  );
}
```

### Dynamic Loading (Load on demand)

```typescript
import { DynamicMoveable } from 'react-moveable/core';

function App() {
  return (
    <DynamicMoveable
      target={".target"}
      ables={['Draggable', 'Resizable']} // Loaded dynamically
      loading={<div>Loading...</div>}
      onAblesLoaded={(ables) => console.log('Loaded:', ables)}
    />
  );
}
```

## 📦 Bundle Size Comparison

| Use Case | Traditional | Optimized | Savings |
|----------|-------------|-----------|---------|
| **Basic (drag + resize)** | 336KB | 80KB | **76%** |
| **Drag only** | 336KB | 40KB | **88%** |
| **Advanced (warp + clip)** | 336KB | 200KB | **40%** |
| **Single able** | 336KB | 30KB | **91%** |

## 🎯 Import Strategies

### 1. Preset Bundles (Recommended)

Use pre-configured bundles for common scenarios:

```typescript
// Basic transformations (~80KB)
import { BasicMoveable } from 'react-moveable/presets/basic';

// Advanced features (~200KB)
import { AdvancedMoveable } from 'react-moveable/presets/advanced';

// Everything (~336KB, but better caching)
import { FullMoveable } from 'react-moveable/presets/full';
```

### 2. Custom Factory (Maximum Control)

Build exactly what you need:

```typescript
import { createDynamicMoveableClass } from 'react-moveable/core';

// Create custom moveable with specific ables
const CustomMoveable = await createDynamicMoveableClass([
  'Draggable',
  'Resizable',
  'Rotatable'
]); // ~120KB

function App() {
  return <CustomMoveable target=".target" />;
}
```

### 3. Hook-Based Loading

For functional components:

```typescript
import { useDynamicMoveable } from 'react-moveable/core';

function MyComponent() {
  const { ables, isLoading, error } = useDynamicMoveable([
    'Draggable',
    'Resizable'
  ]);

  if (isLoading) return <div>Loading ables...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <MoveableWithAbles ables={ables} />;
}
```

## 🔥 Performance Patterns

### Progressive Loading

Load features as user needs them:

```typescript
import { DynamicMoveable } from 'react-moveable/core';

function ProgressiveMoveable() {
  const [enabledFeatures, setEnabledFeatures] = useState(['Draggable']);

  const addResize = () => {
    setEnabledFeatures(prev => [...prev, 'Resizable']);
  };

  const addRotate = () => {
    setEnabledFeatures(prev => [...prev, 'Rotatable']);
  };

  return (
    <div>
      <button onClick={addResize}>Add Resize</button>
      <button onClick={addRotate}>Add Rotate</button>

      <DynamicMoveable
        target=".target"
        ables={enabledFeatures}
      />
    </div>
  );
}
```

### Preloading for UX

Preload ables users might need:

```typescript
import { preloadAbles } from 'react-moveable/core';

// Preload on component mount or user interaction
useEffect(() => {
  // Preload advanced features for power users
  preloadAbles(['Warpable', 'Clippable']);
}, []);
```

### Conditional Loading

Load different ables based on context:

```typescript
function ContextualMoveable({ mode }: { mode: 'basic' | 'pro' }) {
  const ables = mode === 'basic'
    ? ['Draggable', 'Resizable']
    : ['Draggable', 'Resizable', 'Rotatable', 'Warpable'];

  return (
    <DynamicMoveable
      target=".target"
      ables={ables}
    />
  );
}
```

## 🛠 Advanced Patterns

### Micro-Bundle Imports

For ultimate control, import individual ables:

```typescript
// Individual ables (~30KB each)
import { Draggable } from 'react-moveable/micro/ables/Draggable';
import { Resizable } from 'react-moveable/micro/ables/Resizable';
import { createMoveableClass } from 'react-moveable/core';

const MicroMoveable = createMoveableClass([Draggable, Resizable]);
```

### CDN Optimization

For CDN usage, use chunked builds:

```html
<!-- Core (cached across apps) -->
<script src="https://cdn.example.com/moveable-core.min.js"></script>

<!-- Features (load as needed) -->
<script src="https://cdn.example.com/features-transform.min.js"></script>

<!-- Use immediately -->
<script>
  const moveable = new Moveable.Basic({
    target: '.target'
  });
</script>
```

### Code Splitting with React.lazy

Combine with React's lazy loading:

```typescript
import { lazy, Suspense } from 'react';

// Lazy load the entire moveable component
const LazyMoveable = lazy(() =>
  import('react-moveable/presets/advanced').then(module => ({
    default: module.AdvancedMoveable
  }))
);

function App() {
  return (
    <Suspense fallback={<div>Loading editor...</div>}>
      <LazyMoveable target=".target" />
    </Suspense>
  );
}
```

## 📊 Bundle Analysis

### Analyze Your Bundles

```bash
# Analyze main build
npm run build:analyze

# Analyze micro bundles
npm run build:analyze:micro

# Build everything and compare
npm run build:all
```

### Size Monitoring

Track bundle sizes in CI:

```json
{
  "scripts": {
    "size-check": "bundlesize"
  },
  "bundlesize": [
    {
      "path": "./dist/presets/basic.js",
      "maxSize": "100kb"
    },
    {
      "path": "./dist/micro/ables/Draggable.js",
      "maxSize": "40kb"
    }
  ]
}
```

## 🎮 Interactive Examples

### Example 1: Progressive Enhancement

```typescript
function ProgressiveEditor() {
  const [level, setLevel] = useState(1);

  const ables = {
    1: ['Draggable'],
    2: ['Draggable', 'Resizable'],
    3: ['Draggable', 'Resizable', 'Rotatable'],
    4: ['Draggable', 'Resizable', 'Rotatable', 'Warpable']
  };

  return (
    <div>
      <div>
        Editor Level:
        {[1,2,3,4].map(l => (
          <button
            key={l}
            onClick={() => setLevel(l)}
            disabled={level === l}
          >
            Level {l}
          </button>
        ))}
      </div>

      <DynamicMoveable
        target=".target"
        ables={ables[level]}
        loading={<div>Upgrading editor...</div>}
      />
    </div>
  );
}
```

### Example 2: Feature Store

```typescript
function FeatureStore() {
  const [purchasedFeatures, setPurchasedFeatures] = useState(['Draggable']);

  const features = {
    'Resizable': { price: 5, size: '25KB' },
    'Rotatable': { price: 10, size: '30KB' },
    'Warpable': { price: 25, size: '50KB' }
  };

  const buyFeature = (feature: string) => {
    setPurchasedFeatures(prev => [...prev, feature]);
  };

  return (
    <div>
      <h3>Feature Store</h3>
      {Object.entries(features).map(([name, info]) => (
        <div key={name}>
          <button
            onClick={() => buyFeature(name)}
            disabled={purchasedFeatures.includes(name)}
          >
            {name} - ${info.price} ({info.size})
          </button>
        </div>
      ))}

      <DynamicMoveable
        target=".editor"
        ables={purchasedFeatures}
      />
    </div>
  );
}
```

## 🚦 Migration Guide

### From Traditional to Lazy Loading

**Step 1**: Replace imports
```typescript
// Before
import Moveable from 'react-moveable';

// After
import { BasicMoveable } from 'react-moveable/presets/basic';
```

**Step 2**: Add loading states
```typescript
// Before
<Moveable target=".target" />

// After
<DynamicMoveable
  target=".target"
  ables={['Draggable', 'Resizable']}
  loading={<Spinner />}
/>
```

**Step 3**: Optimize for your use case
```typescript
// Analyze what ables you actually use
const usedAbles = ['Draggable', 'Resizable', 'Snappable'];

// Create custom preset
const MyMoveable = await createDynamicMoveableClass(usedAbles);
```

## 🔧 Troubleshooting

### Common Issues

**Q**: Dynamic import fails in SSR
```typescript
// Solution: Check for browser environment
if (typeof window !== 'undefined') {
  const ables = await loadAbles(['Draggable']);
}
```

**Q**: Bundle still large after optimization
```typescript
// Check what's actually being imported
import { bundleAnalyzer } from 'webpack-bundle-analyzer';
// Or use: npm run build:analyze
```

**Q**: Performance regression
```typescript
// Preload critical ables
useEffect(() => {
  preloadAbles(['Draggable', 'Resizable']);
}, []);
```

## 📈 Performance Metrics

### Target Performance

- **Basic usage**: < 100KB total
- **Load time**: < 200ms on 3G
- **Cache hit rate**: > 90% for returning users
- **Bundle analysis**: Run on every PR

### Monitoring

```typescript
// Track actual bundle sizes
const trackBundleSize = (bundleName: string, size: number) => {
  analytics.track('Bundle Loaded', {
    bundle: bundleName,
    size: size,
    timestamp: Date.now()
  });
};
```

---

*This guide represents the Phase 3 implementation of the Bundle Optimization Plan. Start with presets, measure your usage, then optimize with micro-bundles for maximum performance.*