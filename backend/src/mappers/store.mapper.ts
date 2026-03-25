import type { Product } from "../contracts/product.types.js";
import type { Store, StoreResponse } from "../contracts/store.types.js";

export function mapStore(store: Store, products: Product[]): StoreResponse {
  return {
    ...store,
    productCount: products.filter((product) => product.storeId === store.id)
      .length,
  };
}
