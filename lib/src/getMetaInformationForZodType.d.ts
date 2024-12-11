import { RTFSupportedZodTypes } from "./supportedZodTypes";
export declare const SPLIT_DESCRIPTION_SYMBOL = " // ";
export declare function parseDescription(description?: string): {
    label: string;
    placeholder: string | undefined;
} | undefined;
export declare function getEnumValues(type: RTFSupportedZodTypes): readonly string[] | undefined;
export declare function getMetaInformationForZodType(type: RTFSupportedZodTypes): {
    description: {
        label: string;
        placeholder: string | undefined;
    } | undefined;
    enumValues: readonly string[] | undefined;
};
