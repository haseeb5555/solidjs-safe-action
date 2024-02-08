import { z } from "zod";
import { ActionState } from "./ActionState";
export declare const createSafeAction: <TInput, TOutput>(schema: z.ZodType<TInput, z.ZodTypeDef, TInput>, handler: (validatedData: TInput) => Promise<ActionState<TInput, TOutput>>) => (data: TInput) => Promise<ActionState<TInput, TOutput>>;
