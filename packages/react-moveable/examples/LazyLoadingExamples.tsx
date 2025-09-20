import React, { useState, useEffect } from 'react';
import { DynamicMoveable, useDynamicMoveable, preloadAbles } from '../src/core';
import { BasicMoveable } from '../src/presets/basic';
import { AdvancedMoveable } from '../src/presets/advanced';
import { createDynamicMoveableClass, MoveablePresets } from '../src/MoveableFactory';

/**
 * Example 1: Basic Preset Usage
 * Shows 75% bundle size reduction with preset bundles
 */
export function BasicPresetExample() {
  return (
    <div className="example">
      <h3>Basic Preset (80KB vs 336KB)</h3>
      <div className="target basic-target">Drag & Resize Me</div>
      <BasicMoveable
        target=".basic-target"
        draggable={true}
        resizable={true}
        className="moveable-basic"
      />
    </div>
  );
}

/**
 * Example 2: Dynamic Loading with Loading States
 * Demonstrates on-demand able loading
 */
export function DynamicLoadingExample() {
  const [selectedAbles, setSelectedAbles] = useState<string[]>(['Draggable']);

  const toggleAble = (ableName: string) => {
    setSelectedAbles(prev =>
      prev.includes(ableName)
        ? prev.filter(name => name !== ableName)
        : [...prev, ableName]
    );
  };

  const ableOptions = [
    { name: 'Draggable', size: '25KB' },
    { name: 'Resizable', size: '30KB' },
    { name: 'Rotatable', size: '35KB' },
    { name: 'Warpable', size: '50KB' }
  ];

  return (
    <div className="example">
      <h3>Dynamic Loading Example</h3>

      <div className="controls">
        <h4>Select Ables:</h4>
        {ableOptions.map(({ name, size }) => (
          <label key={name}>
            <input
              type="checkbox"
              checked={selectedAbles.includes(name)}
              onChange={() => toggleAble(name)}
            />
            {name} ({size})
          </label>
        ))}
      </div>

      <div className="target dynamic-target">Dynamic Moveable</div>

      <DynamicMoveable
        target=".dynamic-target"
        ables={selectedAbles}
        loading={<div className="loading">Loading ables...</div>}
        onAblesLoaded={(ables) => {
          console.log('Loaded ables:', ables.map(a => a.name));
        }}
        onAblesLoadError={(error) => {
          console.error('Failed to load ables:', error);
        }}
      />

      <div className="info">
        Total estimated size: {selectedAbles.length * 30}KB
      </div>
    </div>
  );
}

/**
 * Example 3: Progressive Enhancement
 * Shows how to add features as user needs them
 */
export function ProgressiveEnhancementExample() {
  const [editorLevel, setEditorLevel] = useState(1);

  const levels = {
    1: { ables: ['Draggable'], name: 'Basic', size: '40KB' },
    2: { ables: ['Draggable', 'Resizable'], name: 'Standard', size: '70KB' },
    3: { ables: ['Draggable', 'Resizable', 'Rotatable'], name: 'Advanced', size: '100KB' },
    4: { ables: ['Draggable', 'Resizable', 'Rotatable', 'Warpable'], name: 'Pro', size: '150KB' }
  };

  return (
    <div className="example">
      <h3>Progressive Enhancement</h3>

      <div className="level-controls">
        {Object.entries(levels).map(([level, config]) => (
          <button
            key={level}
            className={editorLevel === Number(level) ? 'active' : ''}
            onClick={() => setEditorLevel(Number(level))}
          >
            {config.name} ({config.size})
          </button>
        ))}
      </div>

      <div className="target progressive-target">Progressive Editor</div>

      <DynamicMoveable
        target=".progressive-target"
        ables={levels[editorLevel].ables}
        loading={<div className="loading">Upgrading editor...</div>}
      />

      <div className="current-level">
        Current: {levels[editorLevel].name} - {levels[editorLevel].size}
      </div>
    </div>
  );
}

