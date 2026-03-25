export { API_NAMESPACE, MOCK_API_URL } from "./constants/routes.js";
export { makeServer } from "./server/makeServer.js";
export type { MakeServerOptions } from "./server/makeServer.js";
export type { MockDatabaseSnapshot } from "./db/mock-database.js";
export type {
  CreateStoreInput,
  Store,
  StoreResponse,
  UpdateStoreInput,
} from "./contracts/store.types.js";
export type {
  CreateProductInput,
  Product,
  UpdateProductInput,
} from "./contracts/product.types.js";
