import type {
  CreateProductInput,
  CreateStoreInput,
  Product,
  StoreResponse,
  UpdateProductInput,
  UpdateStoreInput,
} from "@/shared/backend-mock";

import { apiRequest } from "@/shared/api/api-client";
import type { ProductListResponse, StoreListResponse } from "./types";

export const inventoryApi = {
  async listStores(): Promise<StoreResponse[]> {
    const response = await apiRequest<StoreListResponse>("/stores");
    return response.stores;
  },

  async createStore(input: CreateStoreInput): Promise<StoreResponse> {
    return apiRequest<StoreResponse>("/stores", {
      method: "POST",
      body: input,
    });
  },

  async updateStore(
    storeId: string,
    input: UpdateStoreInput,
  ): Promise<StoreResponse> {
    return apiRequest<StoreResponse>(`/stores/${storeId}`, {
      method: "PATCH",
      body: input,
    });
  },

  async deleteStore(storeId: string): Promise<void> {
    return apiRequest<void>(`/stores/${storeId}`, {
      method: "DELETE",
    });
  },

  async listProducts(storeId: string): Promise<Product[]> {
    const response = await apiRequest<ProductListResponse>(
      `/products?storeId=${storeId}`,
    );

    return response.products;
  },

  async createProduct(input: CreateProductInput): Promise<Product> {
    return apiRequest<Product>("/products", {
      method: "POST",
      body: input,
    });
  },

  async updateProduct(
    productId: string,
    input: UpdateProductInput,
  ): Promise<Product> {
    return apiRequest<Product>(`/products/${productId}`, {
      method: "PATCH",
      body: input,
    });
  },

  async deleteProduct(productId: string): Promise<void> {
    return apiRequest<void>(`/products/${productId}`, {
      method: "DELETE",
    });
  },
};
