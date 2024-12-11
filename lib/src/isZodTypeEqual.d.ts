import { AnyZodObject, ZodArray, ZodBoolean, ZodDate, ZodDefaultDef, ZodNumber, ZodString, z } from "zod";
import { RTFSupportedZodTypes } from "./supportedZodTypes";
export declare function isZodTypeEqual(_a: RTFSupportedZodTypes, _b: RTFSupportedZodTypes): boolean;
export declare function isZodString(zodType: RTFSupportedZodTypes): zodType is ZodString;
export declare function isZodNumber(zodType: RTFSupportedZodTypes): zodType is ZodNumber;
export declare function isZodBoolean(zodType: RTFSupportedZodTypes): zodType is ZodBoolean;
export declare function isZodArray(zodType: RTFSupportedZodTypes): zodType is ZodArray<any>;
export declare function isZodObject(zodType: RTFSupportedZodTypes): zodType is AnyZodObject;
export declare function isZodDefaultDef(zodDef: unknown): zodDef is ZodDefaultDef;
export declare function isZodDate(zodType: RTFSupportedZodTypes): zodType is ZodDate;
export declare function isTypeOf(zodType: RTFSupportedZodTypes, type: ZodKindName): boolean;
type ZodKindName = keyof typeof z.ZodFirstPartyTypeKind;
export type ZodKindNameToType<K extends keyof typeof z.ZodFirstPartyTypeKind> = InstanceType<(typeof z)[K]>;
export type RTFSupportedZodFirstPartyTypeKindMap = {
    [K in ZodKindName as ZodKindNameToType<K> extends RTFSupportedZodTypes ? K : never]: ZodKindNameToType<K>;
};
export type RTFSupportedZodFirstPartyTypeKind = keyof RTFSupportedZodFirstPartyTypeKindMap;
export {};
