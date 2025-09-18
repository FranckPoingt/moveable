/**
 * DOM utility functions ported from @daybrush/utils
 */

import { document } from "./constants";

export function $<K extends keyof HTMLElementTagNameMap>(
    selectors: K,
    multi: true
): NodeListOf<HTMLElementTagNameMap[K]>;
export function $<K extends keyof SVGElementTagNameMap>(selectors: K, multi: true): NodeListOf<SVGElementTagNameMap[K]>;
export function $<E extends Element = Element>(selectors: string, multi: true): NodeListOf<E>;

export function $<K extends keyof HTMLElementTagNameMap>(selectors: K, multi?: false): HTMLElementTagNameMap[K] | null;
export function $<K extends keyof SVGElementTagNameMap>(selectors: K, multi?: false): SVGElementTagNameMap[K] | null;
export function $<E extends Element = Element>(selectors: string, multi?: false): E | null;

export function $<E extends Element = Element>(selectors: string, multi?: boolean): E | NodeListOf<E> | null {
    if (!document) {
        return multi ? ([] as any) : null;
    }
    return multi ? document.querySelectorAll<E>(selectors) : document.querySelector<E>(selectors);
}

export function hasClass(element: Element, className: string) {
    if (element.classList) {
        return element.classList.contains(className);
    }
    return !!element.className.match(new RegExp(`(\\s|^)${className}(\\s|$)`));
}

export function addClass(element: Element, className: string) {
    if (element.classList) {
        element.classList.add(className);
    } else {
        element.className += ` ${className}`;
    }
}

export function removeClass(element: Element, className: string) {
    if (element.classList) {
        element.classList.remove(className);
    } else {
        const reg = new RegExp(`(\\s|^)${className}(\\s|$)`);
        element.className = element.className.replace(reg, " ");
    }
}

export function getDocument(el?: Node): Document {
    return el?.ownerDocument || document;
}

export function getWindow(el?: Node): Window | undefined {
    return el?.ownerDocument?.defaultView || window;
}

export function getDocumentBody(el?: Node): HTMLElement | null {
    return getDocument(el)?.body || null;
}

export function getDocumentElement(el?: Node): HTMLElement | null {
    return getDocument(el)?.documentElement || null;
}
