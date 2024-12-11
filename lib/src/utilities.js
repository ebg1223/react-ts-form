export function pickPrimitiveObjectProperties(obj, pick) {
    return Object.entries(pick).reduce((result, [key]) => {
        const value = obj[key];
        if (typeof value === "string" ||
            typeof value === "number" ||
            typeof value === "boolean" ||
            typeof value === "bigint" ||
            value === undefined) {
            result[key] = value;
        }
        return result;
    }, {});
}
//# sourceMappingURL=utilities.js.map