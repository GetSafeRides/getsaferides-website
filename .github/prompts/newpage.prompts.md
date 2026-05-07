# Create a New Page / Screen

## Rules

1. Create the file at `src/screens/{Domain}/{PageName}.tsx` using PascalCase
2. Use a **function declaration** with `export default` — no arrow functions, no `React.FC`
3. Define `type Props = { ... }` at the top of the file
4. Destructure props in the function body
5. Use `useThemedColours()` for color tokens and `useThemedStyle(themedStyles)` for themed StyleSheets
6. Place the `themedStyles` factory function at the **bottom** of the file
7. Use path aliases for all imports — no deep relative paths
8. Import order: third-party → path aliases → relative siblings

## Data Fetching

- Fetch data with React Query (`useQuery` + an `*Async` wrapper that handles `RequestResponse`)
- Handle **3 states**: loading (Skeleton component), error (`ErrorScreen` + retry), success (render content)
- Handle the empty-data case with a placeholder message

## Styling

- Use Tailwind CSS classes as the primary styling method
- Use semantic color tokens: `bg-surface dark:bg-darkSurface`, `text-onSurface dark:text-darkOnSurface`
- Use `scale()` for responsive numeric values in StyleSheets
- Accept optional `containerClassName` prop if the screen is reusable

## Template

```tsx
import { useQuery } from "@tanstack/react-query";
import { useThemedColours, useThemedStyle } from "providers/ThemeProvider";
import { SomeService, QUERY_KEY } from "api/services/SomeDomain";
import ErrorScreen from "components/shared/ErrorScreen";
import SomeSkeleton from "components/skeletons/SomeSkeleton";
import { scale } from "utility/scaling";

type Props = {
  // define props here
};

function PageName(props: Props) {
  const {} = props;
  const colours = useThemedColours();
  const styles = useThemedStyle(themedStyles);

  async function fetchDataAsync() {
    const { data, error } = await SomeService.getData();
    if (error || !data) return null;
    return data;
  }

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: fetchDataAsync,
  });

  if (isLoading) return <SomeSkeleton />;
  if (isError) return <ErrorScreen retry={refetch} message="Failed to load data" />;

  return (
    <div className="flex flex-col flex-1 bg-surface dark:bg-darkSurface">
      {/* Page content */}
    </div>
  );
}

export default PageName;

const themedStyles = (colours: ThemeColours) => ({
  container: {
    padding: scale(16),
  },
});
```
