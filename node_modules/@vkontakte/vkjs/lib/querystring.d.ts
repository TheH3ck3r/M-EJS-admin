export interface ParsedQuery<T = string> {
    [key: string]: T | T[] | null;
}
declare function parse(query: string | any): ParsedQuery;
declare type StringifyQueryItem = string | boolean | number | null | undefined;
declare type StringifyQuery = Record<string, StringifyQueryItem | readonly StringifyQueryItem[]>;
interface StringifyOptions {
    encode?: boolean;
    skipNull?: true;
}
declare function stringify(data: StringifyQuery, options?: StringifyOptions): string;
export declare const querystring: {
    parse: typeof parse;
    stringify: typeof stringify;
};
export {};
