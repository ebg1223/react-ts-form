import { z, ZodBranded } from "zod";
import { RTFSupportedZodTypes } from "./supportedZodTypes";
export declare const HIDDEN_ID_PROPERTY = "_rtf_id";
export type HiddenProperties = {
    [HIDDEN_ID_PROPERTY]: string;
};
export type SchemaWithHiddenProperties<T extends RTFSupportedZodTypes> = T & {
    _def: T["_def"] & HiddenProperties;
};
export declare function isSchemaWithHiddenProperties<T extends RTFSupportedZodTypes>(schemaType: T): schemaType is SchemaWithHiddenProperties<T>;
export declare function addHiddenProperties<ID extends string, T extends RTFSupportedZodTypes>(schema: T, properties: HiddenProperties): ZodBranded<T, ID>;
export declare function duplicateIdErrorMessage(id: string): string;
export declare function createUniqueFieldSchema<T extends RTFSupportedZodTypes, Identifier extends string>(schema: T, id: Identifier): z.ZodBranded<T, Identifier>;
export declare function createUniqueFieldSchemaWithoutBrand<T extends RTFSupportedZodTypes, Identifier extends string>(schema: T, id: Identifier): T;
