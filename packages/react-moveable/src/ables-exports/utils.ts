/**
 * Utility ables for enhanced functionality
 * Support features: snapping, scrolling, pinching, click/drag areas
 * These ables enhance other interactions but aren't transformations themselves
 */

// Import ables
import BeforeRenderable from "../ables/BeforeRenderable";
import Default from "../ables/Default";
import Renderable from "../ables/Renderable";
import Snappable from "../ables/Snappable";
import Scrollable from "../ables/Scrollable";
import Pinchable from "../ables/Pinchable";
import DragArea from "../ables/DragArea";
import Clickable from "../ables/Clickable";

// Utility ables
export { default as Snappable } from "../ables/Snappable";
export { default as Scrollable } from "../ables/Scrollable";
export { default as Pinchable } from "../ables/Pinchable";
export { default as DragArea } from "../ables/DragArea";
export { default as Clickable } from "../ables/Clickable";

// Core requirements
export { default as BeforeRenderable } from "../ables/BeforeRenderable";
export { default as Default } from "../ables/Default";
export { default as Renderable } from "../ables/Renderable";

// Utility functions
export { makeMoveable } from "../makeMoveable";

// Preset for utility-focused usage
const UTILS_ABLES = [
  BeforeRenderable,
  Default,
  Snappable,
  Scrollable,
  Pinchable,
  DragArea,
  Clickable,
  Renderable,
];

export { UTILS_ABLES };