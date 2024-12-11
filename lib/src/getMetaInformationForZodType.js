import { z } from "zod";
import { unwrap } from "./unwrap";
export const SPLIT_DESCRIPTION_SYMBOL = " // ";
export function parseDescription(description) {
    if (!description)
        return;
    const [label, ...rest] = description
        .split(SPLIT_DESCRIPTION_SYMBOL)
        .map((e) => e.trim());
    const placeholder = rest.join(SPLIT_DESCRIPTION_SYMBOL);
    return {
        label: label,
        placeholder: placeholder ? placeholder : undefined,
    };
}
export function getEnumValues(type) {
    if (!(type._def.typeName === z.ZodFirstPartyTypeKind.ZodEnum))
        return;
    return type._def.values;
}
function isSchemaWithUnwrapMethod(schema) {
    return "unwrap" in schema;
}
function recursivelyGetDescription(type) {
    let t = type;
    if (t._def.description)
        return t._def.description;
    while (isSchemaWithUnwrapMethod(t)) {
        t = t.unwrap();
        if (t._def.description)
            return t._def.description;
    }
    return;
}
export function getMetaInformationForZodType(type) {
    const unwrapped = unwrap(type);
    const description = recursivelyGetDescription(type);
    return {
        description: parseDescription(description),
        enumValues: getEnumValues(unwrapped.type),
    };
}
//# sourceMappingURL=getMetaInformationForZodType.js.map