/**
 * String utility functions ported from @daybrush/utils
 */

import type { SplitOptions, OpenCloseCharacter } from "./types";

export function camelize(str: string): string {
    return str.replace(/[\s-_]([a-z])/g, (all, letter) => letter.toUpperCase());
}

export function decamelize(str: string, separator = "-"): string {
    return str.replace(/([a-z])([A-Z])/g, (all, letter, letter2) => letter + separator + letter2.toLowerCase());
}

export function splitText(text: string, separator: string): string[] {
    return text.split(separator);
}

export function splitSpace(text: string): string[] {
    return text.split(/\s+/);
}

export function splitComma(text: string): string[] {
    // trim spaces around commas
    return text.split(/\s*,\s*/);
}

export function splitBracket(text: string): { prefix: string; value: string; suffix: string } {
    const matches = text.match(/([^(]*)\(([^)]*)\)(.*)/);
    if (matches) {
        return {
            prefix: matches[1],
            value: matches[2],
            suffix: matches[3],
        };
    }
    return {
        prefix: "",
        value: text,
        suffix: "",
    };
}

export function splitUnit(text: string): { value: number; unit: string } {
    const matches = text.match(/^([+-]?\d*\.?\d+)(.*)$/);
    return {
        value: matches ? parseFloat(matches[1]) : 0,
        unit: matches ? matches[2] || "" : "",
    };
}

export function convertUnitSize(pos: string, size: number): number {
    const { value, unit } = splitUnit(pos);

    if (unit === "%") {
        return size * value / 100;
    } else if (unit === "vw") {
        return window.innerWidth * value / 100;
    } else if (unit === "vh") {
        return window.innerHeight * value / 100;
    } else if (unit === "vmin") {
        return Math.min(window.innerWidth, window.innerHeight) * value / 100;
    } else if (unit === "vmax") {
        return Math.max(window.innerWidth, window.innerHeight) * value / 100;
    }

    return value;
}