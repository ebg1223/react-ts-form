export const HIDDEN_ID_PROPERTY = "_rtf_id";
export function isSchemaWithHiddenProperties(schemaType) {
    return HIDDEN_ID_PROPERTY in schemaType._def;
}
export function addHiddenProperties(schema, properties) {
    for (const key in properties) {
        schema._def[key] = properties[key];
    }
    return schema;
}
export function duplicateIdErrorMessage(id) {
    return `Duplicate id passed to createFieldSchema: ${id}. Ensure that each id is only being used once and that createFieldSchema is only called at the top level.`;
}
export function createUniqueFieldSchema(schema, id) {
    const r = schema.brand();
    return addHiddenProperties(r, {
        [HIDDEN_ID_PROPERTY]: id,
    });
}
//# sourceMappingURL=createFieldSchema.js.map