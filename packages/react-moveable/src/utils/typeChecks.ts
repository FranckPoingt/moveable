/**
 * Type checking utility functions ported from @daybrush/utils
 */

import { UNDEFINED, OBJECT, ARRAY, STRING, NUMBER, FUNCTION } from "./constants";

export function isUndefined(value: any): value is undefined {
    return typeof value === UNDEFINED;
}

export function isObject(value: any): value is object {
    return value && typeof value === OBJECT;
}

export function isArray(value: any): value is any[] {
    return Array.isArray(value);
}

export function isString(value: any): value is string {
    return typeof value === STRING;
}

export function isNumber(value: any): value is number {
    return typeof value === NUMBER;
}

export function isFunction(value: any): value is Function {
    return typeof value === FUNCTION;
}

export function isNode(el: any): el is Node {
    return !!(el && el.nodeType);
}

export function isWindow(el: any): el is Window {
    return el === window;
}