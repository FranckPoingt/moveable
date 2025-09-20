/**
 * Advanced transformation ables
 * Complex interactions: warp, clip, scale, rotate
 * Optimized for: 150-200KB bundle size (~40% reduction)
 */

// Import ables
import BeforeRenderable from "../ables/BeforeRenderable";
import Default from "../ables/Default";
import Renderable from "../ables/Renderable";
import Scalable from "../ables/Scalable";
import Rotatable from "../ables/Rotatable";
import Warpable from "../ables/Warpable";
import Clippable from "../ables/Clippable";

// Advanced transformation ables
export { default as Scalable } from "../ables/Scalable";
export { default as Rotatable } from "../ables/Rotatable";
export { default as Warpable } from "../ables/Warpable";
export { default as Clippable } from "../ables/Clippable";

// Core requirements (needed for advanced ables)
export { default as BeforeRenderable } from "../ables/BeforeRenderable";
export { default as Default } from "../ables/Default";
export { default as Renderable } from "../ables/Renderable";

// Utility functions
export { makeMoveable } from "../makeMoveable";

// Preset for advanced usage
const ADVANCED_ABLES = [
  BeforeRenderable,
  Default,
  Scalable,
  Rotatable,
  Warpable,
  Clippable,
  Renderable,
];

export { ADVANCED_ABLES };