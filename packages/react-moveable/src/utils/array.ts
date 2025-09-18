/**
 * Array utility functions ported from @daybrush/utils
 */

import { isArray } from "./typeChecks";
import type { FlattedElement } from "./types";

export function toArray<T>(value: T | T[]): T[] {
    return isArray(value) ? value : [value];
}

export function findIndex<T>(arr: T[], callback: (element: T, index: number, arr: T[]) => any): number {
    const length = arr.length;

    for (let i = 0; i < length; ++i) {
        if (callback(arr[i], i, arr)) {
            return i;
        }
    }
    return -1;
}

export function findLastIndex<T>(arr: T[], callback: (element: T, index: number, arr: T[]) => any): number {
    const length = arr.length;

    for (let i = length - 1; i >= 0; --i) {
        if (callback(arr[i], i, arr)) {
            return i;
        }
    }
    return -1;
}

export function find<T>(arr: T[], callback: (element: T, index: number, arr: T[]) => any): T | undefined {
    const index = findIndex(arr, callback);

    return index > -1 ? arr[index] : undefined;
}

export function findLast<T>(arr: T[], callback: (element: T, index: number, arr: T[]) => any): T | undefined {
    const index = findLastIndex(arr, callback);

    return index > -1 ? arr[index] : undefined;
}

export function getKeys(obj: object): string[] {
    return Object.keys(obj);
}

export function getValues<T>(obj: { [key: string]: T }): T[] {
    return Object.values(obj);
}

export function getEntries<T>(obj: { [key: string]: T }): Array<[string, T]> {
    return Object.entries(obj);
}

export function flat<Type>(arr: Type[][]): Type[] {
    return arr.reduce((prev, cur) => {
        return prev.concat(cur);
    }, []);
}

export function deepFlat<T extends any[]>(arr: T): Array<FlattedElement<T[0]>> {
    return arr.reduce((prev, cur) => {
        if (isArray(cur)) {
            prev.push(...deepFlat(cur));
        } else {
            prev.push(cur);
        }
        return prev;
    }, [] as any[]);
}

export function pushSet<T>(arr: T[], item: T): T[] {
    if (arr.indexOf(item) === -1) {
        arr.push(item);
    }
    return arr;
}
