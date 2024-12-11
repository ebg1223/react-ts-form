import React from "react";
import { z } from "zod";
import { getComponentForZodType } from "../getComponentForZodType";
function TextField(_) {
    return React.createElement("input", null);
}
function BooleanField(_) {
    return React.createElement("input", null);
}
function EnumField(_) {
    return React.createElement("input", null);
}
const mapping = [
    [z.string(), TextField],
    [z.boolean(), BooleanField],
    [z.enum(["One"]), EnumField],
];
describe("getComponentForZodType", () => {
    it("should get the appropriate component for the zod type based on the mapping", () => {
        for (const mappingElement of mapping) {
            expect(getComponentForZodType(mappingElement[0], mapping)).toStrictEqual(mappingElement[1]);
        }
    });
    it("should return undefined if there is no matching zod type", () => {
        expect(getComponentForZodType(z.number(), mapping)).toStrictEqual(undefined);
    });
});
//# sourceMappingURL=getComponentForZodType.test.js.map