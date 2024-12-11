var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { customFieldTestId, TestCustomFieldSchema, TestForm, TestFormWithSubmit, TextField, textFieldTestId, } from "./utils/testForm";
import { createTsForm, noMatchingSchemaErrorMessage, useFormResultValueChangedErrorMesssage, } from "../createSchemaForm";
import { SPLIT_DESCRIPTION_SYMBOL as DESCRIPTION_SEPARATOR_SYMBOL, SPLIT_DESCRIPTION_SYMBOL, } from "../getMetaInformationForZodType";
import { useController, useForm, useFormState, useWatch, } from "react-hook-form";
import userEvent from "@testing-library/user-event";
import { useDescription, useEnumValues, useReqDescription, useTsController, useStringFieldInfo, useFieldInfo, useDateFieldInfo, } from "../FieldContext";
import { expectTypeOf } from "expect-type";
import { createUniqueFieldSchema } from "../createFieldSchema";
import { zodResolver } from "@hookform/resolvers/zod";
const testIds = {
    textField: "_text-field",
    textFieldTwo: "_text-field-2",
    booleanField: "_boolean-field",
};
function assertNever(_thing) { }
describe("createSchemaForm", () => {
    it("should render a text field and a boolean field based on the mapping and schema", () => {
        const testSchema = z.object({
            textField: z.string(),
            textFieldTwo: z.string(),
            booleanField: z.boolean(),
            t: z.string(),
            t2: z.string(),
            t3: z.string(),
            t4: z.string(),
            t5: z.string(),
        });
        render(React.createElement(TestForm, { onSubmit: () => { }, schema: testSchema, props: {
                textField: {
                    testId: testIds.textField,
                },
                textFieldTwo: {
                    testId: testIds.textFieldTwo,
                },
                booleanField: {
                    testId: testIds.booleanField,
                },
            } }));
        expect(screen.queryByTestId(testIds.textField)).toBeTruthy();
        expect(screen.queryByTestId(testIds.textFieldTwo)).toBeTruthy();
        expect(screen.queryByTestId(testIds.booleanField)).toBeTruthy();
    });
    it("should allow union props in components", () => {
        const testSchema = z.object({
            textField: z.string(),
        });
        function TextField(props) {
            return (React.createElement("div", null, "testText" in props ? props.testText : props.testNumber));
        }
        const mapping = [[z.string(), TextField]];
        const TSForm = createTsForm(mapping);
        render(React.createElement(TSForm, { onSubmit: () => { }, schema: testSchema, props: {
                textField: {
                    testText: "text",
                },
            } }));
        expect(screen.queryByText("text")).toBeTruthy();
        render(React.createElement(TSForm, { onSubmit: () => { }, schema: testSchema, props: {
                textField: {
                    testNumber: 101,
                },
            } }));
        expect(screen.queryByText("101")).toBeTruthy();
    });
    it("should type the onSubmit properly", () => {
        const testSchema = z.object({
            textField: z.string(),
            numberField: z.number(),
            booleanField: z.boolean(),
        });
        render(React.createElement(TestForm, { onSubmit: (v) => {
                if (typeof v.textField !== "string") {
                    assertNever(v.textField);
                }
                if (typeof v.numberField !== "number") {
                    assertNever(v.numberField);
                }
                if (typeof v.booleanField !== "boolean") {
                    assertNever(v.booleanField);
                }
            }, schema: testSchema, props: {
                textField: {
                    testId: testIds.textField,
                },
                numberField: {
                    testId: "number-field",
                },
                booleanField: {
                    testId: testIds.booleanField,
                },
            } }));
        expect(true).toBe(true);
    });
    it("should render a text field and a boolean field based on the mapping and schema into slots in a custom form", () => {
        const testSchema = z.object({
            textField: z.string(),
            textFieldTwo: z.string(),
            booleanField: z.string(),
            t: z.string(),
            t2: z.string(),
            t3: z.string(),
            t4: z.string(),
            t5: z.string(),
        });
        const extraTestIds = {
            extra1: "extra-form-fun",
            extra2: "extra-form-fun2",
        };
        render(React.createElement(TestForm, { onSubmit: () => { }, schema: testSchema, props: {
                textField: {
                    testId: testIds.textField,
                },
                textFieldTwo: {
                    testId: testIds.textFieldTwo,
                },
                booleanField: {
                    testId: testIds.booleanField,
                },
            } }, (_a) => {
            var { textField, booleanField } = _a, restFields = __rest(_a, ["textField", "booleanField"]);
            return (React.createElement(React.Fragment, null,
                React.createElement("div", { "data-testid": extraTestIds.extra1 }, textField),
                React.createElement("div", { "data-testid": extraTestIds.extra2 }, booleanField),
                Object.values(restFields)));
        }));
        expect(screen.queryByTestId(testIds.textField)).toBeTruthy();
        expect(screen.queryByTestId(testIds.textFieldTwo)).toBeTruthy();
        expect(screen.queryByTestId(testIds.booleanField)).toBeTruthy();
        expect(screen.queryByTestId(extraTestIds.extra1)).toBeTruthy();
        expect(screen.queryByTestId(extraTestIds.extra2)).toBeTruthy();
    });
    it("should render a text field and a boolean field based on the mapping and schema, unwrapping refine calls", () => {
        const testSchema = z.object({
            textField: z.string(),
            textFieldTwo: z.string(),
            booleanField: z.string(),
            t: z.string(),
            t2: z.string(),
            t3: z.string(),
            t4: z.string(),
            t5: z.string(),
        });
        render(React.createElement(TestForm, { onSubmit: () => { }, schema: testSchema.refine((_) => true, {
                message: "cool",
            }), props: {
                textField: {
                    testId: testIds.textField,
                },
                textFieldTwo: {
                    testId: testIds.textFieldTwo,
                },
                booleanField: {
                    testId: testIds.booleanField,
                },
            } }));
        expect(screen.queryByTestId(testIds.textField)).toBeTruthy();
        expect(screen.queryByTestId(testIds.textFieldTwo)).toBeTruthy();
        expect(screen.queryByTestId(testIds.booleanField)).toBeTruthy();
    });
    it("should throw an error when no matching schema is found in mapping", () => {
        const mapping = [[z.string(), () => React.createElement("input", null)]];
        const enumSchema = z.enum(["Yes"]);
        const Schema = z.object({
            enum: enumSchema,
        });
        const Form = createTsForm(mapping);
        jest.spyOn(console, "error").mockImplementation(() => { });
        expect(() => render(React.createElement(Form, { onSubmit: () => { }, schema: Schema, props: {
                enum: {
                    testId: "nope",
                },
            } }))).toThrowError(noMatchingSchemaErrorMessage("enum", enumSchema._def.typeName));
    });
    it("should render the CustomTextField for the field with TestCustomFieldSchema, and also still render the regular TextField for a vanilla string", () => {
        const testSchema = z.object({
            textField: z.string(),
            textFieldCustom: TestCustomFieldSchema,
        });
        render(React.createElement(TestForm, { onSubmit: () => { }, schema: testSchema, props: {
                textField: {
                    testId: "A Test ID",
                },
                textFieldCustom: {
                    testId: "Yes",
                    aCustomField: "Woohoo!!",
                },
            } }));
        expect(screen.queryByTestId(customFieldTestId)).toBeTruthy();
        expect(screen.queryByTestId(textFieldTestId)).toBeTruthy();
    });
    it("should render the label and placeholder text for the text field if they're passed via description", () => {
        const label = "label";
        const placeholder = "placeholder";
        const Schema = z.object({
            id: z
                .string()
                .optional()
                .describe(`${label}${DESCRIPTION_SEPARATOR_SYMBOL}${placeholder}`),
        });
        render(React.createElement(TestForm, { onSubmit: () => { }, schema: Schema }));
        expect(screen.queryByPlaceholderText(placeholder)).toBeTruthy();
        expect(screen.queryByText(label)).toBeTruthy();
    });
    it("should pass enum values to the enum field", () => {
        const enumValues = ["a", "b", "c3p0"];
        const Schema = z.object({
            enum: z.enum(enumValues),
        });
        render(React.createElement(TestForm, { onSubmit: () => { }, schema: Schema }));
        for (const value of enumValues) {
            expect(screen.queryByText(value)).toBeTruthy();
        }
    });
    it("should pass a label, placeholder and enum values to a optional enum field with description", () => {
        const enumValues = ["a", "b", "c3p0"];
        const label = "label";
        const placeholder = "placeholder";
        const Schema = z.object({
            enum: z
                .enum(enumValues)
                .optional()
                .describe(`${label}${DESCRIPTION_SEPARATOR_SYMBOL}${placeholder}`),
        });
        render(React.createElement(TestForm, { schema: Schema, onSubmit: () => { } }));
        for (const value of enumValues) {
            expect(screen.queryByText(value)).toBeTruthy();
        }
        expect(screen.queryByText(label)).toBeInTheDocument();
        expect(screen.queryByText(placeholder)).toBeInTheDocument();
    });
    it("should render with default values if they're passed", () => {
        const defaultValue = "default";
        const Schema = z.object({
            textField: z.string(),
        });
        render(React.createElement(TestForm, { schema: Schema, defaultValues: { textField: defaultValue }, onSubmit: () => { } }));
        expect(screen.getByDisplayValue(defaultValue)).toBeInTheDocument();
    });
    it("should render a custom form component that should call on submit", () => __awaiter(void 0, void 0, void 0, function* () {
        const onSubmitMock = jest.fn();
        const Schema = z.object({
            fieldOne: z.string(),
            fieldTwo: z.boolean(),
        });
        const buttonText = "press";
        const textFieldTestId = "text";
        const booleanFieldTestId = "bool";
        const expectedValues = {
            fieldOne: "A user typed this",
            fieldTwo: true,
        };
        const FormComponent = ({ onSubmit, children, }) => {
            return (React.createElement("form", null,
                children,
                React.createElement("button", { onClick: onSubmit }, buttonText)));
        };
        function TextField({ name, control, }) {
            const { field } = useController({ control, name });
            return (React.createElement("input", { value: field.value ? field.value : "", onChange: (e) => field.onChange(e.target.value), "data-testid": textFieldTestId }));
        }
        function BooleanField({ name, control, }) {
            const { field } = useController({ control, name });
            return (React.createElement("input", { type: "checkbox", "data-testid": booleanFieldTestId, checked: field.value ? field.value : false, onChange: (e) => field.onChange(e.target.checked) }));
        }
        const mapping = [
            [z.string(), TextField],
            [z.boolean(), BooleanField],
        ];
        const TSForm = createTsForm(mapping, { FormComponent });
        render(React.createElement(TSForm, { props: { fieldOne: {} }, onSubmit: onSubmitMock, schema: Schema }));
        const stringInput = screen.getByTestId(textFieldTestId);
        const booleanInput = screen.getByTestId(booleanFieldTestId);
        const button = screen.getByText(buttonText);
        stringInput.focus();
        yield userEvent.click(stringInput);
        yield userEvent.type(stringInput, expectedValues.fieldOne);
        yield userEvent.click(booleanInput);
        yield userEvent.click(button);
        expect(button).toBeInTheDocument();
        expect(onSubmitMock).toHaveBeenCalledWith(expectedValues);
    }));
    it("should render the 'beforeElement' and 'afterElement' props if they're passed.", () => {
        const Schema = z.object({ id: z.string() });
        const beforeText = `b4`;
        const afterText = `aff-ter`;
        render(React.createElement(TestForm, { schema: Schema, onSubmit: () => { }, props: {
                id: {
                    beforeElement: React.createElement("div", null, beforeText),
                    afterElement: React.createElement("div", null, afterText),
                },
            } }));
        expect(screen.queryByText(beforeText)).toBeInTheDocument();
        expect(screen.queryByText(afterText)).toBeInTheDocument();
    });
    it("should allow creating a submit button with the 'renderAfter' prop.", () => __awaiter(void 0, void 0, void 0, function* () {
        const onSubmitMock = jest.fn();
        const Schema = z.object({
            id: z.string(),
        });
        const textFieldId = "a";
        const buttonTestId = "button";
        const expectedOutput = {
            id: "string",
        };
        render(React.createElement(TestForm, { schema: Schema, props: {
                id: {
                    testId: textFieldId,
                },
            }, onSubmit: onSubmitMock, renderAfter: ({ submit }) => (React.createElement("button", { type: "button", "data-testid": buttonTestId, onClick: () => submit() })) }));
        const textInput = screen.getByTestId(textFieldId);
        const submitButton = screen.getByTestId(buttonTestId);
        yield userEvent.type(textInput, expectedOutput.id);
        yield userEvent.click(submitButton);
        expect(onSubmitMock).toHaveBeenCalledWith(expectedOutput);
    }));
    it("should allow creating a submit button with the 'renderBefore' prop.", () => __awaiter(void 0, void 0, void 0, function* () {
        const onSubmitMock = jest.fn();
        const Schema = z.object({
            id: z.string(),
        });
        const textFieldId = "a";
        const buttonTestId = "button";
        const expectedOutput = {
            id: "string",
        };
        render(React.createElement(TestForm, { schema: Schema, props: {
                id: {
                    testId: textFieldId,
                },
            }, onSubmit: onSubmitMock, renderBefore: ({ submit }) => (React.createElement("button", { type: "button", "data-testid": buttonTestId, onClick: () => submit() })) }));
        const textInput = screen.getByTestId(textFieldId);
        const submitButton = screen.getByTestId(buttonTestId);
        yield userEvent.type(textInput, expectedOutput.id);
        yield userEvent.click(submitButton);
        expect(onSubmitMock).toHaveBeenCalledWith(expectedOutput);
    }));
    it("should throw an error if the value of 'useFormResult' goes from undefined to defined", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(console, "error").mockImplementation(() => { });
        const buttonId = "button";
        function TestComponent() {
            const uf = useForm();
            const [buttonPressed, setButtonPressed] = useState(false);
            return (React.createElement("div", null,
                React.createElement(TestForm, { form: buttonPressed ? uf : undefined, schema: z.object({
                        id: z.string(),
                    }), onSubmit: () => { } }),
                React.createElement("button", { "data-testid": buttonId, onClick: () => {
                        setButtonPressed(true);
                    } }, "press")));
        }
        render(React.createElement(TestComponent, null));
        const button = screen.getByTestId(buttonId);
        yield expect(userEvent.click(button)).rejects.toThrowError(useFormResultValueChangedErrorMesssage());
    }));
    it("should be possible to set and read form state with useTsController", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "bad";
        const buttonTestId = "test";
        const inputTestId = "input";
        const testInput = "yo";
        const errorMessageId = "error";
        const renderButtonId = "render";
        const FormSchema = z.object({
            field: z.string().min(2, errorMessage),
        });
        function Component() {
            const { field, fieldState: { error }, } = useTsController();
            const [_, setState] = useState(0);
            return (React.createElement(React.Fragment, null,
                React.createElement("input", { value: field.value ? field.value : "", onChange: (e) => {
                        field.onChange(e.target.value);
                    }, "data-testid": inputTestId }),
                error && React.createElement("span", { "data-testid": errorMessageId }, error.message),
                React.createElement("button", { type: "button", "data-testid": renderButtonId, onClick: () => setState((v) => v + 1) })));
        }
        const mapping = [[z.string(), Component]];
        const Form = createTsForm(mapping);
        const submitMock = jest.fn();
        const expectedOutput = {
            field: testInput,
        };
        render(React.createElement(Form, { schema: FormSchema, onSubmit: submitMock, renderAfter: ({ submit }) => (React.createElement("button", { onClick: submit, "data-testid": buttonTestId }, "submit")) }));
        const button = screen.getByTestId(buttonTestId);
        const renderButton = screen.getByTestId(renderButtonId);
        const textInput = screen.getByTestId(inputTestId);
        yield userEvent.click(button);
        yield userEvent.type(textInput, testInput[0]);
        yield userEvent.click(renderButton);
        const errorMessageSpan = screen.getByTestId(errorMessageId);
        expect(errorMessageSpan).toBeInTheDocument();
        yield userEvent.click(textInput);
        yield userEvent.type(textInput, testInput.slice(1));
        yield userEvent.click(button);
        expect(submitMock).toHaveBeenCalledTimes(1);
        expect(submitMock).toHaveBeenCalledWith(expectedOutput);
    }));
    it("should render the default values passed in via the useFormResult prop", () => {
        const testId = "id";
        const val = "true";
        function Component() {
            const form = useForm({
                defaultValues: {
                    v: val,
                },
            });
            return (React.createElement(TestForm, { form: form, schema: z.object({
                    v: z.string(),
                }), onSubmit: () => { }, props: {
                    v: {
                        testId: testId,
                    },
                } }));
        }
        render(React.createElement(Component, null));
        expect(screen.getByDisplayValue(val)).toBeInTheDocument();
    });
    it("should track submitting properly", () => __awaiter(void 0, void 0, void 0, function* () {
        const testId = "id";
        const val = "true";
        let submitPromiseResolve = () => { };
        const submitPromise = new Promise((resolve) => {
            submitPromiseResolve = resolve;
        });
        let submitting = false;
        function Component() {
            const form = useForm({
                defaultValues: {
                    v: val,
                },
            });
            submitting = form.formState.isSubmitting;
            return (React.createElement(TestFormWithSubmit, { form: form, schema: z.object({
                    v: z.string(),
                }), onSubmit: () => {
                    return submitPromise;
                }, props: {
                    v: {
                        testId: testId,
                    },
                } }));
        }
        render(React.createElement(Component, null));
        const button = screen.getByText("submit");
        yield userEvent.click(button);
        expect(submitting).toBe(true);
        submitPromiseResolve();
        waitFor(() => expect(submitting).toBe(false));
    }));
    it("should throw an error if useTsController is called outside of a @ts-react/form rendered component", () => {
        jest.spyOn(console, "error").mockImplementation(() => { });
        function C() {
            useTsController();
            return React.createElement("div", null);
        }
        expect(() => render(React.createElement(C, null))).toThrow();
    });
    it("should be possible to forward props to custom prop names via the props map", () => {
        const propsMapping = [
            ["control", "c"],
            ["name", "n"],
            ["enumValues", "e"],
            ["descriptionLabel", "l"],
            ["descriptionPlaceholder", "p"],
        ];
        function Component({ c, n, l, p, e, }) {
            return (React.createElement(React.Fragment, null,
                React.createElement("div", null, c ? "*" : ""),
                React.createElement("div", null, n),
                React.createElement("div", null, l),
                React.createElement("div", null, p),
                React.createElement("div", null, e[0])));
        }
        const mapping = [[z.enum([""]), Component]];
        const Form = createTsForm(mapping, {
            propsMap: propsMapping,
        });
        const MySchema = z.object({
            n: z.enum(["e"]).describe(`l${SPLIT_DESCRIPTION_SYMBOL}p`),
        });
        render(React.createElement(Form, { schema: MySchema, onSubmit: (_) => { } }));
        expect(screen.getByText("*")).toBeInTheDocument();
        expect(screen.getByText("n")).toBeInTheDocument();
        expect(screen.getByText("e")).toBeInTheDocument();
        expect(screen.getByText("l")).toBeInTheDocument();
        expect(screen.getByText("p")).toBeInTheDocument();
    });
    it("should allow using the useDescription() hook to show descriptions", () => {
        const label = "label";
        const placeholder = "placeholder";
        function Component() {
            const { label, placeholder } = useDescription();
            return (React.createElement("div", null,
                React.createElement("div", null, label),
                React.createElement("div", null, placeholder)));
        }
        const mapping = [[z.string(), Component]];
        const Form = createTsForm(mapping);
        render(React.createElement(Form, { schema: z.object({
                field: z
                    .string()
                    .describe(`${label}${DESCRIPTION_SEPARATOR_SYMBOL}${placeholder}`),
            }), onSubmit: () => { } }));
        expect(screen.getByText(label)).toBeInTheDocument();
        expect(screen.getByText(placeholder)).toBeInTheDocument();
    });
    it("should be able to show description and label from required description / label", () => {
        const label = "label";
        const placeholder = "placeholder";
        function Component() {
            const { label, placeholder } = useReqDescription();
            return (React.createElement("div", null,
                React.createElement("div", null, label),
                React.createElement("div", null, placeholder)));
        }
        const mapping = [[z.string(), Component]];
        const Form = createTsForm(mapping);
        render(React.createElement(Form, { schema: z.object({
                field: z
                    .string()
                    .describe(`${label}${DESCRIPTION_SEPARATOR_SYMBOL}${placeholder}`),
            }), onSubmit: () => { } }));
        expect(screen.getByText(label)).toBeInTheDocument();
        expect(screen.getByText(placeholder)).toBeInTheDocument();
    });
    it("should throw an error when there is no placeholder passed via .describe() and useReqDesription is called", () => {
        jest.spyOn(console, "error").mockImplementation(() => { });
        const label = "label";
        function Component() {
            const { label, placeholder } = useReqDescription();
            return (React.createElement("div", null,
                React.createElement("div", null, label),
                React.createElement("div", null, placeholder)));
        }
        const mapping = [[z.string(), Component]];
        const Form = createTsForm(mapping);
        expect(() => render(React.createElement(Form, { schema: z.object({
                field: z.string().describe(`${label}}`),
            }), onSubmit: () => { } }))).toThrow();
    });
    it("should throw an error when there is nothing passed via .describe() and useReqDesription is called", () => {
        jest.spyOn(console, "error").mockImplementation(() => { });
        function Component() {
            const { label, placeholder } = useReqDescription();
            return (React.createElement("div", null,
                React.createElement("div", null, label),
                React.createElement("div", null, placeholder)));
        }
        const mapping = [[z.string(), Component]];
        const Form = createTsForm(mapping);
        expect(() => render(React.createElement(Form, { schema: z.object({
                field: z.string(),
            }), onSubmit: () => { } }))).toThrow();
    });
    it("should pass a description and label via useReqDescription without propforwarding enabled", () => {
        function Comp() {
            const { label, placeholder } = useReqDescription();
            return (React.createElement(React.Fragment, null,
                React.createElement("div", null, label),
                React.createElement("div", null, placeholder)));
        }
        const componentMap = [
            [z.string().describe(`a ${SPLIT_DESCRIPTION_SYMBOL} b`), Comp],
        ];
        const Form = createTsForm(componentMap);
        const FormSchema = z.object({
            field: z.string().describe(`a ${SPLIT_DESCRIPTION_SYMBOL} b`),
        });
        render(React.createElement(Form, { schema: FormSchema, onSubmit: () => { } }));
        expect(screen.getByText("a")).toBeInTheDocument();
        expect(screen.getByText("b")).toBeInTheDocument();
    });
    it("should allow accessing enumValues via the `useEnumValues()` hook", () => {
        const Schema = z.object({
            enum: z.enum(["one", "two"]),
        });
        function Component({ req: _ }) {
            const enumValues = useEnumValues();
            return (React.createElement("div", null, enumValues.map((e) => (React.createElement("span", { key: e }, e)))));
        }
        const mapping = [[z.enum(["yep"]), Component]];
        const Form = createTsForm(mapping);
        render(React.createElement(Form, { schema: Schema, onSubmit: () => { }, props: { enum: { req: "yes" } } }));
    });
    it("should throw an error if useEnumValues() is called in a field not rendered by an enum schema", () => {
        jest.spyOn(console, "error").mockImplementation(() => { });
        const Schema = z.object({
            id: z.string(),
        });
        const mapping = [
            [
                z.string(),
                () => {
                    useEnumValues();
                    return React.createElement("div", null);
                },
            ],
        ];
        const Form = createTsForm(mapping);
        expect(() => {
            render(React.createElement(Form, { schema: Schema, onSubmit: () => { } }));
        }).toThrow();
    });
    it("should have correct typings with multiple unique field schemas when transform and refine are used.", () => {
        const A = createUniqueFieldSchema(z.string(), "one");
        const B = createUniqueFieldSchema(z.string(), "two");
        function In1(_) {
            return React.createElement("div", null);
        }
        function In2(_) {
            return React.createElement("div", null);
        }
        const mapping = [
            [A, In1],
            [B, In2],
        ];
        const Form = createTsForm(mapping);
        React.createElement(Form, { schema: z
                .object({
                a: A,
                b: B,
            })
                .refine((_) => true)
                .transform((a) => a.a), onSubmit: (data) => {
                expectTypeOf(data).toBeString();
            }, props: {
                a: {
                    req: "One",
                },
                b: {
                    req2: "Two",
                },
            } });
    });
    it("should show a required error and not submit after deleting a default value and submitting", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockOnSubmit = jest.fn();
        function Input() {
            const { field: { onChange, value }, error, } = useTsController();
            const [_, setRerender] = useState(0);
            return (React.createElement(React.Fragment, null,
                React.createElement("input", { value: value !== undefined ? value + "" : "", onChange: (e) => {
                        const value = parseInt(e.target.value);
                        if (isNaN(value))
                            onChange(undefined);
                        else
                            onChange(value);
                    }, placeholder: "input" }),
                React.createElement("button", { type: "button", onClick: () => setRerender((old) => old + 1) }, "rerender button"),
                (error === null || error === void 0 ? void 0 : error.errorMessage) && React.createElement("span", null, error.errorMessage)));
        }
        const mapping = [[z.number(), Input]];
        const Form = createTsForm(mapping);
        const defaultValues = {
            number: 5,
        };
        render(React.createElement(Form, { onSubmit: mockOnSubmit, schema: z.object({
                number: z.number({ required_error: "req" }),
            }), defaultValues: defaultValues, renderAfter: () => React.createElement("button", null, "submit") }));
        const button = screen.getByText("submit");
        const input = screen.getByPlaceholderText("input");
        const rerenderButton = screen.getByText("rerender button");
        yield userEvent.clear(input);
        yield userEvent.click(button);
        yield userEvent.click(rerenderButton);
        expect(screen.getByText("req")).toBeInTheDocument();
        expect(mockOnSubmit).not.toHaveBeenCalled();
    }));
    it("should be to clear an input, type into the input, and then submit.", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockOnSubmit = jest.fn();
        function Input() {
            const { field: { onChange, value }, error, } = useTsController();
            const [_, setRerender] = useState(0);
            return (React.createElement(React.Fragment, null,
                React.createElement("input", { value: value !== undefined ? value + "" : "", onChange: (e) => {
                        const value = parseInt(e.target.value);
                        if (isNaN(value))
                            onChange(undefined);
                        else
                            onChange(value);
                    }, placeholder: "input" }),
                React.createElement("button", { type: "button", onClick: () => setRerender((old) => old + 1) }, "rerender button"),
                (error === null || error === void 0 ? void 0 : error.errorMessage) && React.createElement("span", null, error.errorMessage)));
        }
        const mapping = [[z.number(), Input]];
        const Form = createTsForm(mapping);
        const defaultValues = {
            number: 5,
        };
        render(React.createElement(Form, { onSubmit: mockOnSubmit, schema: z.object({
                number: z.number({ required_error: "req" }),
            }), defaultValues: defaultValues, renderAfter: () => React.createElement("button", null, "submit") }));
        const button = screen.getByText("submit");
        const input = screen.getByPlaceholderText("input");
        const rerenderButton = screen.getByText("rerender button");
        yield userEvent.clear(input);
        yield userEvent.type(input, "5");
        yield userEvent.click(button);
        yield userEvent.click(rerenderButton);
        expect(screen.queryByText("req")).not.toBeInTheDocument();
        expect(mockOnSubmit).toHaveBeenCalledWith({ number: 5 });
    }));
    it("should be possible to submit with default values with no edits.", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockOnSubmit = jest.fn();
        function Input() {
            const { field: { onChange, value }, error, } = useTsController();
            const [_, setRerender] = useState(0);
            return (React.createElement(React.Fragment, null,
                React.createElement("input", { value: value !== undefined ? value + "" : "", onChange: (e) => {
                        const value = parseInt(e.target.value);
                        if (isNaN(value))
                            onChange(undefined);
                        else
                            onChange(value);
                    }, placeholder: "input" }),
                React.createElement("button", { type: "button", onClick: () => setRerender((old) => old + 1) }, "rerender button"),
                (error === null || error === void 0 ? void 0 : error.errorMessage) && React.createElement("span", null, error.errorMessage)));
        }
        const mapping = [[z.number(), Input]];
        const Form = createTsForm(mapping);
        const defaultValues = {
            number: 5,
        };
        render(React.createElement(Form, { onSubmit: mockOnSubmit, schema: z.object({
                number: z.number({ required_error: "req" }),
            }), defaultValues: defaultValues, renderAfter: () => React.createElement("button", null, "submit") }));
        const button = screen.getByText("submit");
        yield userEvent.click(button);
        expect(screen.queryByText("req")).not.toBeInTheDocument();
        expect(mockOnSubmit).toHaveBeenCalledWith({ number: 5 });
    }));
    it("should be possible to pass 'defaultValues' prop and 'form' prop and apply the default values.", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockOnSubmit = jest.fn();
        function Input() {
            const { field: { onChange, value }, error, } = useTsController();
            const [_, setRerender] = useState(0);
            return (React.createElement(React.Fragment, null,
                React.createElement("input", { value: value !== undefined ? value + "" : "", onChange: (e) => {
                        const value = parseInt(e.target.value);
                        if (isNaN(value))
                            onChange(undefined);
                        else
                            onChange(value);
                    }, placeholder: "input" }),
                React.createElement("button", { type: "button", onClick: () => setRerender((old) => old + 1) }, "rerender button"),
                (error === null || error === void 0 ? void 0 : error.errorMessage) && React.createElement("span", null, error.errorMessage)));
        }
        function Outer() {
            const form = useForm();
            return (React.createElement(Form, { onSubmit: mockOnSubmit, schema: z.object({
                    number: z.number({ required_error: "req" }),
                }), form: form, defaultValues: defaultValues, renderAfter: () => React.createElement("button", null, "submit") }));
        }
        const mapping = [[z.number(), Input]];
        const Form = createTsForm(mapping);
        const defaultValues = {
            number: 5,
        };
        render(React.createElement(Outer, null));
        const button = screen.getByText("submit");
        yield userEvent.click(button);
        expect(screen.queryByText("req")).not.toBeInTheDocument();
        expect(mockOnSubmit).toHaveBeenCalledWith({ number: 5 });
    }));
    it("should render the correct component when a schema created with createSchemaForm is optional", () => {
        const StringSchema = createUniqueFieldSchema(z.string(), "string");
        const NumberSchema = createUniqueFieldSchema(z.number(), "number");
        function TextField() {
            return React.createElement("div", null, "text");
        }
        function NumberField() {
            return React.createElement("div", null, "number");
        }
        const mapping = [
            [StringSchema, TextField],
            [z.string(), TextField],
            [NumberSchema, NumberField],
        ];
        const Form = createTsForm(mapping);
        const schema = z.object({
            name: StringSchema.optional(),
            age: NumberSchema,
        });
        render(React.createElement(Form, { schema: schema, onSubmit: () => { } }));
        expect(screen.queryByText("text")).toBeInTheDocument();
        expect(screen.queryByText("number")).toBeInTheDocument();
    });
    it("should render two different enum components when createUniqueFieldSchema is used", () => {
        function FieldOne() {
            return React.createElement("div", null, "one");
        }
        function FieldTwo(_props) {
            return React.createElement("div", null, "two");
        }
        const uniqueField = createUniqueFieldSchema(z.enum(["three", "four"]), "id");
        const mapping = [
            [z.enum(["one", "two"]), FieldOne],
            [uniqueField, FieldTwo],
        ];
        const Form = createTsForm(mapping);
        const Schema = z.object({
            one: z.enum(["one", "two"]),
            two: uniqueField,
        });
        render(React.createElement(Form, { schema: Schema, onSubmit: () => { }, props: { two: { prop: "str" } } }));
        expect(screen.queryByText("one")).toBeInTheDocument();
        expect(screen.queryByText("two")).toBeInTheDocument();
    });
    it("should be possible to get ZodAny information using `useFieldInfo`", () => {
        const testData = {
            requiredTextField: {
                label: "required-label",
                placeholder: "required-placeholder",
                uniqueId: "required-text-field",
            },
            optionalTextField: {
                label: "optional-label",
                placeholder: "optional-placeholder",
                uniqueId: "optional-text-field",
            },
        };
        const description = (k) => `${testData[k].label}${DESCRIPTION_SEPARATOR_SYMBOL}${testData[k].placeholder}`;
        const RequiredTextFieldSchema = createUniqueFieldSchema(z.string(), testData.requiredTextField.uniqueId);
        const OptionalTextFieldSchema = createUniqueFieldSchema(z.string().optional(), testData.optionalTextField.uniqueId);
        function RequiredTextField() {
            const fieldInfo = useFieldInfo();
            expect(fieldInfo.isOptional).toBeFalsy();
            expect(fieldInfo.label).toBe(testData.requiredTextField.label);
            expect(fieldInfo.placeholder).toBe(testData.requiredTextField.placeholder);
            expect(fieldInfo.uniqueId).toBe(testData.requiredTextField.uniqueId);
            return React.createElement("input", null);
        }
        function OptionalTextField() {
            const fieldInfo = useFieldInfo();
            expect(fieldInfo.isOptional).toBe(true);
            expect(fieldInfo.label).toBe(testData.optionalTextField.label);
            expect(fieldInfo.placeholder).toBe(testData.optionalTextField.placeholder);
            expect(fieldInfo.uniqueId).toBe(testData.optionalTextField.uniqueId);
            return React.createElement("input", null);
        }
        const defaultEmail = "john@example.com";
        const DefaultTextField = () => {
            const { defaultValue, type, zodType } = useFieldInfo();
            expect(defaultValue).toBe(defaultEmail);
            return React.createElement("input", null);
        };
        const schema = z.object({
            email: z.string().default(defaultEmail),
            name: RequiredTextFieldSchema.describe(description("requiredTextField")),
            nickName: OptionalTextFieldSchema.describe(description("optionalTextField")),
        });
        const mapping = [
            [z.string(), DefaultTextField],
            [RequiredTextFieldSchema, RequiredTextField],
            [OptionalTextFieldSchema, OptionalTextField],
        ];
        const Form = createTsForm(mapping);
        render(React.createElement(Form, { schema: schema, onSubmit: () => { } }));
    });
    it("should be possible to get ZodString information using `useStringFieldInfo`", () => {
        const testData = {
            textField: {
                uniqueId: "text-field-id",
                label: "text-field-label",
                placeholder: "text-field-placeholder",
                min: 5,
                max: 16,
                get schema() {
                    const { min, max, uniqueId } = this;
                    return createUniqueFieldSchema(z.string().min(min).max(max), uniqueId);
                },
                get component() {
                    const { min, max, label, uniqueId } = this;
                    const TextFieldComponent = () => {
                        const fieldInfo = useStringFieldInfo();
                        expect(fieldInfo.minLength).toBe(min);
                        expect(fieldInfo.maxLength).toBe(max);
                        expect(fieldInfo.label).toBe(label);
                        expect(fieldInfo.uniqueId).toBe(uniqueId);
                        return React.createElement("div", null, fieldInfo.label);
                    };
                    return TextFieldComponent;
                },
            },
            arrayTextField: {
                uniqueId: "array-text-field-id",
                label: "array-text-field-label",
                placeholder: "array-text-field-placeholder",
                min: 5,
                max: 16,
                get schema() {
                    const { min, max, uniqueId } = this;
                    return createUniqueFieldSchema(z.string().min(min).max(max).array(), uniqueId);
                },
                get component() {
                    const { min, max, label, uniqueId } = this;
                    const ArrayTextFieldComponent = () => {
                        const fieldInfo = useStringFieldInfo();
                        expect(fieldInfo.minLength).toBe(min);
                        expect(fieldInfo.maxLength).toBe(max);
                        expect(fieldInfo.label).toBe(label);
                        expect(fieldInfo.uniqueId).toBe(uniqueId);
                        return React.createElement("div", null, fieldInfo.label);
                    };
                    return ArrayTextFieldComponent;
                },
            },
        };
        const description = (k) => `${testData[k].label}${DESCRIPTION_SEPARATOR_SYMBOL}${testData[k].placeholder}`;
        const { textField, arrayTextField } = testData;
        const schema = z.object({
            name: textField.schema.describe(description("textField")),
            users: arrayTextField.schema.describe(description("arrayTextField")),
        });
        const mapping = [
            [textField.schema, textField.component],
            [arrayTextField.schema, arrayTextField.component],
        ];
        const Form = createTsForm(mapping);
        render(React.createElement(Form, { schema: schema, onSubmit: () => { } }));
        expect(screen.queryByText(testData.textField.label)).toBeInTheDocument();
        expect(screen.queryByText(testData.arrayTextField.label)).toBeInTheDocument();
    });
    it("should be possible to get ZodDate information using `useDateFieldInfo`", () => {
        const testData = {
            dateField: {
                uniqueId: "date-field-id",
                label: "date-field-label",
                placeholder: "date-field-placeholder",
                min: new Date(2021, 1, 1),
                max: new Date(2020, 1, 1),
                get schema() {
                    const { uniqueId, min, max } = this;
                    return createUniqueFieldSchema(z.date().min(min).max(max), uniqueId);
                },
                get component() {
                    const { min, max, label, uniqueId } = this;
                    const DateFieldComponent = () => {
                        const fieldInfo = useDateFieldInfo();
                        expect(fieldInfo.minDate).toStrictEqual(min);
                        expect(fieldInfo.maxDate).toStrictEqual(max);
                        expect(fieldInfo.label).toBe(label);
                        expect(fieldInfo.uniqueId).toBe(uniqueId);
                        return React.createElement("div", null, fieldInfo.label);
                    };
                    return DateFieldComponent;
                },
            },
            arrayDateField: {
                uniqueId: "array-date-field-id",
                label: "array-date-field-label",
                placeholder: "array-date-field-placeholder",
                min: new Date(2021, 1, 1),
                max: new Date(2020, 1, 1),
                get schema() {
                    const { uniqueId, min, max } = this;
                    return createUniqueFieldSchema(z.date().min(min).max(max), uniqueId);
                },
                get component() {
                    const { min, max, label, uniqueId } = this;
                    const ArrayDateFieldComponent = () => {
                        const fieldInfo = useDateFieldInfo();
                        expect(fieldInfo.minDate).toStrictEqual(min);
                        expect(fieldInfo.maxDate).toStrictEqual(max);
                        expect(fieldInfo.label).toBe(label);
                        expect(fieldInfo.uniqueId).toBe(uniqueId);
                        return React.createElement("div", null, fieldInfo.label);
                    };
                    return ArrayDateFieldComponent;
                },
            },
        };
        const description = (k) => `${testData[k].label}${DESCRIPTION_SEPARATOR_SYMBOL}${testData[k].placeholder}`;
        const { dateField, arrayDateField } = testData;
        const schema = z.object({
            name: dateField.schema.describe(description("dateField")),
            users: arrayDateField.schema.describe(description("arrayDateField")),
        });
        const mapping = [
            [dateField.schema, dateField.component],
            [arrayDateField.schema, arrayDateField.component],
        ];
        const Form = createTsForm(mapping);
        render(React.createElement(Form, { schema: schema, onSubmit: () => { } }));
        expect(screen.queryByText(testData.dateField.label)).toBeInTheDocument();
        expect(screen.queryByText(testData.arrayDateField.label)).toBeInTheDocument();
    });
    it("should render the correct components for a nested object schema if unmaped", () => __awaiter(void 0, void 0, void 0, function* () {
        const NumberSchema = createUniqueFieldSchema(z.number(), "number");
        const mockOnSubmit = jest.fn();
        function TextField({}) {
            const { error } = useTsController();
            return (React.createElement(React.Fragment, null,
                React.createElement("div", null, "text"),
                React.createElement("div", { "data-testid": "error" }, error === null || error === void 0 ? void 0 : error.errorMessage)));
        }
        function NumberField({}) {
            return React.createElement("div", null, "number");
        }
        function BooleanField({}) {
            return React.createElement("div", null, "boolean");
        }
        const objectSchema = z.object({
            text: z.string(),
            age: NumberSchema,
        });
        const objectSchema2 = z.object({
            bool: z.boolean(),
        });
        const mapping = [
            [z.string(), TextField],
            [NumberSchema, NumberField],
            [z.boolean(), BooleanField],
            [objectSchema2, BooleanField],
        ];
        const Form = createTsForm(mapping);
        const schema = z.object({
            nestedField: objectSchema,
            nestedField2: objectSchema2,
        });
        const defaultValues = {
            nestedField: { text: "name", age: 9 },
            nestedField2: { bool: true },
        };
        render(React.createElement(Form, { schema: schema, onSubmit: mockOnSubmit, defaultValues: defaultValues, props: {
                nestedField2: { c: true },
                nestedField: { text: { b: "1" }, age: { a: 1 } },
            }, renderAfter: () => React.createElement("button", { type: "submit" }, "submit") }));
        const button = screen.getByText("submit");
        yield userEvent.click(button);
        const textNodes = screen.queryByText("text");
        expect(textNodes).toBeInTheDocument();
        const numberNodes = screen.queryByText("number");
        expect(numberNodes).toBeInTheDocument();
        expect(screen.queryByTestId("error")).toHaveTextContent("");
        expect(mockOnSubmit).toHaveBeenCalledWith(defaultValues);
    }));
    it("should render two copies of an object schema if in an unmapped array schema", () => __awaiter(void 0, void 0, void 0, function* () {
        const NumberSchema = createUniqueFieldSchema(z.number(), "number");
        const mockOnSubmit = jest.fn();
        function TextField({}) {
            return React.createElement("div", null, "text");
        }
        function NumberField() {
            return React.createElement("div", null, "number");
        }
        function ObjectField({ objProp }) {
            return React.createElement("div", null, objProp);
        }
        const otherObjSchema = z.object({
            text: z.string().optional(),
        });
        const mapping = [
            [z.string(), TextField],
            [NumberSchema, NumberField],
            [otherObjSchema, ObjectField],
        ];
        const Form = createTsForm(mapping);
        const schema = z.object({
            arrayField: z
                .object({
                text: z.string(),
                age: NumberSchema,
                otherObj: otherObjSchema.optional(),
            })
                .array(),
        });
        const defaultValues = {
            arrayField: [
                { text: "name", age: 9 },
                { text: "name2", age: 10 },
            ],
        };
        render(React.createElement(Form, { schema: schema, onSubmit: mockOnSubmit, defaultValues: defaultValues, props: { arrayField: { text: { a: 1 }, otherObj: { objProp: 2 } } }, renderAfter: () => {
                return React.createElement("button", { type: "submit" }, "submit");
            } }, (renderedFields) => {
            return (React.createElement(React.Fragment, null, renderedFields.arrayField.map(({ text, age }, i) => (React.createElement(React.Fragment, { key: i },
                text,
                age)))));
        }));
        const textNodes = screen.queryAllByText("text");
        textNodes.forEach((node) => expect(node).toBeInTheDocument());
        expect(textNodes).toHaveLength(2);
        const numberNodes = screen.queryAllByText("number");
        numberNodes.forEach((node) => expect(node).toBeInTheDocument());
        expect(numberNodes).toHaveLength(2);
        const button = screen.getByText("submit");
        yield userEvent.click(button);
        expect(mockOnSubmit).toHaveBeenCalledWith(defaultValues);
    }));
    it("should render an array component despite recusions", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockOnSubmit = jest.fn(() => { });
        function DynamicArray() {
            const { field: { value, onChange }, } = useTsController();
            return (React.createElement("div", { "data-testid": "dynamic-array" },
                React.createElement("button", { type: "button", "data-testid": "add-element", onClick: () => {
                        onChange(value === null || value === void 0 ? void 0 : value.concat([""]));
                    } }, "Add one element to array"), value === null || value === void 0 ? void 0 :
                value.map((val, i) => {
                    return (React.createElement("input", { key: i, "data-testid": `dynamic-array-input${i}`, value: val, onChange: (e) => onChange(value === null || value === void 0 ? void 0 : value.map((v, j) => (i === j ? e.target.value : v))) }));
                })));
        }
        function NumberField() {
            return React.createElement("div", null, "number");
        }
        const mapping = [
            [z.string().array(), DynamicArray],
            [z.number(), NumberField],
        ];
        const Form = createTsForm(mapping);
        const schema = z.object({
            arrayField: z.string().array(),
            numberArray: z.number().array(),
        });
        const defaultValues = {
            arrayField: ["name", "name2"],
            numberArray: [1, 2, 3],
        };
        render(React.createElement(Form, { onSubmit: mockOnSubmit, schema: schema, defaultValues: defaultValues, props: {}, renderAfter: () => {
                return React.createElement("button", { type: "submit" }, "submit");
            } }));
        const numberNodes = screen.queryAllByText("number");
        numberNodes.forEach((node) => expect(node).toBeInTheDocument());
        expect(numberNodes).toHaveLength(3);
        expect(screen.getByTestId("dynamic-array")).toBeInTheDocument();
        const addElementButton = screen.getByTestId("add-element");
        yield userEvent.click(addElementButton);
        const inputs = screen.getAllByTestId(/dynamic-array-input/);
        expect(inputs.length).toBe(3);
        const input3 = screen.getByTestId("dynamic-array-input2");
        yield userEvent.type(input3, "name3");
        const button = screen.getByText("submit");
        yield userEvent.click(button);
        expect(mockOnSubmit).toHaveBeenCalledWith({
            arrayField: ["name", "name2", "name3"],
            numberArray: [1, 2, 3],
        });
    }));
    it("should render an array component with objects, and should map nonempty()", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockOnSubmit = jest.fn(() => { });
        const objectSchema = z.object({
            text: z.string(),
            numberField: z.number(),
        });
        function DynamicArray(_props) {
            const { field: { value, onChange }, } = useTsController();
            return (React.createElement("div", { "data-testid": "dynamic-array" },
                React.createElement("button", { type: "button", "data-testid": "add-element", onClick: () => {
                        onChange(value === null || value === void 0 ? void 0 : value.concat([{ text: "", numberField: 2 }]));
                    } }, "Add one element to array"), value === null || value === void 0 ? void 0 :
                value.map((val, i) => {
                    return (React.createElement("input", { key: i, "data-testid": `dynamic-array-input${i}`, value: val.text, onChange: (e) => onChange(value === null || value === void 0 ? void 0 : value.map((v, j) => i === j ? Object.assign(Object.assign({}, v), { text: e.target.value }) : v)) }));
                })));
        }
        function NumberField() {
            return React.createElement("div", null, "number");
        }
        const mapping = [
            [objectSchema.array(), DynamicArray],
            [z.number(), NumberField],
        ];
        const Form = createTsForm(mapping);
        const schema = z.object({
            arrayField: objectSchema.array().nonempty(),
            numberArray: z.number().array(),
        });
        const defaultValues = {
            arrayField: [
                { text: "name", numberField: 2 },
                { text: "name2", numberField: 2 },
            ],
            numberArray: [1, 2, 3],
        };
        render(React.createElement(Form, { onSubmit: mockOnSubmit, schema: schema, defaultValues: defaultValues, props: { arrayField: { something: true } }, renderAfter: () => {
                return React.createElement("button", { type: "submit" }, "submit");
            } }));
        const numberNodes = screen.queryAllByText("number");
        numberNodes.forEach((node) => expect(node).toBeInTheDocument());
        expect(numberNodes).toHaveLength(3);
        expect(screen.getByTestId("dynamic-array")).toBeInTheDocument();
        const addElementButton = screen.getByTestId("add-element");
        yield userEvent.click(addElementButton);
        const inputs = screen.getAllByTestId(/dynamic-array-input/);
        expect(inputs.length).toBe(3);
    }));
    describe("CustomChildRenderProp", () => {
        it("should not drop focus on rerender", () => __awaiter(void 0, void 0, void 0, function* () {
            const schema = z.object({
                fieldOne: z.string().regex(/moo/),
                fieldTwo: z.string(),
            });
            const Form = createTsForm([[z.string(), TextField]], {
                FormComponent: ({ children, }) => {
                    const { isSubmitting } = useFormState();
                    return (React.createElement("form", null,
                        children,
                        isSubmitting));
                },
            });
            const TestComponent = () => {
                const form = useForm({
                    mode: "onChange",
                    resolver: zodResolver(schema),
                });
                const values = Object.assign(Object.assign({}, form.getValues()), useWatch({ control: form.control }));
                return (React.createElement(Form, { form: form, schema: schema, defaultValues: {}, props: {
                        fieldOne: {
                            testId: "fieldOne",
                            beforeElement: React.createElement(React.Fragment, null,
                                "Moo",
                                JSON.stringify(values)),
                        },
                        fieldTwo: { testId: "fieldTwo" },
                    }, onSubmit: () => { } }, (fields) => {
                    const { isDirty } = useFormState();
                    const [state, setState] = useState(0);
                    useEffect(() => {
                        setState(1);
                    }, []);
                    return (React.createElement(React.Fragment, null,
                        Object.values(fields),
                        React.createElement("div", { "data-testid": "dirty" }, JSON.stringify(isDirty)),
                        React.createElement("div", { "data-testid": "state" }, state)));
                }));
            };
            render(React.createElement(TestComponent, null));
            const fieldOne = screen.queryByTestId("fieldOne");
            if (!fieldOne)
                throw new Error("fieldOne not found");
            fieldOne.focus();
            expect(fieldOne).toHaveFocus();
            yield userEvent.type(fieldOne, "t");
            expect(fieldOne).toHaveFocus();
            yield userEvent.type(fieldOne, "2");
            expect(fieldOne).toHaveFocus();
            expect(screen.queryByTestId("dirty")).toHaveTextContent("true");
            expect(screen.queryByTestId("state")).toHaveTextContent("1");
            screen.debug();
        }));
    });
});
//# sourceMappingURL=createSchemaForm.test.js.map