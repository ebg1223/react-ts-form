import { z } from "zod";
const ObjectSchema = z.object({});
const TopLevelErrorSchema = z.object({
    message: z.string(),
    type: z.string(),
});
function isObj(o) {
    return ObjectSchema.safeParse(o).success;
}
function isWithTopLevelErrorMessage(o) {
    return TopLevelErrorSchema.safeParse(o).success;
}
export function errorFromRhfErrorObject(o) {
    if (!isObj(o))
        return;
    if (isWithTopLevelErrorMessage(o))
        return { errorMessage: o.message };
    const r = {};
    for (const key in o) {
        r[key] = errorFromRhfErrorObject(o[key]);
    }
    return r;
}
//# sourceMappingURL=zodObjectErrors.js.map