import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useController, } from "react-hook-form";
import { errorFromRhfErrorObject } from "./zodObjectErrors";
import { unwrap } from "./unwrap";
import { isTypeOf, isZodArray, isZodDefaultDef, } from "./isZodTypeEqual";
import { pickPrimitiveObjectProperties, } from "./utilities";
export const FieldContext = createContext(null);
export function FieldContextProvider({ name, control, children, label, placeholder, enumValues, zodType, addToCoerceUndefined, removeFromCoerceUndefined, }) {
    return (React.createElement(FieldContext.Provider, { value: {
            control,
            name,
            label,
            placeholder,
            enumValues,
            zodType,
            addToCoerceUndefined,
            removeFromCoerceUndefined,
        } }, children));
}
function useContextProt(name) {
    const context = useContext(FieldContext);
    if (!context)
        throw Error(`${name} must be called from within a FieldContextProvider... if you use this hook, the component must be rendered by @ts-react/form.`);
    return context;
}
export function useTsController() {
    const context = useContextProt("useTsController");
    const controller = useController(context);
    const { fieldState, field: { onChange, value }, } = controller;
    const [isUndefined, setIsUndefined] = useState(false);
    function _onChange(value) {
        if (value === undefined) {
            setIsUndefined(true);
            context.addToCoerceUndefined(context.name);
        }
        else {
            setIsUndefined(false);
            context.removeFromCoerceUndefined(context.name);
            onChange(value);
        }
    }
    useEffect(() => {
        if (value && isUndefined) {
            setIsUndefined(false);
            context.removeFromCoerceUndefined(context.name);
        }
    }, [value]);
    return Object.assign(Object.assign({}, controller), { error: errorFromRhfErrorObject(fieldState.error), field: Object.assign(Object.assign({}, controller.field), { value: isUndefined ? undefined : controller.field.value, onChange: _onChange }) });
}
export function requiredDescriptionDataNotPassedError(name, hookName) {
    return `No ${name} found when calling ${hookName}. Either pass it as a prop or pass it using the zod .describe() syntax.`;
}
export function useDescription() {
    const { label, placeholder } = useContextProt("useReqDescription");
    return {
        label,
        placeholder,
    };
}
export function useReqDescription() {
    const { label, placeholder } = useContextProt("useReqDescription");
    if (!label) {
        throw new Error(requiredDescriptionDataNotPassedError("label", "useReqDescription"));
    }
    if (!placeholder) {
        throw new Error(requiredDescriptionDataNotPassedError("placeholder", "useReqDescription"));
    }
    return {
        label,
        placeholder,
    };
}
export function enumValuesNotPassedError() {
    return `Enum values not passed. Any component that calls useEnumValues should be rendered from an '.enum()' zod field.`;
}
export function fieldSchemaMismatchHookError(hookName, { expectedType, receivedType }) {
    return `Make sure that the '${hookName}' hook is being called inside of a custom form component which matches the correct type.
  The expected type is '${expectedType}' but the received type was '${receivedType}'`;
}
export function useEnumValues() {
    const { enumValues } = useContextProt("useEnumValues");
    if (!enumValues)
        throw new Error(enumValuesNotPassedError());
    return enumValues;
}
function getFieldInfo(zodType) {
    const { type, _rtf_id } = unwrap(zodType);
    function getDefaultValue() {
        const def = zodType._def;
        if (isZodDefaultDef(def)) {
            const defaultValue = def.defaultValue();
            return defaultValue;
        }
        return undefined;
    }
    return {
        type: type,
        zodType,
        uniqueId: _rtf_id !== null && _rtf_id !== void 0 ? _rtf_id : undefined,
        isOptional: zodType.isOptional(),
        isNullable: zodType.isNullable(),
        defaultValue: getDefaultValue(),
    };
}
export function internal_useFieldInfo(hookName) {
    const { zodType, label, placeholder } = useContextProt(hookName);
    const fieldInfo = getFieldInfo(zodType);
    return Object.assign(Object.assign({}, fieldInfo), { label, placeholder });
}
export function useFieldInfo() {
    return internal_useFieldInfo("useFieldInfo");
}
export function usePickZodFields(zodKindName, pick, hookName) {
    const fieldInfo = internal_useFieldInfo(hookName);
    function getType() {
        const { type } = fieldInfo;
        if (zodKindName !== "ZodArray" && isZodArray(type)) {
            const element = type.element;
            return element;
        }
        return type;
    }
    const type = getType();
    if (!isTypeOf(type, zodKindName)) {
        throw new Error(fieldSchemaMismatchHookError(hookName, {
            expectedType: zodKindName,
            receivedType: type._def.typeName,
        }));
    }
    return Object.assign(Object.assign({}, pickPrimitiveObjectProperties(type, pick)), fieldInfo);
}
export function useStringFieldInfo() {
    return usePickZodFields("ZodString", {
        description: true,
        isCUID: true,
        isCUID2: true,
        isDatetime: true,
        isEmail: true,
        isEmoji: true,
        isIP: true,
        isULID: true,
        isURL: true,
        isUUID: true,
        maxLength: true,
        minLength: true,
    }, "useStringFieldInfo");
}
export function useArrayFieldInfo() {
    return usePickZodFields("ZodArray", {
        description: true,
    }, "useArrayFieldInfo");
}
export function useDateFieldInfo() {
    const result = usePickZodFields("ZodDate", {
        description: true,
        maxDate: true,
        minDate: true,
    }, "useDateFieldInfo");
    return Object.assign(Object.assign({}, result), { maxDate: result.type.maxDate, minDate: result.type.minDate });
}
export function useNumberFieldInfo() {
    return usePickZodFields("ZodNumber", {
        description: true,
        isFinite: true,
        isInt: true,
        maxValue: true,
        minValue: true,
    }, "useNumberFieldInfo");
}
//# sourceMappingURL=FieldContext.js.map