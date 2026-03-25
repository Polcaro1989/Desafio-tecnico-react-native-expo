import type {
  CreateProductInput,
  Product,
  UpdateProductInput,
} from "../contracts/product.types.js";
import { createId } from "../utils/create-id.js";

export function createProduct(data: CreateProductInput): Product {
  return {
    id: createId("product"),
    storeId: data.storeId,
    name: data.name.trim(),
    category: data.category.trim(),
    price: Number(data.price.toFixed(2)),
  };
}

export function applyProductUpdate(
  product: Product,
  updates: UpdateProductInput,
): Product {
  return {
    ...product,
    name: updates.name?.trim() ?? product.name,
    category: updates.category?.trim() ?? product.category,
    price:
      updates.price !== undefined
        ? Number(updates.price.toFixed(2))
        : product.price,
  };
}
