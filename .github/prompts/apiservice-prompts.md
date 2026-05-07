# Create a New API Service

## Rules

1. Create the file at `src/api/services/{DomainName}.ts` using PascalCase
2. Define `const basePath = "your-api-prefix"` at the top
3. Each function is a standalone `async function` returning `Promise<RequestResponse<T>>`
4. Use the specific generic type for every return: `RequestResponse<IRidePrice[]>`, not `RequestResponse<any>`
5. Export the service as a **plain object literal**: `export const DomainService = { fn1, fn2 }`
6. Export React Query key constants as `SCREAMING_SNAKE_CASE`
7. Import request/response types from `types/requests/` and `types/response/`

## HTTP Client Methods

- `getHttpClient<T>(url)` — GET requests
- `postHttpClient<T>(url, body)` — POST requests
- `putHttpClient<T>(url, body)` — PUT requests
- `patchHttpClient<T>(url, body?)` — PATCH requests
- `deleteHttpClient<T>(url)` — DELETE requests

## Template

```ts
import { getHttpClient, postHttpClient, patchHttpClient, deleteHttpClient } from "api/httpClient";
import type { RequestResponse } from "api/httpClient";
import type { ICreateEntity } from "types/requests/ICreateEntity";
import type { IEntity } from "types/response/IEntity";
import type { IGenericResponse } from "types/response/IGenericResponse";

const basePath = "entities";

// Query key constants
export const GET_ENTITIES_QUERY_KEY = "getEntities";
export const GET_ENTITY_BY_ID_QUERY_KEY = "getEntityById";

async function getEntities(): Promise<RequestResponse<IEntity[]>> {
  return await getHttpClient(`${basePath}`);
}

async function getEntityById(id: string): Promise<RequestResponse<IEntity>> {
  return await getHttpClient(`${basePath}/${id}`);
}

async function createEntity(data: ICreateEntity): Promise<RequestResponse<IGenericResponse<IEntity>>> {
  return await postHttpClient(`${basePath}`, data);
}

async function updateEntity(id: string, data: Partial<ICreateEntity>): Promise<RequestResponse<IEntity>> {
  return await patchHttpClient(`${basePath}/${id}`, data);
}

async function deleteEntity(id: string): Promise<RequestResponse<IGenericResponse>> {
  return await deleteHttpClient(`${basePath}/${id}`);
}

export const EntityService = {
  getEntities,
  getEntityById,
  createEntity,
  updateEntity,
  deleteEntity,
};
```
