import React from "react";
import { z } from "zod";
import { addHiddenProperties, createUniqueFieldSchema, duplicateIdErrorMessage, HIDDEN_ID_PROPERTY, isSchemaWithHiddenProperties, } from "../createFieldSchema";
import { createTsForm } from "../createSchemaForm";
import { TextField } from "./utils/testForm";
describe("createFieldSchema", () => {
    it("should throw an error if an ID is used twice", () => {
        jest.spyOn(console, "error").mockImplementation(() => { });
        const mapping = [
            [createUniqueFieldSchema(z.string(), "id"), TextField],
            [createUniqueFieldSchema(z.string(), "id"), TextField],
        ];
        expect(() => {
            createTsForm(mapping);
        }).toThrowError(duplicateIdErrorMessage("id"));
    });
    it("should not throw an error if two different ids are used", () => {
        const mapping = [
            [createUniqueFieldSchema(z.string(), "id"), TextField],
            [createUniqueFieldSchema(z.string(), "id2"), TextField],
        ];
        expect(() => {
            createTsForm(mapping);
        }).not.toThrowError();
    });
    it("should correctly type the form with multiple unique field schemas.", () => {
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
        React.createElement(Form, { schema: z.object({
                a: A,
                b: B,
            }), onSubmit: () => { }, props: {
                a: {
                    req: "One",
                },
                b: {
                    req2: "Two",
                },
            } });
    });
});
describe("addHiddenProperties", () => {
    it("should add '_rtf_id' to the schema and should be typed as a schema with hidden properties", () => {
        const id = "a fake id";
        const schema = z.object({ id: z.string() });
        const withHiddenProperties = addHiddenProperties(schema, {
            [HIDDEN_ID_PROPERTY]: id,
        });
        expect(isSchemaWithHiddenProperties(withHiddenProperties) &&
            withHiddenProperties._def[HIDDEN_ID_PROPERTY] === id).toStrictEqual(true);
    });
});
//# sourceMappingURL=createFieldSchema.test.js.map