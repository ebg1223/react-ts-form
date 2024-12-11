import { Primitive as ZodPrimitive } from "zod";
import { RemoveNull } from "./typeUtilities";
type InternalKey = `_${string}`;
type Primitive = Exclude<ZodPrimitive, symbol>;
export type PickPrimitiveObjectProperties<T, TValue extends false | unknown = false> = {
    [K in keyof T as T[K] extends Exclude<Primitive, symbol> ? Exclude<K, InternalKey> : never]: TValue extends false ? T[K] : TValue;
};
type PickResult<T extends object, P extends object> = Pick<T, Extract<keyof P, keyof T>>;
export declare function pickPrimitiveObjectProperties<T extends object, TPick extends Partial<PickPrimitiveObjectProperties<T, true>>, TObj extends PickPrimitiveObjectProperties<T> = PickPrimitiveObjectProperties<T>, TResult extends RemoveNull<PickResult<TObj, TPick>> = RemoveNull<PickResult<TObj, TPick>>>(obj: T, pick: TPick): TResult;
export {};
