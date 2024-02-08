"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSafeAction = void 0;
const solid_js_1 = require("solid-js");
const useSafeAction = (action, options = {}) => {
    const [fieldErrors, setFieldErrors] = (0, solid_js_1.createSignal)(undefined);
    const [error, setError] = (0, solid_js_1.createSignal)(undefined);
    const [data, setData] = (0, solid_js_1.createSignal)(undefined);
    const [isLoading, setIsLoading] = (0, solid_js_1.createSignal)(false);
    const execute = async (input) => {
        setIsLoading(true);
        try {
            const result = await action(input);
            if (!result) {
                return;
            }
            setFieldErrors(() => result.fieldErrors);
            if (result.error) {
                setError(() => result.error);
                options.onError?.(result.error);
            }
            if (result.data) {
                setData(() => result.data);
                options.onSuccess?.(result.data);
            }
        }
        finally {
            setIsLoading(false);
            options.onComplete?.();
        }
    };
    return {
        execute,
        fieldErrors,
        error,
        data,
        isLoading,
    };
};
exports.useSafeAction = useSafeAction;
