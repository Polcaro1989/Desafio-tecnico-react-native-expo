import type {
  CreateProductInput,
  CreateStoreInput,
  Product,
  StoreResponse,
  UpdateProductInput,
  UpdateStoreInput,
} from "@/shared/backend-mock";

export type { Product, StoreResponse };

export interface ProductListResponse {
  products: Product[];
}

export interface StoreListResponse {
  stores: StoreResponse[];
}

export type StoreFormValues = CreateStoreInput;

export interface ProductFormValues
  extends Omit<CreateProductInput, "price" | "storeId"> {
  price: string;
}

export type StoreUpdateValues = UpdateStoreInput;
export type ProductUpdateValues = UpdateProductInput;
