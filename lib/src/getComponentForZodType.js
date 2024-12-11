import { isZodTypeEqual } from "./isZodTypeEqual";
export function getComponentForZodType(zodType, mapping) {
    for (const mappingElement of mapping) {
        if (isZodTypeEqual(zodType, mappingElement[0]))
            return mappingElement[1];
    }
    return;
}
//# sourceMappingURL=getComponentForZodType.js.map