import React from "react";
import { ReactNode } from "react";
import { Control, DeepPartial } from "react-hook-form";
import { RTFSupportedZodTypes } from "./supportedZodTypes";
import { UnwrapZodType } from "./unwrap";
import { RTFSupportedZodFirstPartyTypeKind, RTFSupportedZodFirstPartyTypeKindMap } from "./isZodTypeEqual";
import { PickPrimitiveObjectProperties } from "./utilities";
export declare const FieldContext: React.Context<{
    control: Control<any>;
    name: string;
    label?: string;
    placeholder?: string;
    enumValues?: string[];
    zodType: RTFSupportedZodTypes;
    addToCoerceUndefined: (v: string) => void;
    removeFromCoerceUndefined: (v: string) => void;
} | null>;
export declare function FieldContextProvider({ name, control, children, label, placeholder, enumValues, zodType, addToCoerceUndefined, removeFromCoerceUndefined, }: {
    name: string;
    control: Control<any>;
    label?: string;
    placeholder?: string;
    enumValues?: string[];
    children: ReactNode;
    zodType: RTFSupportedZodTypes;
    addToCoerceUndefined: (v: string) => void;
    removeFromCoerceUndefined: (v: string) => void;
}): React.JSX.Element;
export declare function useTsController<FieldType extends any>(): {
    error: import("./zodObjectErrors").RecursiveErrorType<FieldType> | undefined;
    field: {
        value: FieldType | undefined;
        onChange: (value: (FieldType extends Object ? true : false) extends true ? DeepPartial<FieldType> | undefined : FieldType | undefined) => void;
        name: string;
        ref: import("react-hook-form").RefCallBack;
        onBlur: import("react-hook-form").Noop;
        disabled?: boolean | undefined;
    };
    formState: import("react-hook-form").UseFormStateReturn<import("react-hook-form").FieldValues>;
    fieldState: import("react-hook-form").ControllerFieldState;
};
export declare function requiredDescriptionDataNotPassedError(name: string, hookName: string): string;
export declare function useDescription(): {
    label: string | undefined;
    placeholder: string | undefined;
};
export declare function useReqDescription(): {
    label: string;
    placeholder: string;
};
export declare function enumValuesNotPassedError(): string;
export declare function fieldSchemaMismatchHookError(hookName: string, { expectedType, receivedType }: {
    expectedType: string;
    receivedType: string;
}): string;
export declare function useEnumValues(): string[];
export declare function internal_useFieldInfo<TZodType extends RTFSupportedZodTypes = RTFSupportedZodTypes, TUnwrappedZodType extends UnwrapZodType<TZodType> = UnwrapZodType<TZodType>>(hookName: string): {
    label: string | undefined;
    placeholder: string | undefined;
    type: TUnwrapZodType;
    zodType: TZodType;
    uniqueId: string | undefined;
    isOptional: boolean;
    isNullable: boolean;
    defaultValue: import("zod").util.noUndefined<TZodType["_input"]> | undefined;
};
export declare function useFieldInfo(): {
    label: string | undefined;
    placeholder: string | undefined;
    type: TUnwrapZodType;
    zodType: RTFSupportedZodTypes;
    uniqueId: string | undefined;
    isOptional: boolean;
    isNullable: boolean;
    defaultValue: any;
};
export declare function usePickZodFields<TZodKindName extends RTFSupportedZodFirstPartyTypeKind, TZodType extends RTFSupportedZodFirstPartyTypeKindMap[TZodKindName] = RTFSupportedZodFirstPartyTypeKindMap[TZodKindName], TUnwrappedZodType extends UnwrapZodType<TZodType> = UnwrapZodType<TZodType>, TPick extends Partial<PickPrimitiveObjectProperties<TUnwrappedZodType, true>> = Partial<PickPrimitiveObjectProperties<TUnwrappedZodType, true>>>(zodKindName: TZodKindName, pick: TPick, hookName: string): import("./typeUtilities").ExpandRecursively<(Extract<keyof TPick, keyof PickPrimitiveObjectProperties<TUnwrappedZodType, false>> extends infer T_2 extends keyof PickPrimitiveObjectProperties<TUnwrappedZodType, false> ? { [P in T_2]: PickPrimitiveObjectProperties<TUnwrappedZodType, false>[P]; } : never) extends infer T ? { [K in keyof T]: import("./typeUtilities").NullToUndefined<(Extract<keyof TPick, keyof PickPrimitiveObjectProperties<TUnwrappedZodType, false>> extends infer T_1 extends keyof PickPrimitiveObjectProperties<TUnwrappedZodType, false> ? { [P in T_1]: PickPrimitiveObjectProperties<TUnwrappedZodType, false>[P]; } : never)[K]>; } : never> & {
    label: string | undefined;
    placeholder: string | undefined;
    type: TUnwrapZodType;
    zodType: TZodType;
    uniqueId: string | undefined;
    isOptional: boolean;
    isNullable: boolean;
    defaultValue: import("zod").util.noUndefined<TZodType["_input"]> | undefined;
};
export declare function useStringFieldInfo(): {
    readonly isDatetime: boolean;
    readonly isEmail: boolean;
    readonly isURL: boolean;
    readonly isEmoji: boolean;
    readonly isUUID: boolean;
    readonly isCUID: boolean;
    readonly isCUID2: boolean;
    readonly isULID: boolean;
    readonly isIP: boolean;
    readonly minLength: number | null;
    readonly maxLength: number | null;
    readonly description: string | undefined;
} & {
    label: string | undefined;
    placeholder: string | undefined;
    type: TUnwrapZodType;
    zodType: import("zod").ZodString;
    uniqueId: string | undefined;
    isOptional: boolean;
    isNullable: boolean;
    defaultValue: string | undefined;
};
export declare function useArrayFieldInfo(): {
    readonly description: string | undefined;
} & {
    label: string | undefined;
    placeholder: string | undefined;
    type: TUnwrapZodType;
    zodType: import("zod").ZodArray<import("zod").ZodTypeAny, import("zod").ArrayCardinality>;
    uniqueId: string | undefined;
    isOptional: boolean;
    isNullable: boolean;
    defaultValue: any[] | [any, ...any[]] | undefined;
};
export declare function useDateFieldInfo(): {
    maxDate: Date | null;
    minDate: Date | null;
    description: string | undefined;
    label: string | undefined;
    placeholder: string | undefined;
    type: TUnwrapZodType;
    zodType: import("zod").ZodDate;
    uniqueId: string | undefined;
    isOptional: boolean;
    isNullable: boolean;
    defaultValue: Date | undefined;
};
export declare function useNumberFieldInfo(): {
    readonly description: string | undefined;
    readonly minValue: number | null;
    readonly maxValue: number | null;
    readonly isInt: boolean;
    readonly isFinite: boolean;
} & {
    label: string | undefined;
    placeholder: string | undefined;
    type: TUnwrapZodType;
    zodType: import("zod").ZodNumber;
    uniqueId: string | undefined;
    isOptional: boolean;
    isNullable: boolean;
    defaultValue: number | undefined;
};
