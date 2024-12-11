import { z, ZodFirstPartyTypeKind, } from "zod";
import { HIDDEN_ID_PROPERTY, isSchemaWithHiddenProperties, } from "./createFieldSchema";
const unwrappable = new Set([
    z.ZodFirstPartyTypeKind.ZodOptional,
    z.ZodFirstPartyTypeKind.ZodNullable,
    z.ZodFirstPartyTypeKind.ZodBranded,
    z.ZodFirstPartyTypeKind.ZodDefault,
]);
export function unwrap(type) {
    let r = type;
    let unwrappedHiddenId = null;
    while (unwrappable.has(r._def.typeName)) {
        if (isSchemaWithHiddenProperties(r)) {
            unwrappedHiddenId = r._def[HIDDEN_ID_PROPERTY];
        }
        switch (r._def.typeName) {
            case z.ZodFirstPartyTypeKind.ZodOptional:
                r = r._def.innerType;
                break;
            case z.ZodFirstPartyTypeKind.ZodBranded:
                r = r._def.type;
                break;
            case z.ZodFirstPartyTypeKind.ZodNullable:
                r = r._def.innerType;
                break;
            case z.ZodFirstPartyTypeKind.ZodDefault:
                r = r._def.innerType;
                break;
        }
    }
    let innerHiddenId = null;
    if (isSchemaWithHiddenProperties(r)) {
        innerHiddenId = r._def[HIDDEN_ID_PROPERTY];
    }
    return {
        type: r,
        [HIDDEN_ID_PROPERTY]: innerHiddenId || unwrappedHiddenId,
    };
}
export function unwrapEffects(effects) {
    if (effects._def.typeName === ZodFirstPartyTypeKind.ZodEffects) {
        return effects._def.schema;
    }
    return effects;
}
//# sourceMappingURL=unwrap.js.map