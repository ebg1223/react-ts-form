import { z } from "zod";
import { errorFromRhfErrorObject, } from "../zodObjectErrors";
import { expectTypeOf } from "expect-type";
describe("zodObjectErrors", () => {
    it("should parse a react hook form top level error into a top level error message object", () => {
        const errorObj = {
            message: "Required",
            type: "invalid_type",
        };
        const expected = {
            errorMessage: "Required",
        };
        const result = errorFromRhfErrorObject(errorObj);
        expect(result).toStrictEqual(expected);
    });
    it("should parse an object recursively", () => {
        const errorObj = {
            fieldOne: {
                message: "Required",
                type: "invalid_type",
            },
            fieldTwo: {
                nestOne: {
                    message: "Required",
                    type: "invalid_type",
                },
                nestTwo: {
                    message: "Required",
                    type: "invalid_type",
                },
            },
        };
        const expected = {
            fieldOne: {
                errorMessage: "Required",
            },
            fieldTwo: {
                nestOne: {
                    errorMessage: "Required",
                },
                nestTwo: {
                    errorMessage: "Required",
                },
            },
        };
        const result = errorFromRhfErrorObject(errorObj);
        expect(result).toStrictEqual(expected);
    });
    it("should give the correct typings based on the explicitly passed object type", () => {
        const Schema = z.object({
            fieldOne: z.string(),
            nested: z.object({
                fieldOne: z.string(),
                nestedTwo: z.object({
                    fieldOne: z.string(),
                }),
            }),
        });
        const o = {};
        expectTypeOf(o).toMatchTypeOf();
    });
});
//# sourceMappingURL=zodObjectErrors.test.js.map