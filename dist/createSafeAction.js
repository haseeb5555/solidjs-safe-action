"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSafeAction = void 0;
const createSafeAction = (schema, handler) => {
    return async (data) => {
        const validationResult = schema.safeParse(data);
        if (!validationResult.success) {
            return {
                fieldErrors: validationResult.error.flatten().fieldErrors,
            };
        }
        return handler(validationResult.data);
    };
};
exports.createSafeAction = createSafeAction;
