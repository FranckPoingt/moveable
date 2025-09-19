import { describe, it, expect } from 'vitest';
import React from 'react';

// Import Moveable instead of InitialMoveable to avoid circular dependency
import Moveable from '../Moveable';

describe('Basic Moveable Tests', () => {
  describe('Moveable Class', () => {
    it('should have default ables defined', () => {
      expect(Moveable.defaultAbles).toBeDefined();
      expect(Array.isArray(Moveable.defaultAbles)).toBe(true);
    });

    it('should have static properties', () => {
      expect(Moveable).toBeDefined();
      expect(typeof Moveable).toBe('function');
    });

    it('should have name property', () => {
      expect(Moveable.name).toBe('Moveable');
    });

    it('should be instantiable', () => {
      expect(() => {
        const props = {
          target: null,
          draggable: true,
        };
        // Just test that we can create the class, not render it
        const instance = new Moveable(props);
        expect(instance).toBeInstanceOf(Moveable);
      }).not.toThrow();
    });
  });
});