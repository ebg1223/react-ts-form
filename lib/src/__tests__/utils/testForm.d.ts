import React from "react";
import { Control } from "react-hook-form";
import { z } from "zod";
export declare const textFieldTestId = "text-field";
export declare function TextField(props: {
    control: Control<any>;
    name: string;
    testId?: string;
    label?: string;
    placeholder?: string;
}): React.JSX.Element;
declare function BooleanField(props: {
    control: Control<any>;
    name: string;
    testId: string;
}): React.JSX.Element;
declare function NumberField(props: {
    control: Control<any>;
    name: string;
    testId: string;
}): React.JSX.Element;
export declare const customFieldTestId = "custom";
declare function CustomTextField(props: {
    control: Control<any>;
    name: string;
    aCustomField: string;
    testId: string;
}): React.JSX.Element;
export declare const enumFieldValues: readonly ["a", "b", "c"];
declare function EnumField({ enumValues, label, placeholder, }: {
    enumValues?: string[];
    label?: string;
    placeholder?: string;
}): React.JSX.Element;
export declare const TestCustomFieldSchema: z.ZodBranded<z.ZodString, "id">;
export declare const TestForm: <SchemaType extends import("../../createSchemaForm").RTFFormSchemaType>(props: import("../../createSchemaForm").RTFFormProps<readonly [readonly [z.ZodString, typeof TextField], readonly [z.ZodBoolean, typeof BooleanField], readonly [z.ZodNumber, typeof NumberField], readonly [z.ZodBranded<z.ZodString, "id">, typeof CustomTextField], readonly [z.ZodEnum<["a", "b", "c"]>, typeof EnumField]], SchemaType, readonly [readonly ["name", "name"], readonly ["control", "control"], readonly ["enumValues", "enumValues"], readonly ["descriptionLabel", "label"], readonly ["descriptionPlaceholder", "placeholder"]], "form">) => React.ReactElement<any, any>;
export declare const TestFormWithSubmit: <SchemaType extends import("../../createSchemaForm").RTFFormSchemaType>(props: import("../../createSchemaForm").RTFFormProps<readonly [readonly [z.ZodString, typeof TextField], readonly [z.ZodBoolean, typeof BooleanField], readonly [z.ZodNumber, typeof NumberField], readonly [z.ZodBranded<z.ZodString, "id">, typeof CustomTextField], readonly [z.ZodEnum<["a", "b", "c"]>, typeof EnumField]], SchemaType, readonly [readonly ["name", "name"], readonly ["control", "control"], readonly ["enumValues", "enumValues"], readonly ["descriptionLabel", "label"], readonly ["descriptionPlaceholder", "placeholder"]], ({ children, ...props }: {
    children: JSX.Element[];
    onSubmit: () => void;
}) => React.JSX.Element>) => React.ReactElement<any, any>;
export {};