/**
 * Example 4: Hook-Based Loading
 * Demonstrates useDynamicMoveable hook
 */
export function HookBasedExample() {
  const [requestedAbles, setRequestedAbles] = useState(['Draggable', 'Resizable']);
  const { ables, isLoading, error } = useDynamicMoveable(requestedAbles);

  const addRotate = () => {
    setRequestedAbles(prev => [...prev, 'Rotatable']);
  };

  const addWarp = () => {
    setRequestedAbles(prev => [...prev, 'Warpable']);
  };

  if (error) {
    return <div className="error">Error loading ables: {error.message}</div>;
  }

  return (
    <div className="example">
      <h3>Hook-Based Loading</h3>

      <div className="controls">
        <button onClick={addRotate} disabled={isLoading || requestedAbles.includes('Rotatable')}>
          Add Rotate
        </button>
        <button onClick={addWarp} disabled={isLoading || requestedAbles.includes('Warpable')}>
          Add Warp
        </button>
      </div>

      {isLoading && <div className="loading">Loading ables...</div>}

      <div className="target hook-target">Hook-Based Moveable</div>

      {!isLoading && ables.length > 0 && (
        <DynamicMoveable
          target=".hook-target"
          ables={requestedAbles}
        />
      )}

      <div className="info">
        Loaded: {ables.map(a => a.name).join(', ')}
      </div>
    </div>
  );
}

/**
 * Example 5: Custom Factory
 * Shows how to create optimized custom moveable classes
 */
export function CustomFactoryExample() {
  const [customMoveable, setCustomMoveable] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const createBasicEditor = async () => {
    setLoading(true);
    const BasicEditor = await MoveablePresets.basic();
    setCustomMoveable(() => BasicEditor);
    setLoading(false);
  };

  const createAdvancedEditor = async () => {
    setLoading(true);
    const AdvancedEditor = await MoveablePresets.advanced();
    setCustomMoveable(() => AdvancedEditor);
    setLoading(false);
  };

  const createCustomEditor = async () => {
    setLoading(true);
    const CustomEditor = await createDynamicMoveableClass([
      'Draggable',
      'Resizable',
      'Clippable'
    ]);
    setCustomMoveable(() => CustomEditor);
    setLoading(false);
  };

  const CustomMoveableComponent = customMoveable;

  return (
    <div className="example">
      <h3>Custom Factory Example</h3>

      <div className="controls">
        <button onClick={createBasicEditor} disabled={loading}>
          Create Basic Editor (80KB)
        </button>
        <button onClick={createAdvancedEditor} disabled={loading}>
          Create Advanced Editor (200KB)
        </button>
        <button onClick={createCustomEditor} disabled={loading}>
          Create Custom Editor (100KB)
        </button>
      </div>

      {loading && <div className="loading">Creating editor...</div>}

      <div className="target factory-target">Factory-Created Moveable</div>

      {CustomMoveableComponent && !loading && (
        <CustomMoveableComponent
          target=".factory-target"
          draggable={true}
          resizable={true}
        />
      )}
    </div>
  );
}

/**
 * Example 6: Preloading Strategy
 * Shows how to preload ables for better UX
 */
