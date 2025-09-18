/**
 * Mathematical utility functions ported from @daybrush/utils
 */

import { TINY_NUM } from "../consts";

export function between(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
}

export function sum(numbers: number[]): number {
    return numbers.reduce((prev, cur) => prev + cur, 0);
}

export function average(numbers: number[]): number {
    return sum(numbers) / numbers.length;
}

export function getRad(pos1: number[], pos2: number[]): number {
    return Math.atan2(pos2[1] - pos1[1], pos2[0] - pos1[0]);
}

export function getDist(pos1: number[], pos2: number[]): number {
    return Math.sqrt(Math.pow(pos2[0] - pos1[0], 2) + Math.pow(pos2[1] - pos1[1], 2));
}

export function dot(a1: number, a2: number, b1: number, b2: number) {
    return (a1 * b2 + a2 * b1) / (b1 + b2);
}

export function throttle(num: number, unit: number) {
    if (!unit) {
        return num;
    }
    const reverseUnit = 1 / unit;
    return Math.round(num / unit) / reverseUnit;
}

export function throttleArray(nums: number[], unit: number): number[] {
    nums.forEach((_, i) => {
        nums[i] = throttle(nums[i], unit);
    });
    return nums;
}

export function calculateBoundSize(
    size: number[],
    minSize: number[],
    maxSize: number[],
    keepRatio?: number | boolean
): [number, number] {
    if (!keepRatio) {
        return [
            Math.max(minSize[0], Math.min(maxSize[0], size[0])),
            Math.max(minSize[1], Math.min(maxSize[1], size[1])),
        ];
    }
    const ratio = typeof keepRatio === "number" ? keepRatio : Math.min(size[1] / size[0]);
    const [width, height] = size;
    const [minWidth, minHeight] = minSize;
    const [maxWidth, maxHeight] = maxSize;

    const newWidth = Math.max(minWidth, Math.min(maxWidth, width));
    const newHeight = Math.max(minHeight, Math.min(maxHeight, height));

    if (ratio < 1) {
        // width > height
        const calculatedHeight = newWidth * ratio;

        if (calculatedHeight < minHeight) {
            return [minHeight / ratio, minHeight];
        } else if (calculatedHeight > maxHeight) {
            return [maxHeight / ratio, maxHeight];
        }
        return [newWidth, calculatedHeight];
    } else {
        // height >= width
        const calculatedWidth = newHeight / ratio;

        if (calculatedWidth < minWidth) {
            return [minWidth, minWidth * ratio];
        } else if (calculatedWidth > maxWidth) {
            return [maxWidth, maxWidth * ratio];
        }
        return [calculatedWidth, newHeight];
    }
}
