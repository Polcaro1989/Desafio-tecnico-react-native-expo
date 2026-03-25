import type { Product } from "../contracts/product.types.js";

export function mapProduct(product: Product): Product {
  return {
    ...product,
    price: Number(product.price.toFixed(2)),
  };
}
