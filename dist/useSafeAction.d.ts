import { ActionState } from './ActionState';
import { FieldErrors } from "./FieldErrors";
type Action<TInput, TOutput> = (data: TInput) => Promise<ActionState<TInput, TOutput>>;
interface UseActionOptions<TOutput> {
    onSuccess?: (data: TOutput) => void;
    onError?: (error: string) => void;
    onComplete?: () => void;
}
export declare const useSafeAction: <TInput, TOutput>(action: Action<TInput, TOutput>, options?: UseActionOptions<TOutput>) => {
    execute: (input: TInput) => Promise<void>;
    fieldErrors: import("solid-js").Accessor<FieldErrors<TInput> | undefined>;
    error: import("solid-js").Accessor<string | null | undefined>;
    data: import("solid-js").Accessor<TOutput | undefined>;
    isLoading: import("solid-js").Accessor<boolean>;
};
export {};
