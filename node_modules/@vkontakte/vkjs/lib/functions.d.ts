export declare const noop: () => void;
export declare function throttle<T extends any[]>(fn: (...args: T) => unknown, threshold?: number, scope?: Window & typeof globalThis): (...args: T) => void;
export declare function debounce<T extends any[]>(fn: (...args: T) => unknown, delay: number, context?: Window & typeof globalThis): (...a: T) => void;
