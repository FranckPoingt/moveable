import { Able, MoveableProps } from "./types";
import { InitialMoveable } from "./InitialMoveable";
import { loadAbles } from "./ables/DynamicAbleLoader";

/**
 * Creates a custom Moveable class with specific ables
 * @param ables Array of able instances or names
 * @returns Custom Moveable class
 */
export function createMoveableClass(ables: (Able | string)[]): typeof InitialMoveable {
    const resolvedAbles: Able[] = ables.filter((able): able is Able =>
        typeof able === 'object' && able !== null
    );

    class CustomMoveable extends InitialMoveable<MoveableProps> {
        public static defaultAbles: Able[] = resolvedAbles;
    }

    return CustomMoveable;
}

/**
 * Async factory for creating Moveable class with dynamically loaded ables
 * @param ableNames Array of able names to load
 * @returns Promise resolving to custom Moveable class
 */
export async function createDynamicMoveableClass(ableNames: string[]): Promise<typeof InitialMoveable> {
    const ables = await loadAbles(ableNames);
    return createMoveableClass(ables);
}

/**
 * Predefined moveable configurations for common use cases
 */
export const MoveablePresets = {
    /**
     * Basic drag and resize functionality
     */
    async basic() {
        return createDynamicMoveableClass([
            'Default',
            'BeforeRenderable',
            'Draggable',
            'Resizable',
            'Renderable'
        ]);
    },

    /**
     * Advanced transformation capabilities
     */
    async advanced() {
        return createDynamicMoveableClass([
            'Default',
            'BeforeRenderable',
            'Draggable',
            'Resizable',
            'Rotatable',
            'Scalable',
            'Warpable',
            'Renderable'
        ]);
    },

    /**
     * Full feature set with snapping and utilities
     */
    async full() {
        return createDynamicMoveableClass([
            'BeforeRenderable',
            'Default',
            'Snappable',
            'Pinchable',
            'Draggable',
            'edgeDraggable',
            'Resizable',
            'Scalable',
            'Warpable',
            'Rotatable',
            'Scrollable',
            'Padding',
            'Origin',
            'OriginDraggable',
            'Clippable',
            'Roundable',
            'Groupable',
            'IndividualGroupable',
            'Clickable',
            'DragArea',
            'Renderable'
        ]);
    },

    /**
     * Minimal drag-only functionality
     */
    async dragOnly() {
        return createDynamicMoveableClass([
            'Default',
            'BeforeRenderable',
            'Draggable',
            'Renderable'
        ]);
    },

    /**
     * Resize-only functionality
     */
    async resizeOnly() {
        return createDynamicMoveableClass([
            'Default',
            'BeforeRenderable',
            'Resizable',
            'Renderable'
        ]);
    },

    /**
     * Clipping and shape manipulation
     */
    async clipping() {
        return createDynamicMoveableClass([
            'Default',
            'BeforeRenderable',
            'Draggable',
            'Clippable',
            'Roundable',
            'Renderable'
        ]);
    },

    /**
     * Group manipulation
     */
    async groupable() {
        return createDynamicMoveableClass([
            'Default',
            'BeforeRenderable',
            'Draggable',
            'Resizable',
            'Rotatable',
            'Groupable',
            'IndividualGroupable',
            'Renderable'
        ]);
    }
};

/**
 * Utility function to create a moveable instance with specific ables
 * @param ableNames Array of able names
 * @param props Moveable props
 * @returns Promise resolving to moveable instance
 */
export async function createMoveableInstance(ableNames: string[], props: MoveableProps = {}) {
    const MoveableClass = await createDynamicMoveableClass(ableNames);
    return new MoveableClass(props);
}