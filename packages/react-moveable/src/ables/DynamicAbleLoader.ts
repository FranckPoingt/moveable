import { Able } from "../types";

export interface AbleImporter {
    (): Promise<{ default: Able }>;
}

export interface AbleRegistry {
    [ableName: string]: AbleImporter;
}

// Registry of dynamic able imports
const ABLE_REGISTRY: AbleRegistry = {
    Draggable: () => import("./Draggable"),
    Resizable: () => import("./Resizable"),
    Rotatable: () => import("./Rotatable"),
    Scalable: () => import("./Scalable"),
    Warpable: () => import("./Warpable"),
    Pinchable: () => import("./Pinchable"),
    Snappable: () => import("./Snappable"),
    Scrollable: () => import("./Scrollable"),
    Clippable: () => import("./Clippable"),
    Roundable: () => import("./Roundable"),
    Origin: () => import("./Origin"),
    OriginDraggable: () => import("./OriginDraggable"),
    Padding: () => import("./Padding"),
    DragArea: () => import("./DragArea"),
    Clickable: () => import("./Clickable"),
    Groupable: () => import("./Groupable"),
    IndividualGroupable: () => import("./IndividualGroupable"),
    BeforeRenderable: () => import("./BeforeRenderable"),
    Renderable: () => import("./Renderable"),
    Default: () => import("./Default"),
    edgeDraggable: () => import("./edgeDraggable"),
};

// Cache for loaded ables
const ableCache = new Map<string, Able>();

/**
 * Dynamically loads an able by name
 */
export async function loadAble(ableName: string): Promise<Able> {
    // Return from cache if already loaded
    if (ableCache.has(ableName)) {
        return ableCache.get(ableName)!;
    }

    const importer = ABLE_REGISTRY[ableName];
    if (!importer) {
        throw new Error(`Unknown able: ${ableName}`);
    }

    try {
        const module = await importer();
        const able = module.default;
        ableCache.set(ableName, able);
        return able;
    } catch (error) {
        throw new Error(`Failed to load able ${ableName}: ${error}`);
    }
}

/**
 * Loads multiple ables in parallel
 */
export async function loadAbles(ableNames: string[]): Promise<Able[]> {
    const promises = ableNames.map(loadAble);
    return Promise.all(promises);
}

/**
 * Preloads ables for faster access later
 */
export function preloadAbles(ableNames: string[]): Promise<void[]> {
    return Promise.all(ableNames.map(async (name) => {
        try {
            await loadAble(name);
        } catch (error) {
            console.warn(`Failed to preload able ${name}:`, error);
        }
    }));
}

/**
 * Gets list of all available able names
 */
export function getAvailableAbleNames(): string[] {
    return Object.keys(ABLE_REGISTRY);
}

/**
 * Checks if an able is already loaded in cache
 */
export function isAbleLoaded(ableName: string): boolean {
    return ableCache.has(ableName);
}

/**
 * Clears the able cache (useful for testing or memory management)
 */
export function clearAbleCache(): void {
    ableCache.clear();
}