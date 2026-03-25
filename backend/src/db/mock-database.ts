import type { Product } from "../contracts/product.types.js";
import type { Store } from "../contracts/store.types.js";
import { collectionToArray, type MockSchema } from "../server/mirage.types.js";
import { initialProducts, initialStores } from "./seeds.js";

export interface MockDatabaseSnapshot {
  stores: Store[];
  products: Product[];
}

function cloneStore(store: Store): Store {
  return { ...store };
}

function cloneProduct(product: Product): Product {
  return { ...product };
}

function isStore(value: unknown): value is Store {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<Store>;

  return (
    typeof candidate.id === "string" &&
    typeof candidate.name === "string" &&
    typeof candidate.address === "string"
  );
}

function isProduct(value: unknown): value is Product {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<Product>;

  return (
    typeof candidate.id === "string" &&
    typeof candidate.storeId === "string" &&
    typeof candidate.name === "string" &&
    typeof candidate.category === "string" &&
    typeof candidate.price === "number"
  );
}

export function createSeedMockDatabaseSnapshot(): MockDatabaseSnapshot {
  return {
    stores: initialStores.map(cloneStore),
    products: initialProducts.map(cloneProduct),
  };
}

export function normalizeMockDatabaseSnapshot(
  value: unknown,
): MockDatabaseSnapshot {
  if (!value || typeof value !== "object") {
    return createSeedMockDatabaseSnapshot();
  }

  const candidate = value as Partial<Record<keyof MockDatabaseSnapshot, unknown>>;

  if (
    !Array.isArray(candidate.stores) ||
    !candidate.stores.every(isStore) ||
    !Array.isArray(candidate.products) ||
    !candidate.products.every(isProduct)
  ) {
    return createSeedMockDatabaseSnapshot();
  }

  return {
    stores: candidate.stores.map(cloneStore),
    products: candidate.products.map(cloneProduct),
  };
}

export function readMockDatabaseSnapshot(
  schema: MockSchema,
): MockDatabaseSnapshot {
  return {
    stores: collectionToArray<Store>(schema.db.stores).map(cloneStore),
    products: collectionToArray<Product>(schema.db.products).map(cloneProduct),
  };
}
