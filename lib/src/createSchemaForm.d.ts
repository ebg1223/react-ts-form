import React, { ForwardRefExoticComponent, ReactElement, ReactNode, RefAttributes } from "react";
import { ComponentProps } from "react";
import { DeepPartial, UseFormReturn } from "react-hook-form";
import { AnyZodObject, z, ZodEffects } from "zod";
import { DistributiveOmit, IndexOf, IndexOfUnwrapZodType, RequireKeysWithRequiredChildren, UnwrapMapping } from "./typeUtilities";
import { RTFBaseZodType, RTFSupportedZodTypes } from "./supportedZodTypes";
export type ReactProps = Record<string, any>;
export type ReactComponentWithRequiredProps<Props extends ReactProps> = ((props: Props) => JSX.Element) | (ForwardRefExoticComponent<Props> & RefAttributes<unknown>);
export type MappingItem<PropType extends ReactProps> = readonly [
    RTFBaseZodType,
    ReactComponentWithRequiredProps<PropType>
];
export type FormComponentMapping = readonly MappingItem<any>[];
export type MappableProp = "control" | "name" | "enumValues" | "descriptionLabel" | "descriptionPlaceholder";
export type PropsMapping = readonly (readonly [MappableProp, string])[];
export declare function noMatchingSchemaErrorMessage(propertyName: string, propertyType: string): string;
export declare function useFormResultValueChangedErrorMesssage(): string;
export type FormComponent = "form" | ((props: any) => JSX.Element);
export type ExtraProps = {
    beforeElement?: ReactNode;
    afterElement?: ReactNode;
};
export type UnwrapEffects<T extends RTFSupportedZodTypes | ZodEffects<any, any>> = T extends AnyZodObject ? T : T extends ZodEffects<infer EffectsSchema, any> ? EffectsSchema extends ZodEffects<infer EffectsSchemaInner, any> ? EffectsSchemaInner : EffectsSchema : never;
declare const defaultPropsMap: readonly [readonly ["name", "name"], readonly ["control", "control"], readonly ["enumValues", "enumValues"]];
export type RTFFormSchemaType = z.AnyZodObject | ZodEffects<any, any>;
export type RTFFormSubmitFn<SchemaType extends RTFFormSchemaType> = (values: z.infer<SchemaType>) => void | Promise<void>;
export type SchemaShape<SchemaType extends RTFSupportedZodTypes | ZodEffects<any, any>> = ReturnType<UnwrapEffects<SchemaType>["_def"]["shape"]>;
export type IndexOfSchemaInMapping<Mapping extends FormComponentMapping, SchemaType extends RTFSupportedZodTypes | ZodEffects<any, any>, key extends keyof z.infer<UnwrapEffects<SchemaType>>> = IndexOf<UnwrapMapping<Mapping>, readonly [IndexOfUnwrapZodType<SchemaShape<SchemaType>[key]>, any]>;
export type GetTupleFromMapping<Mapping extends FormComponentMapping, SchemaType extends RTFSupportedZodTypes | ZodEffects<any, any>, key extends keyof z.infer<UnwrapEffects<SchemaType>>> = IndexOfSchemaInMapping<Mapping, SchemaType, key> extends never ? never : Mapping[IndexOfSchemaInMapping<Mapping, SchemaType, key>];
export type Prev = [never, 0, 1, 2, 3];
export type MaxDefaultRecursionDepth = 1;
export type PropType<Mapping extends FormComponentMapping, SchemaType extends RTFSupportedZodTypes | ZodEffects<any, any>, PropsMapType extends PropsMapping = typeof defaultPropsMap, Level extends Prev[number] = MaxDefaultRecursionDepth> = [Level] extends [never] ? never : RequireKeysWithRequiredChildren<Partial<{
    [key in keyof z.infer<UnwrapEffects<SchemaType>>]: GetTupleFromMapping<Mapping, SchemaType, key> extends never ? UnwrapEffects<SchemaType>["shape"][key] extends z.AnyZodObject ? PropType<Mapping, UnwrapEffects<SchemaType>["shape"][key], PropsMapType, Prev[Level]> : UnwrapEffects<SchemaType>["shape"][key] extends z.ZodArray<any> ? PropType<Mapping, UnwrapEffects<SchemaType>["shape"][key]["element"], PropsMapType, Prev[Level]> : never : GetTupleFromMapping<Mapping, SchemaType, key> extends readonly [
        any,
        any
    ] ? DistributiveOmit<ComponentProps<GetTupleFromMapping<Mapping, SchemaType, key>[1]>, PropsMapType[number][1]> & ExtraProps : never;
}>>;
export type RenderedFieldMap<SchemaType extends AnyZodObject | ZodEffects<any, any>, Level extends Prev[number] = MaxDefaultRecursionDepth> = [Level] extends [never] ? never : {
    [key in keyof z.infer<UnwrapEffects<SchemaType>>]: UnwrapEffects<SchemaType>["shape"][key] extends z.AnyZodObject ? RenderedFieldMap<UnwrapEffects<SchemaType>["shape"][key], Prev[Level]> : UnwrapEffects<SchemaType>["shape"][key] extends z.ZodArray<any> ? UnwrapEffects<SchemaType>["shape"][key]["element"] extends z.AnyZodObject ? RenderedFieldMap<UnwrapEffects<SchemaType>["shape"][key]["element"], Prev[Level]>[] : JSX.Element[] : JSX.Element;
};
export type CustomChildRenderProp<SchemaType extends RTFFormSchemaType> = (fieldMap: RenderedFieldMap<SchemaType>) => ReactElement<any, any> | null;
export type RTFFormProps<Mapping extends FormComponentMapping, SchemaType extends z.AnyZodObject | ZodEffects<any, any>, PropsMapType extends PropsMapping = typeof defaultPropsMap, FormType extends FormComponent = "form"> = {
    schema: SchemaType;
    onSubmit: RTFFormSubmitFn<SchemaType>;
    defaultValues?: DeepPartial<z.infer<UnwrapEffects<SchemaType>>>;
    renderAfter?: (vars: {
        submit: () => void;
    }) => ReactNode;
    renderBefore?: (vars: {
        submit: () => void;
    }) => ReactNode;
    form?: UseFormReturn<z.infer<SchemaType>>;
    children?: CustomChildRenderProp<SchemaType>;
} & RequireKeysWithRequiredChildren<{
    props?: PropType<Mapping, SchemaType, PropsMapType>;
}> & RequireKeysWithRequiredChildren<{
    formProps?: DistributiveOmit<ComponentProps<FormType>, "children" | "onSubmit">;
}>;
export declare function createTsForm<Mapping extends FormComponentMapping, PropsMapType extends PropsMapping = typeof defaultPropsMap, FormType extends FormComponent = "form">(componentMap: Mapping, options?: {
    FormComponent?: FormType;
    propsMap?: PropsMapType;
}): <SchemaType extends RTFFormSchemaType>(props: RTFFormProps<Mapping, SchemaType, PropsMapType, FormType>) => React.ReactElement<any, any>;
export type RenderedElement = JSX.Element | JSX.Element[] | RenderedObjectElements | RenderedElement[];
export type RenderedObjectElements = {
    [key: string]: RenderedElement;
};
export declare function flattenRenderedElements(val: RenderedElement): JSX.Element[];
export {};
