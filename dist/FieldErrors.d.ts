export type FieldErrors<T> = {
    [K in keyof T]?: string[];
};
