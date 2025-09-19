import { describe, it, expect } from 'vitest';

// Import utility functions to test edge cases
import { getRefTargets } from '../utilities';
import { isArray, isString } from '../utils';

describe('Edge Cases and Special Scenarios', () => {
  describe('Utility Functions', () => {
    it('should handle null targets in getRefTargets', () => {
      const result = getRefTargets(null);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });

    it('should handle undefined targets in getRefTargets', () => {
      const result = getRefTargets(undefined);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });

    it('should handle string targets in getRefTargets', () => {
      const result = getRefTargets('.test-target');
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(1);
      expect(result[0]).toBe('.test-target');
    });

    it('should handle array targets in getRefTargets', () => {
      const targets = ['.target1', '.target2'];
      const result = getRefTargets(targets);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(2);
    });
  });

  describe('Type Checking Utilities', () => {
    it('should correctly identify arrays', () => {
      expect(isArray([])).toBe(true);
      expect(isArray([1, 2, 3])).toBe(true);
      expect(isArray('string')).toBe(false);
      expect(isArray(null)).toBe(false);
      expect(isArray(undefined)).toBe(false);
    });

    it('should correctly identify strings', () => {
      expect(isString('hello')).toBe(true);
      expect(isString('')).toBe(true);
      expect(isString(123)).toBe(false);
      expect(isString([])).toBe(false);
      expect(isString(null)).toBe(false);
    });
  });
});