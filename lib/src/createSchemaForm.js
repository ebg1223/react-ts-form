var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { Fragment, useEffect, useRef, } from "react";
import { FormProvider, useForm, } from "react-hook-form";
import { ZodFirstPartyTypeKind, } from "zod";
import { getComponentForZodType } from "./getComponentForZodType";
import { zodResolver } from "@hookform/resolvers/zod";
import { getMetaInformationForZodType } from "./getMetaInformationForZodType";
import { unwrapEffects } from "./unwrap";
import { FieldContextProvider } from "./FieldContext";
import { isZodTypeEqual } from "./isZodTypeEqual";
import { duplicateTypeError, printWarningsForSchema } from "./logging";
import { duplicateIdErrorMessage, HIDDEN_ID_PROPERTY, isSchemaWithHiddenProperties, } from "./createFieldSchema";
export function noMatchingSchemaErrorMessage(propertyName, propertyType) {
    return `No matching zod schema for type \`${propertyType}\` found in mapping for property \`${propertyName}\`. Make sure there's a matching zod schema for every property in your schema.`;
}
export function useFormResultValueChangedErrorMesssage() {
    return `useFormResult prop changed - its value shouldn't changed during the lifetime of the component.`;
}
function checkForDuplicateTypes(array) {
    var combinations = array.flatMap((v, i) => array.slice(i + 1).map((w) => [v, w]));
    for (const [a, b] of combinations) {
        printWarningsForSchema(a);
        printWarningsForSchema(b);
        if (isZodTypeEqual(a, b)) {
            duplicateTypeError();
        }
    }
}
function checkForDuplicateUniqueFields(array) {
    let usedIdsSet = new Set();
    for (const type of array) {
        if (isSchemaWithHiddenProperties(type)) {
            if (usedIdsSet.has(type._def[HIDDEN_ID_PROPERTY]))
                throw new Error(duplicateIdErrorMessage(type._def[HIDDEN_ID_PROPERTY]));
            usedIdsSet.add(type._def[HIDDEN_ID_PROPERTY]);
        }
    }
}
const defaultPropsMap = [
    ["name", "name"],
    ["control", "control"],
    ["enumValues", "enumValues"],
];
function propsMapToObect(propsMap) {
    const r = {};
    for (const [mappable, toProp] of propsMap) {
        r[mappable] = toProp;
    }
    return r;
}
export function createTsForm(componentMap, options) {
    const ActualFormComponent = (options === null || options === void 0 ? void 0 : options.FormComponent)
        ? options.FormComponent
        : "form";
    const schemas = componentMap.map((e) => e[0]);
    checkForDuplicateTypes(schemas);
    checkForDuplicateUniqueFields(schemas);
    const propsMap = propsMapToObect((options === null || options === void 0 ? void 0 : options.propsMap) ? options.propsMap : defaultPropsMap);
    return function Component({ schema, onSubmit, props, formProps, defaultValues, renderAfter, renderBefore, form, children, }) {
        const useFormResultInitialValue = useRef(form);
        if (!!useFormResultInitialValue.current !== !!form) {
            throw new Error(useFormResultValueChangedErrorMesssage());
        }
        const resolver = zodResolver(schema);
        const _form = (() => {
            if (form)
                return form;
            const uf = useForm({
                resolver,
                defaultValues,
            });
            return uf;
        })();
        useEffect(() => {
            if (form && defaultValues) {
                form.reset(defaultValues);
            }
        }, []);
        const { control, handleSubmit, setError, getValues } = _form;
        const submitter = useSubmitter({
            resolver,
            onSubmit,
            setError,
        });
        const submitFn = handleSubmit(submitter.submit);
        function renderComponentForSchemaDeep(_type, props, key, prefixedKey, currentValue) {
            var _a, _b, _c, _d, _e;
            const type = unwrapEffects(_type);
            const Component = getComponentForZodType(type, componentMap);
            if (!Component) {
                if (isAnyZodObject(type)) {
                    const shape = type._def.shape();
                    return Object.entries(shape).reduce((accum, [subKey, subType]) => {
                        accum[subKey] = renderComponentForSchemaDeep(subType, props && props[subKey] ? props[subKey] : undefined, subKey, `${prefixedKey}.${subKey}`, currentValue && currentValue[subKey]);
                        return accum;
                    }, {});
                }
                if (isZodArray(type)) {
                    return ((_a = currentValue) !== null && _a !== void 0 ? _a : []).map((item, index) => {
                        return renderComponentForSchemaDeep(type.element, props, key, `${prefixedKey}[${index}]`, item);
                    });
                }
                throw new Error(noMatchingSchemaErrorMessage(key.toString(), type._def.typeName));
            }
            const meta = getMetaInformationForZodType(type);
            const fieldProps = props && props[key] ? props[key] : {};
            const { beforeElement, afterElement } = fieldProps;
            const mergedProps = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (propsMap.name && { [propsMap.name]: prefixedKey })), (propsMap.control && { [propsMap.control]: control })), (propsMap.enumValues && {
                [propsMap.enumValues]: meta.enumValues,
            })), (propsMap.descriptionLabel && {
                [propsMap.descriptionLabel]: (_b = meta.description) === null || _b === void 0 ? void 0 : _b.label,
            })), (propsMap.descriptionPlaceholder && {
                [propsMap.descriptionPlaceholder]: (_c = meta.description) === null || _c === void 0 ? void 0 : _c.placeholder,
            })), fieldProps);
            const ctxLabel = (_d = meta.description) === null || _d === void 0 ? void 0 : _d.label;
            const ctxPlaceholder = (_e = meta.description) === null || _e === void 0 ? void 0 : _e.placeholder;
            return (React.createElement(Fragment, { key: prefixedKey },
                beforeElement,
                React.createElement(FieldContextProvider, { control: control, name: prefixedKey, label: ctxLabel, zodType: type, placeholder: ctxPlaceholder, enumValues: meta.enumValues, addToCoerceUndefined: submitter.addToCoerceUndefined, removeFromCoerceUndefined: submitter.removeFromCoerceUndefined },
                    React.createElement(Component, Object.assign({ key: prefixedKey }, mergedProps))),
                afterElement));
        }
        function renderFields(schema, props) {
            const _schema = unwrapEffects(schema);
            const shape = _schema._def.shape();
            return Object.entries(shape).reduce((accum, [key, type]) => {
                const stringKey = key.toString();
                accum[stringKey] = renderComponentForSchemaDeep(type, props, stringKey, stringKey, getValues()[key]);
                return accum;
            }, {});
        }
        const renderedFields = renderFields(schema, props);
        return (React.createElement(FormProvider, Object.assign({}, _form),
            React.createElement(ActualFormComponent, Object.assign({}, formProps, { onSubmit: submitFn }),
                renderBefore && renderBefore({ submit: submitFn }),
                React.createElement(FormChildren, { renderedFields: renderedFields, customChildRenderProp: children }),
                renderAfter && renderAfter({ submit: submitFn }))));
    };
    function FormChildren({ customChildRenderProp, renderedFields, }) {
        return (React.createElement(React.Fragment, null, customChildRenderProp
            ? customChildRenderProp(renderedFields)
            : flattenRenderedElements(renderedFields)));
    }
}
function useSubmitter({ resolver, onSubmit, setError, }) {
    const coerceUndefinedFieldsRef = useRef(new Set());
    function addToCoerceUndefined(fieldName) {
        coerceUndefinedFieldsRef.current.add(fieldName);
    }
    function removeFromCoerceUndefined(fieldName) {
        coerceUndefinedFieldsRef.current.delete(fieldName);
    }
    function removeUndefined(data) {
        const r = Object.assign({}, data);
        for (const undefinedField of coerceUndefinedFieldsRef.current) {
            delete r[undefinedField];
        }
        return r;
    }
    function submit(data) {
        return resolver(removeUndefined(data), {}, {}).then((e) => __awaiter(this, void 0, void 0, function* () {
            const errorKeys = Object.keys(e.errors);
            if (!errorKeys.length) {
                yield onSubmit(e.values);
                return;
            }
            for (const key of errorKeys) {
                setError(key, e.errors[key]);
            }
        }));
    }
    return {
        submit,
        removeUndefined,
        removeFromCoerceUndefined,
        addToCoerceUndefined,
    };
}
const isAnyZodObject = (schema) => schema._def.typeName === ZodFirstPartyTypeKind.ZodObject;
const isZodArray = (schema) => schema._def.typeName === ZodFirstPartyTypeKind.ZodArray;
export function flattenRenderedElements(val) {
    return Array.isArray(val)
        ? val.flatMap((obj) => flattenRenderedElements(obj))
        : typeof val === "object" && val !== null && !React.isValidElement(val)
            ? Object.values(val).reduce((accum, val) => {
                return accum.concat(flattenRenderedElements(val));
            }, [])
            : [val];
}
//# sourceMappingURL=createSchemaForm.js.map