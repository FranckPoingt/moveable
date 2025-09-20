/**
 * Basic preset for simple drag and resize operations
 * Bundle size: ~60-80KB (vs 336KB full)
 */

import { InitialMoveable } from "../InitialMoveable";
import { MoveableProps } from "../types";
import Default from "../ables/Default";
import BeforeRenderable from "../ables/BeforeRenderable";
import Draggable from "../ables/Draggable";
import Resizable from "../ables/Resizable";
import Renderable from "../ables/Renderable";

export const BasicAbles = [
    BeforeRenderable,
    Default,
    Draggable,
    Resizable,
    Renderable,
] as const;

export class BasicMoveable extends InitialMoveable<MoveableProps> {
    public static defaultAbles = BasicAbles;
}

export default BasicMoveable;