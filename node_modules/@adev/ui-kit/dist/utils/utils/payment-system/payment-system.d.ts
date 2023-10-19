export declare const enum PaymentSystem {
    Visa = "visa",
    Electron = "electron",
    Mastercard = "mastercard",
    Maestro = "maestro",
    Mir = "mir"
}
export type PaymentSystemT = "visa" | "electron" | "mastercard" | "maestro" | "mir";
export declare function getPaymentSystem(cardNumber: string): PaymentSystem | null;
export declare function isMaestro(three: number, two: number, one: number): boolean;
export declare function isMastercard(four: number, two: number, one: number): boolean;
export declare function isMir(four: number): boolean;
export declare function isElectron(four: number): boolean;
export declare function isVisa(one: number): boolean;
