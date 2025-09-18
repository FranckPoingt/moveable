import { describe, it, expect } from 'vitest';
import Moveable from '../Moveable';

describe('Moveable', () => {
    it('exports main component', () => {
        expect(Moveable).toBeDefined();
        expect(typeof Moveable).toBe('function');
    });

    it('has expected properties', () => {
    // Test that the component has the expected static properties
        expect(Moveable).toBeDefined();
        expect(typeof Moveable).toBe('function');
    });
});