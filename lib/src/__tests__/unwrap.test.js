import { z } from "zod";
import React from "react";
import { createTsForm } from "../createSchemaForm";
describe("unwrap types", () => {
    it("should have the correct types for nullable, optional, and nullish", () => {
        function TextField(_) {
            return React.createElement("div", null);
        }
        const mapping = [[z.string(), TextField]];
        const Form = createTsForm(mapping);
        React.createElement(Form, { onSubmit: (data) => {
                data.nullableString;
            }, schema: z.object({
                nullableString: z.string().nullable(),
                optionalString: z.string().optional(),
                nullishString: z.string().nullish(),
            }), props: {
                nullableString: {
                    one: "One",
                },
                optionalString: {
                    one: "One",
                },
                nullishString: {
                    one: "One",
                },
            } });
    });
    it("should have the correct types for nullable optional", () => {
        function TextField(_) {
            return React.createElement("div", null);
        }
        const mapping = [[z.string(), TextField]];
        const Form = createTsForm(mapping);
        React.createElement(Form, { onSubmit: (data) => {
                data.optionalNullableString;
                data.nullableOptionalString;
            }, schema: z.object({
                optionalNullableString: z.string().optional().nullable(),
                nullableOptionalString: z.string().nullable().optional(),
            }), props: {
                optionalNullableString: {
                    one: "One",
                },
                nullableOptionalString: {
                    one: "One",
                },
            } });
    });
    it("should have the correct types for .default()", () => {
        function TextField(_) {
            return React.createElement("div", null);
        }
        const mapping = [[z.string(), TextField]];
        const Form = createTsForm(mapping);
        React.createElement(Form, { onSubmit: (data) => {
                data.optionalNullableString;
            }, schema: z.object({
                optionalNullableString: z
                    .string()
                    .default("moo")
                    .describe("something")
                    .optional()
                    .nullable(),
            }), props: {
                optionalNullableString: {
                    one: "One",
                },
            } });
    });
    it("should have the correct types for .enum().array()", () => {
        function TextField(_) {
            return React.createElement("div", null);
        }
        const mapping = [
            [z.enum(["placeholder"]).array(), TextField],
            [z.enum(["placeholder"]), TextField],
        ];
        const Form = createTsForm(mapping);
        React.createElement(Form, { onSubmit: (data) => {
                data.enumArray;
                data.enum;
            }, schema: z.object({
                enum: z.enum(["moo"]),
                enumArray: z.enum(["moo"]).array(),
                enumArrayWithEverything: z
                    .enum(["moo"])
                    .optional()
                    .nullable()
                    .default("moo")
                    .array()
                    .optional()
                    .nullable()
                    .default(["moo"]),
            }), props: {
                enumArrayWithEverything: {
                    one: "One",
                },
                enumArray: {
                    one: "One",
                },
                enum: {
                    one: "One",
                },
            } });
    });
});
//# sourceMappingURL=unwrap.test.js.map