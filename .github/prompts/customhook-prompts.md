# Create a New Custom Hook

## Rules

1. Create at `src/utility/hooks/use{HookName}.ts`
2. File name starts with `use` in camelCase
3. Function name matches file name exactly
4. Export as a **named export** (not default)
5. Return an object with descriptive keys — not positional arrays
6. Use typed state and parameters
7. Clean up side effects in `useEffect` return

## Patterns

### Data Fetching Hook (wraps React Query)

```ts
import { useQuery } from "@tanstack/react-query";
import { SomeService, QUERY_KEY } from "api/services/SomeDomain";
import Toast from "react-hot-toast";

export function useSomeData(id?: string) {
  async function fetchAsync() {
    const { data, error } = await SomeService.getById(id!);
    if (error || !data) {
      Toast.error("Failed to fetch data");
      return null;
    }
    return data;
  }

  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: fetchAsync,
    enabled: !!id,
  });
}
```

### Action Hook (dispatch + side effects)

```ts
import { useAppDispatch } from "store/hooks";
import { setSomeState } from "store/slices/someSlice";

export function useSomeAction() {
  const dispatch = useAppDispatch();

  async function performAction(payload: SomePayload) {
    // Side effects, API calls, then dispatch
    dispatch(setSomeState(payload));
  }

  return { performAction };
}
```

### Utility Hook (local state + effect)

```ts
import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
```
