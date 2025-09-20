import { describe, it, expect } from 'vitest';

// Import Moveable to test advanced features
import Moveable from '../Moveable';
import { MOVEABLE_ABLES } from '../ables/consts';

describe('Advanced Moveable Features', () => {
  describe('Ables System', () => {
    it('should have default ables array', () => {
      expect(Moveable.defaultAbles).toBeDefined();
      expect(Array.isArray(Moveable.defaultAbles)).toBe(true);
      expect(Moveable.defaultAbles.length).toBeGreaterThan(0);
    });

    it('should have MOVEABLE_ABLES constant', () => {
      expect(MOVEABLE_ABLES).toBeDefined();
      expect(Array.isArray(MOVEABLE_ABLES)).toBe(true);
      expect(MOVEABLE_ABLES.length).toBeGreaterThan(0);
    });

    it('should have main interaction types', () => {
      const mainAblesNames = ['draggable', 'resizable', 'scalable', 'rotatable'];
      const defaultAblesNames = Moveable.defaultAbles.map(able => able.name);

      mainAblesNames.forEach(name => {
        expect(defaultAblesNames).toContain(name);
      });
    });

    it('should have basic able structure', () => {
      // Test that ables have the required structure
      const firstAble = Moveable.defaultAbles[0];
      expect(firstAble).toBeDefined();
      expect(firstAble.name).toBeDefined();
      expect(typeof firstAble.name).toBe('string');
    });
  });
});