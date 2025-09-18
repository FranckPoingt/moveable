/**
 * Constants ported from @daybrush/utils
 */

export const FUNCTION = "function";
export const PROPERTY = "property";
export const ARRAY = "array";
export const OBJECT = "object";
export const STRING = "string";
export const NUMBER = "number";
export const UNDEFINED = "undefined";

export const IS_WINDOW = typeof window !== UNDEFINED;

const doc = (typeof document !== UNDEFINED && document) as Document;
export { doc as document };

const prefixes: string[] = ["webkit", "ms", "moz", "o"];

export const getCrossBrowserProperty = (property: string) => {
    if (!doc) {
        return "";
    }
    const styles = (doc.body || doc.documentElement).style as any;
    const length = prefixes.length;

    if (typeof styles[property] !== UNDEFINED) {
        return property;
    }
    for (let i = 0; i < length; ++i) {
        const name = `-${prefixes[i]}-${property}`;

        if (typeof styles[name] !== UNDEFINED) {
            return name;
        }
    }
    return "";
};

export const TRANSFORM = /*#__PURE__*/getCrossBrowserProperty("transform");
export const FILTER = /*#__PURE__*/getCrossBrowserProperty("filter");
export const ANIMATION = /*#__PURE__*/getCrossBrowserProperty("animation");
export const KEYFRAMES = /*#__PURE__*/ANIMATION.replace("animation", "keyframes");

// Note: TINY_NUM is already defined in ../consts.ts with value 0.0000001
// We'll use the existing one to avoid conflicts