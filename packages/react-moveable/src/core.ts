/**
 * Core Moveable functionality without ables
 * Provides the base engine for building custom moveables with specific ables
 */

// Core components
export { default as MoveableManager } from "./MoveableManager";
export { InitialMoveable } from "./InitialMoveable";

// Essential utilities
export * from "./utils";
export * from "./types";

// Able management
export { makeAble } from "./ables/AbleManager";

// Core constants and helpers
export { MOVEABLE_EVENTS, MOVEABLE_PROPS, MOVEABLE_REACT_EVENTS } from "./ables/consts";

// makeMoveable function for creating custom components with specific ables
export { makeMoveable } from "./makeMoveable";

// Dynamic loading functionality
export { DynamicMoveable, useDynamicMoveable } from "./DynamicMoveable";
export * from "./ables/DynamicAbleLoader";

// Factory functions for advanced use cases
export { createMoveableClass, createDynamicMoveableClass, MoveablePresets } from "./MoveableFactory";