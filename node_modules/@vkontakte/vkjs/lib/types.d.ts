export declare type Dictionary<T> = {
    [key: string]: T;
};
export declare type AnyFunction = (...args: any[]) => any;
export declare type SupportEvent<T extends keyof GlobalEventHandlersEventMap> = {
    supported: boolean;
    name: T;
};
export declare type TimeoutHandle = number | undefined;
export declare type Writeable<T> = {
    -readonly [P in keyof T]: T[P];
};
