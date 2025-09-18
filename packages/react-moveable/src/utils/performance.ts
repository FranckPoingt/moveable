/**
 * Performance and timing utility functions ported from @daybrush/utils
 */

let firstTime = Date.now();

export function requestAnimationFrame(callback: FrameRequestCallback): number {
    if (typeof window !== "undefined" && window.requestAnimationFrame) {
        return window.requestAnimationFrame(callback);
    }

    return setTimeout(() => {
        const currentTime = Date.now();
        const timeToCall = Math.max(0, 16 - (currentTime - firstTime));
        const id = setTimeout(() => {
            callback(currentTime + timeToCall);
        }, timeToCall);
        firstTime = currentTime + timeToCall;
        return id;
    }, 0) as any;
}

export function cancelAnimationFrame(id: number): void {
    if (typeof window !== "undefined" && window.cancelAnimationFrame) {
        return window.cancelAnimationFrame(id);
    }

    clearTimeout(id);
}

export function counter(count: number): number[] {
    const result: number[] = [];
    for (let i = 0; i < count; i++) {
        result.push(i);
    }
    return result;
}
