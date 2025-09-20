/**
 * Visual enhancement ables
 * Visual features: rounded corners, origin display, padding visualization
 * These ables add visual enhancements and UI feedback
 */

// Import ables
import BeforeRenderable from "../ables/BeforeRenderable";
import Default from "../ables/Default";
import Renderable from "../ables/Renderable";
import Roundable from "../ables/Roundable";
import Origin from "../ables/Origin";
import OriginDraggable from "../ables/OriginDraggable";
import Padding from "../ables/Padding";

// Visual ables
export { default as Roundable } from "../ables/Roundable";
export { default as Origin } from "../ables/Origin";
export { default as OriginDraggable } from "../ables/OriginDraggable";
export { default as Padding } from "../ables/Padding";

// Core requirements
export { default as BeforeRenderable } from "../ables/BeforeRenderable";
export { default as Default } from "../ables/Default";
export { default as Renderable } from "../ables/Renderable";

// Utility functions
export { makeMoveable } from "../makeMoveable";

// Preset for visual-focused usage
const VISUAL_ABLES = [
  BeforeRenderable,
  Default,
  Roundable,
  Origin,
  OriginDraggable,
  Padding,
  Renderable,
];

export { VISUAL_ABLES };