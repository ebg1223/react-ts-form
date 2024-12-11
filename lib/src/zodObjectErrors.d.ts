export type NonArrayObject = object & {
    length?: never;
};
export type RecursiveErrorType<T extends any> = T extends object ? {
    errorMessage?: string;
} & {
    [key in keyof T]+?: RecursiveErrorType<T[key]>;
} : {
    errorMessage: string;
};
export declare function errorFromRhfErrorObject<T>(o: any): RecursiveErrorType<T> | undefined;
