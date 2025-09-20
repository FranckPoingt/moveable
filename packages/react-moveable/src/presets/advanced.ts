/**
 * Advanced preset with transformation capabilities
 * Bundle size: ~150-200KB (vs 336KB full)
 */

import { InitialMoveable } from "../InitialMoveable";
import { MoveableProps } from "../types";
import Default from "../ables/Default";
import BeforeRenderable from "../ables/BeforeRenderable";
import Draggable from "../ables/Draggable";
import Resizable from "../ables/Resizable";
import Rotatable from "../ables/Rotatable";
import Scalable from "../ables/Scalable";
import Warpable from "../ables/Warpable";
import Clippable from "../ables/Clippable";
import Snappable from "../ables/Snappable";
import Renderable from "../ables/Renderable";

export const AdvancedAbles = [
    BeforeRenderable,
    Default,
    Snappable,
    Draggable,
    Resizable,
    Rotatable,
    Scalable,
    Warpable,
    Clippable,
    Renderable,
] as const;

export class AdvancedMoveable extends InitialMoveable<MoveableProps> {
    public static defaultAbles = AdvancedAbles;
}

export default AdvancedMoveable;