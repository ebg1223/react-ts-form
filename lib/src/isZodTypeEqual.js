import { ZodFirstPartyTypeKind, } from "zod";
import { unwrap } from "./unwrap";
export function isZodTypeEqual(_a, _b) {
    let { type: a, _rtf_id: idA } = unwrap(_a);
    let { type: b, _rtf_id: idB } = unwrap(_b);
    if (idA || idB) {
        return idA === idB;
    }
    if (a._def.typeName !== b._def.typeName)
        return false;
    if (a._def.typeName === ZodFirstPartyTypeKind.ZodArray &&
        b._def.typeName === ZodFirstPartyTypeKind.ZodArray) {
        if (isZodTypeEqual(a._def.type, b._def.type))
            return true;
        return false;
    }
    if (a._def.typeName === ZodFirstPartyTypeKind.ZodSet &&
        b._def.typeName === ZodFirstPartyTypeKind.ZodSet) {
        if (isZodTypeEqual(a._def.valueType, b._def.valueType))
            return true;
        return false;
    }
    if (a._def.typeName === ZodFirstPartyTypeKind.ZodMap &&
        b._def.typeName === ZodFirstPartyTypeKind.ZodMap) {
        if (isZodTypeEqual(a._def.keyType, b._def.keyType) &&
            isZodTypeEqual(a._def.valueType, b._def.valueType))
            return true;
        return false;
    }
    if (a._def.typeName === ZodFirstPartyTypeKind.ZodRecord &&
        b._def.typeName === ZodFirstPartyTypeKind.ZodRecord) {
        if (isZodTypeEqual(a._def.valueType, b._def.valueType))
            return true;
        return false;
    }
    if (a._def.typeName === ZodFirstPartyTypeKind.ZodTuple &&
        b._def.typeName === ZodFirstPartyTypeKind.ZodTuple) {
        const itemsA = a._def.items;
        const itemsB = b._def.items;
        if (itemsA.length !== itemsB.length)
            return false;
        for (let i = 0; i < itemsA.length; i++) {
            if (!isZodTypeEqual(itemsA[i], itemsB[i]))
                return false;
        }
        return true;
    }
    if (a._def.typeName === ZodFirstPartyTypeKind.ZodObject &&
        b._def.typeName === ZodFirstPartyTypeKind.ZodObject) {
        const shapeA = a._def.shape();
        const shapeB = b._def.shape();
        if (!shapeA || !shapeB) {
            if (!shapeA && !shapeB)
                return true;
            return false;
        }
        const keysA = Object.keys(shapeA);
        const keysB = Object.keys(shapeB);
        const setA = new Set(keysA);
        const setB = new Set(keysB);
        for (const key of keysB) {
            if (!setA.has(key))
                return false;
        }
        for (const key of keysA) {
            if (!setB.has(key))
                return false;
        }
        for (var key of keysA) {
            const valA = shapeA[key];
            const valB = shapeB[key];
            if (!valB || !isZodTypeEqual(valA, valB))
                return false;
        }
    }
    return true;
}
export function isZodString(zodType) {
    return isTypeOf(zodType, "ZodString");
}
export function isZodNumber(zodType) {
    return isTypeOf(zodType, "ZodNumber");
}
export function isZodBoolean(zodType) {
    return isTypeOf(zodType, "ZodBoolean");
}
export function isZodArray(zodType) {
    return isTypeOf(zodType, "ZodArray");
}
export function isZodObject(zodType) {
    return isTypeOf(zodType, "ZodObject");
}
export function isZodDefaultDef(zodDef) {
    return Boolean(zodDef &&
        typeof zodDef === "object" &&
        "defaultValue" in zodDef &&
        typeof zodDef.defaultValue === "function");
}
export function isZodDate(zodType) {
    return isTypeOf(zodType, "ZodDate");
}
export function isTypeOf(zodType, type) {
    return zodType._def.typeName === ZodFirstPartyTypeKind[type];
}
//# sourceMappingURL=isZodTypeEqual.js.map