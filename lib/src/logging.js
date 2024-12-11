const shownWarnings = {
    enum: false,
    useEnum: false,
    duplicateSchema: false,
};
function err(message) {
    console.warn(`@ts-react/form: ${message}`);
}
export function duplicateTypeError() {
    if (shownWarnings.duplicateSchema)
        return;
    shownWarnings.duplicateSchema = true;
    err("Found duplicate zod schema in zod-component mapping. Each zod type in the mapping must be unique, if you need to map multiple of the same types to different schemas use createUniqueFieldSchema.");
}
export function printWarningsForSchema(_type) {
}
//# sourceMappingURL=logging.js.map