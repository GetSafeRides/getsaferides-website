# Create a New Type or Interface

## Rules

1. **Interfaces** use the `I` prefix: `IUser`, `IRideRequest`, `IAddress`
2. **Type aliases** have no prefix: `Props`, `RequestResponse<T>`
3. **Enums** use PascalCase name with SCREAMING_SNAKE values: `enum RideStatus { PENDING = "PENDING" }`
4. All domain entities extend `IBase`:

   ```ts
   export interface IBase {
     id?: string;
     createdAt?: Date;
     updatedAt?: Date;
   }
   ```

5. Place files in the correct subdirectory:
   - `types/enums/` — all enumerations
   - `types/requests/` — request DTOs (what you send to the API)
   - `types/response/` — response DTOs (what the API returns)
   - `types/common/` — shared value objects (IAddress, ICoordinate)
   - `types/{domain}/` — domain-specific interfaces (rider/, company/, user/)
6. Use named exports for all types
7. Use generic response wrappers for API responses:

   ```ts
   export interface IGenericResponse<T = undefined> {
     message: string;
     entity?: T;
   }
   export interface IPaginationResponse<T> {
     data: T[];
     total: number;
     page: number;
     pageSize: number;
     totalPages: number;
   }
   ```

## Template — Entity Interface

```ts
// filepath: src/types/{domain}/I{EntityName}.ts
import type { IBase } from "types/IBase";
import type { SomeEnum } from "types/enums/SomeEnum";

export interface IEntityName extends IBase {
  name: string;
  status: SomeEnum;
  relatedEntityId: string;
  metadata?: Record<string, unknown>;
}
```

## Template — Request DTO

```ts
// filepath: src/types/requests/ICreate{EntityName}.ts
export interface ICreateEntityName {
  name: string;
  relatedEntityId: string;
  metadata?: Record<string, unknown>;
}
```

## Template — Enum

```ts
// filepath: src/types/enums/{EnumName}.ts
export enum EntityStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  PENDING = "PENDING",
  ARCHIVED = "ARCHIVED",
}
```
