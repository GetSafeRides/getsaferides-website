# SafeRides Web — Coding Standards


# Main Instruction
- Don't delete existing files such as .github and .vscode — these contain important configuration and instructions for the project
- Follow the coding standards outlined in this file for all new code contributions to ensure consistency and maintainability across the codebase.

## Architecture

- Use TypeScript strict mode with all strict flags enabled
- Organize `src/` by domain: `api/`, `components/`, `screens/`, `store/`, `types/`, `utility/`, `constants/`, `providers/`, `assets/`, `navigation/`
- One component per file, no barrel/index.ts files
- Path aliases for every `src/` subfolder — no deep relative imports
- Import order: third-party → path aliases → relative siblings

## Components

- Function declarations for all components (not arrow functions, not `React.FC`)
- Default exports for components, named exports only for types
- Props defined as `type Props = { ... }` at the top of the file
- Destructure props in the function body (preferred) or signatures
- Inner helper logic uses regular function declarations inside the component body
- Use descriptive suffixes: `*Card`, `*Modal`, `*Sheet`, `*Pill`, `*Screen`, `*Skeleton`, `*View`, `*List`, `*Input`, `*Picker`

## Naming

- Component/Screen/Service files: PascalCase `.tsx` / `.ts`
- Utility/hook/constant files: camelCase `.ts`
- Interfaces: `I` prefix (`IUser`, `IRideRequest`). Type aliases: no prefix
- Booleans: `is`, `has`, `should` prefix
- Event handlers: `on` or `handle` prefix
- Async service functions: `*Async` suffix
- Query keys: `SCREAMING_SNAKE_CASE` constants
- Redux slices: camelCase with `Slice` suffix
- Enums: PascalCase name, SCREAMING_SNAKE values matching backend

## API Layer

- All API calls return `RequestResponse<T>` discriminated union — never throw
- `type RequestResponse<T> = { data: T; error: undefined } | { data: undefined; error: AxiosResponse }`
- Verb-based HTTP client: `getHttpClient<T>`, `postHttpClient<T>`, `putHttpClient<T>`, `patchHttpClient<T>`, `deleteHttpClient<T>`
- 401 interceptor with single-flight token refresh queue
- Auto-detect FormData — skip JSON serialization and Content-Type header

## Services

- One file per backend domain, plain object literal export (`export const RideService = { ... }`)
- `const basePath` at top of file for the API prefix
- Every function returns `Promise<RequestResponse<T>>`
- Export query key constants as `SCREAMING_SNAKE_CASE`

## State Management

- Redux Toolkit with `createSlice`, typed hooks only (`useAppDispatch`, `useAppSelector`)
- Convenience selector hooks per slice: `useUser()`, `useRide()`
- Persist only what's needed via whitelist

## Data Fetching

- React Query (`useQuery`, `useMutation`) for all server state
- Wrap service calls in `*Async` functions that handle the `RequestResponse` union
- Use `enabled` guards for conditional queries
- Export reusable query hooks from `utility/hooks/`

## Styling

- Tailwind CSS as primary styling method
- Semantic color tokens (not raw hex): `surface`, `onSurface`, `primary`, `error`, `borderColor`, etc.
- Dark mode via `dark:` prefix: `bg-surface dark:bg-darkSurface`
- `twMerge` for merging/overriding Tailwind classes
- Accept `containerClassName` / `textClassName` props for parent overrides
- `scale()` utility for responsive numeric values
- Themed StyleSheet factory at bottom of file when CSS-in-JS is needed

## Forms

- Formik for form state, Yup for validation schemas
- Regex patterns stored in `constants/validation.ts`

## Error & Loading States

- 3-tier errors: `ErrorScreen` (critical) → inline text (minor) → Toast (background)
- 3-tier loading: Skeleton components → button ActivityIndicator → full-screen Loading
- Always handle empty state with a placeholder message

## Dates

- Luxon (`DateTime`) for complex operations (timezone, duration, relative time)
- dayjs only for simple formatting
- Always convert server dates through a timezone-aware bridge

## Theming

- 3 modes: `auto`, `light`, `dark`
- `useThemedColours()` hook for current resolved colours
- `useThemedStyle(themedStylesFactory)` hook for themed StyleSheets
- Persist theme preference in storage

## Real-Time

- Socket.IO via React Context provider
- Enum-based event names (`SocketEvents`)
- Token-based auth, connect on login, disconnect on logout
