interface ClassNamesDictionary {
    [index: string]: boolean | undefined | null;
}
declare type ClassName = string | number | ClassNamesDictionary | boolean | undefined | null;
export declare function classNames(...args: ClassName[]): string;
export {};
