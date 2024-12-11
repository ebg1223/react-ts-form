var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from "react";
import { useController } from "react-hook-form";
import { z } from "zod";
import { createUniqueFieldSchema } from "../../createFieldSchema";
import { createTsForm } from "../../createSchemaForm";
export const textFieldTestId = "text-field";
export function TextField(props) {
    const { label, placeholder } = props;
    const { field: { onChange, value }, } = useController({ control: props.control, name: props.name });
    return (React.createElement("div", { "data-testid": textFieldTestId },
        label && React.createElement("label", null, label),
        React.createElement("input", { "data-testid": props.testId, onChange: (e) => {
                onChange(e.target.value);
            }, value: value ? value : "", placeholder: placeholder })));
}
function BooleanField(props) {
    return React.createElement("input", { "data-testid": props.testId });
}
function NumberField(props) {
    return React.createElement("input", { "data-testid": props.testId });
}
export const customFieldTestId = "custom";
function CustomTextField(props) {
    return (React.createElement("div", { "data-testid": customFieldTestId },
        React.createElement("input", { "data-testid": props.testId })));
}
export const enumFieldValues = ["a", "b", "c"];
function EnumField({ enumValues = [], label, placeholder, }) {
    return (React.createElement("div", null,
        React.createElement("span", null, label),
        React.createElement("span", null, placeholder),
        enumValues.map((e, i) => (React.createElement("p", { key: i + "" }, e)))));
}
export const TestCustomFieldSchema = createUniqueFieldSchema(z.string(), "id");
const mapping = [
    [z.string(), TextField],
    [z.boolean(), BooleanField],
    [z.number(), NumberField],
    [TestCustomFieldSchema, CustomTextField],
    [z.enum(enumFieldValues), EnumField],
];
const propsMap = [
    ["name", "name"],
    ["control", "control"],
    ["enumValues", "enumValues"],
    ["descriptionLabel", "label"],
    ["descriptionPlaceholder", "placeholder"],
];
export const TestForm = createTsForm(mapping, {
    propsMap: propsMap,
});
const FormWithSubmit = (_a) => {
    var { children } = _a, props = __rest(_a, ["children"]);
    return (React.createElement("form", Object.assign({}, props),
        children,
        " ",
        React.createElement("button", { type: "submit" }, "submit")));
};
export const TestFormWithSubmit = createTsForm(mapping, {
    propsMap: propsMap,
    FormComponent: FormWithSubmit,
});
//# sourceMappingURL=testForm.js.map