export function PreloadingExample() {
  const [preloaded, setPreloaded] = useState<string[]>([]);
  const [currentAbles, setCurrentAbles] = useState(['Draggable']);

  useEffect(() => {
    // Preload common ables on component mount
    preloadAbles(['Resizable', 'Rotatable']).then(() => {
      setPreloaded(['Resizable', 'Rotatable']);
    });
  }, []);

  const addPreloadedAble = (ableName: string) => {
    if (preloaded.includes(ableName)) {
      // Instant activation since it's preloaded
      setCurrentAbles(prev => [...prev, ableName]);
    }
  };

  return (
    <div className="example">
      <h3>Preloading Strategy</h3>

      <div className="preload-status">
        Preloaded: {preloaded.join(', ') || 'None'}
      </div>

      <div className="controls">
        <button
          onClick={() => addPreloadedAble('Resizable')}
          disabled={currentAbles.includes('Resizable')}
          className={preloaded.includes('Resizable') ? 'preloaded' : ''}
        >
          Add Resize {preloaded.includes('Resizable') ? '⚡' : ''}
        </button>
        <button
          onClick={() => addPreloadedAble('Rotatable')}
          disabled={currentAbles.includes('Rotatable')}
          className={preloaded.includes('Rotatable') ? 'preloaded' : ''}
        >
          Add Rotate {preloaded.includes('Rotatable') ? '⚡' : ''}
        </button>
      </div>

      <div className="target preload-target">Preloading Example</div>

      <DynamicMoveable
        target=".preload-target"
        ables={currentAbles}
      />

      <div className="info">
        ⚡ = Preloaded (instant activation)
      </div>
    </div>
  );
}

/**
 * Main Demo Component
 * Showcases all lazy loading patterns
 */
export default function LazyLoadingDemo() {
  const [activeExample, setActiveExample] = useState('basic');

  const examples = {
    basic: { component: BasicPresetExample, name: 'Basic Preset' },
    dynamic: { component: DynamicLoadingExample, name: 'Dynamic Loading' },
    progressive: { component: ProgressiveEnhancementExample, name: 'Progressive Enhancement' },
    hook: { component: HookBasedExample, name: 'Hook-Based' },
    factory: { component: CustomFactoryExample, name: 'Custom Factory' },
    preload: { component: PreloadingExample, name: 'Preloading' }
  };

  const ActiveComponent = examples[activeExample].component;

  return (
    <div className="lazy-loading-demo">
      <h1>Moveable.js Lazy Loading Examples</h1>
      <p>Demonstrating 75-90% bundle size reductions with lazy loading</p>

      <nav className="example-nav">
        {Object.entries(examples).map(([key, { name }]) => (
          <button
            key={key}
            className={activeExample === key ? 'active' : ''}
            onClick={() => setActiveExample(key)}
          >
            {name}
          </button>
        ))}
      </nav>

      <div className="example-container">
        <ActiveComponent />
      </div>

      <style jsx>{`
        .lazy-loading-demo {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .example-nav {
          display: flex;
          gap: 10px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }

        .example-nav button {
          padding: 10px 15px;
          border: 1px solid #ddd;
          background: white;
          cursor: pointer;
          border-radius: 5px;
        }

        .example-nav button.active {
          background: #007bff;
          color: white;
        }

        .example {
          border: 1px solid #eee;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
        }

        .target {
          width: 100px;
          height: 100px;
          background: #f0f0f0;
          border: 2px solid #ddd;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 20px 0;
          cursor: move;
        }

        .controls {
          margin-bottom: 15px;
        }

        .controls button {
          margin-right: 10px;
          margin-bottom: 5px;
          padding: 8px 12px;
          border: 1px solid #ddd;
          background: white;
          cursor: pointer;
          border-radius: 3px;
        }

        .controls button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .controls button.active {
          background: #007bff;
          color: white;
        }

        .controls button.preloaded {
          background: #28a745;
          color: white;
        }

        .loading {
          color: #666;
          font-style: italic;
          padding: 10px;
          background: #f8f9fa;
          border-radius: 3px;
        }

        .error {
          color: #dc3545;
          padding: 10px;
          background: #f8d7da;
          border-radius: 3px;
        }

        .info {
          margin-top: 10px;
          font-size: 14px;
          color: #666;
        }

        .preload-status {
          font-size: 14px;
          color: #28a745;
          margin-bottom: 10px;
        }

        .level-controls button {
          margin-right: 10px;
          padding: 8px 12px;
        }

        .current-level {
          margin-top: 10px;
          font-weight: bold;
          color: #007bff;
        }
      `}</style>
    </div>
  );
}