export interface MockDbCollection<T> {
  readonly length: number;
  readonly [index: number]: T;
  [Symbol.iterator](): Iterator<T>;
  find(id: string): T | undefined;
  findBy(query: Partial<T>): T | undefined;
  insert(record: T): T;
  update(id: string, attrs: Partial<T>): T | undefined;
  remove(id: string): void;
  where(query: Partial<T>): T[];
}

export interface MockSchema {
  db: {
    stores: unknown;
    products: unknown;
  };
}

export interface MockRequest {
  params: Record<string, string | undefined>;
  queryParams: Record<string, string | undefined>;
  requestBody: string;
}

export interface MockRouteServer {
  namespace: string;
  get(
    path: string,
    handler: (schema: MockSchema, request: MockRequest) => unknown,
  ): void;
  post(
    path: string,
    handler: (schema: MockSchema, request: MockRequest) => unknown,
  ): void;
  patch(
    path: string,
    handler: (schema: MockSchema, request: MockRequest) => unknown,
  ): void;
  del(
    path: string,
    handler: (schema: MockSchema, request: MockRequest) => unknown,
  ): void;
}

export function asCollection<T>(value: unknown): MockDbCollection<T> {
  return value as MockDbCollection<T>;
}

export function collectionToArray<T>(value: unknown): T[] {
  return Array.from(asCollection<T>(value));
}
