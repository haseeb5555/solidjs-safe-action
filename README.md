 # @solidjs/actions

 This package is designed to handle mutations in your solid-start app efficiently. It ensures type safety, input validation, and handles server errors and success states, providing a reliable and safe way to execute Solidjs Server Actions.

 ## Installation

You can install this package via npm or yarn:

```bash
npm install @solidjs/actions
# or
yarn add  @solidjs/actions

```

## Usage Example 
Here is an example of how to use @solidjs/actions in a SolidJS application:
### src/actions/index.ts
First, create a safe action:

```ts filename="index.ts" copy 

'use server'
import { createSafeAction } from "@solidjs/actions";
import { simulateDatabaseCall } from "~/lib/mock"; // mock db call
import { CreateForm } from "~/lib/schema"; // zod schema for validation 
import { InputType, ReturnType } from "~/lib/types"; // type infer from zod schema and type of your action state 

const handler = async (data: InputType): Promise<ReturnType> => {
  const { title } = data;
  let item;

  try {
    // Mock db call 
    item = await simulateDatabaseCall({ title})

  } catch (error) {
    return { error: 'Failed to create!' };
  }


  return { data: item };
};

export const createForm = createSafeAction(CreateForm, handler);

```
### src/lib/schema.ts
Define types based on the Zod schema:

```ts filename="schema.ts" copy 

import { z } from "zod";

export const CreateForm = z.object({
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title is required"
  }).min(4, { message: 'Title too short' }),
});

```

### src/lib/types.ts
Define types based on the Zod schema:
```ts filename="schema.ts" copy 
import { z } from "zod";

import { ActionState } from "~/lib/create-safe-action";

import { CreateForm } from "./schema";

export type InputType = z.infer<typeof CreateForm>;
export type ReturnType = ActionState<InputType, { title: string; }>;

```
### src/routes/index.tsx
Finally, use the useSafeAction hook to execute the action:

```tsx filename="index.tsx" copy
import { useSafeAction } from "@solidjs/actions";
import { createForm } from "~/actions/index;

const ExampleButtonPage = () => {
  const { execute, isLoading, } = useSafeAction(createForm, {
    onSuccess: (data) => {
      window.alert(`Success: ${JSON.stringify(data, null, 2)}`);
    },
    onError: (error) => {
      window.alert("Error: " + error);
    }
  });

  const onClick = (title: string) => {
    execute({ title });
  };

  return ( 
    <button disabled={isLoading()} onClick={() => onClick("Button")}>
      Click to make a database call using server action
    </button>
  );
};

export default ExampleButtonPage;

```





