import { createSignal } from "solid-js";
import { ActionState }  from './ActionState'
import { FieldErrors } from "./FieldErrors";


type Action<TInput, TOutput> = (
  data: TInput
) => Promise<ActionState<TInput, TOutput>>;

interface UseActionOptions<TOutput> {
  onSuccess?: (data: TOutput) => void;
  onError?: (error: string) => void;
  onComplete?: () => void;
}

export const useSafeAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options: UseActionOptions<TOutput> = {}
) => {
  const [fieldErrors, setFieldErrors] = createSignal<FieldErrors<TInput> | undefined>(
    undefined
  );
  const [error, setError] = createSignal<string | undefined | null>(
    undefined
  );
  const [data, setData] = createSignal<TOutput | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = createSignal<boolean>(false);

  const execute = async (input: TInput) => {
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
    } finally {
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
