interface Bounds {
    top: number;
    left: number;
    width: number;
    height: number;
}
export declare function getOffsetRect(elem: HTMLElement | Text | null): Bounds;
export {};
