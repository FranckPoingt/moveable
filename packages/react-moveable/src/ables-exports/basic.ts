/**
 * Basic ables for common use cases
 * Essential functionality: drag, resize, and core rendering
 * Optimized for: 80KB bundle size (~75% reduction from full library)
 */

// Import ables
import BeforeRenderable from "../ables/BeforeRenderable";
import Default from "../ables/Default";
import Renderable from "../ables/Renderable";
import Draggable from "../ables/Draggable";
import Resizable from "../ables/Resizable";

// Core rendering ables (required)
export { default as BeforeRenderable } from "../ables/BeforeRenderable";
export { default as Default } from "../ables/Default";
export { default as Renderable } from "../ables/Renderable";

// Essential interaction ables
export { default as Draggable } from "../ables/Draggable";
export { default as Resizable } from "../ables/Resizable";

// Utility functions
export { makeMoveable } from "../makeMoveable";

// Preset for basic usage
const BASIC_ABLES = [
  BeforeRenderable,
  Default,
  Draggable,
  Resizable,
  Renderable,
];

export { BASIC_ABLES };