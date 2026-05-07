# Create a New Component

## Rules

1. Place shared/reusable components in `src/components/shared/`
2. Place domain-specific components in `src/components/{domain}/`
3. File name matches component name in PascalCase with a descriptive suffix:
   - `*Card` — card-style display
   - `*Modal` — overlay/dialog
   - `*Sheet` — bottom sheet / slide-up panel
   - `*Pill` — small badge/status indicator
   - `*Skeleton` — loading placeholder
   - `*View` — presentational sub-view
   - `*List` — list renderer
   - `*Input` — form input
   - `*Picker` — selector/picker
4. Use a **function declaration** with `export default`
5. Define `type Props = { ... }` at the top
6. Accept optional `containerClassName` and/or `textClassName` props for parent overrides
7. Use `twMerge` to merge base classes with override classes
8. Use semantic Tailwind tokens, not raw colors
9. Path aliases for all imports

## Template

```tsx
import { twMerge } from "tailwind-merge";
import { useThemedColours } from "providers/ThemeProvider";
import { scale } from "utility/scaling";

type Props = {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  containerClassName?: string;
};

function FeatureCard(props: Props) {
  const { title, subtitle, onPress, containerClassName } = props;
  const colours = useThemedColours();

  return (
    <div
      className={twMerge(
        "flex flex-col gap-2 p-4 rounded-lg bg-surface dark:bg-darkSurface border border-borderColor dark:border-darkBorderColor",
        containerClassName
      )}
      onClick={onPress}
    >
      <h3 className="text-lg font-semibold text-onSurface dark:text-darkOnSurface">
        {title}
      </h3>
      {subtitle && (
        <p className="text-sm text-placeholder dark:text-darkPlaceholder">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default FeatureCard;
```
