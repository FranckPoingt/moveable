/**
 * Full preset with all ables included
 * Bundle size: ~336KB (same as original, but better caching)
 */

import { InitialMoveable } from "../InitialMoveable";
import { MoveableProps } from "../types";
import { MOVEABLE_ABLES } from "../ables/consts";

export const FullAbles = MOVEABLE_ABLES;

export class FullMoveable extends InitialMoveable<MoveableProps> {
    public static defaultAbles = FullAbles;
}

export default FullMoveable;