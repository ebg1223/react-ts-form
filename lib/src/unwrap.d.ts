import { ZodArray, ZodDefault, ZodEnum, ZodNullable, ZodOptional } from "zod";
import { HIDDEN_ID_PROPERTY } from "./createFieldSchema";
import { RTFSupportedZodTypes } from "./supportedZodTypes";
export type UnwrappedRTFSupportedZodTypes = {
    type: RTFSupportedZodTypes;
    [HIDDEN_ID_PROPERTY]: string | null;
};
export declare function unwrap(type: RTFSupportedZodTypes): UnwrappedRTFSupportedZodTypes;
export declare function unwrapEffects(effects: RTFSupportedZodTypes): any;
export type UnwrapPreviousLevel = [never, 0, 1, 2, 3];
export type UnwrapMaxRecursionDepth = 3;
export type UnwrapZodType<T extends RTFSupportedZodTypes, Level extends UnwrapPreviousLevel[number] = UnwrapMaxRecursionDepth> = [Level] extends [never] ? never : T extends ZodOptional<any> | ZodNullable<any> | ZodDefault<any> ? UnwrapZodType<T["_def"]["innerType"], UnwrapPreviousLevel[Level]> : T extends ZodArray<any, any> ? ZodArray<UnwrapZodType<T["element"], UnwrapMaxRecursionDepth>> : T extends ZodEnum<any> ? ZodEnum<any> : T;
