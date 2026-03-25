import { create } from "zustand";
import type {
  CreateProductInput,
  CreateStoreInput,
  Product,
  StoreResponse,
  UpdateProductInput,
  UpdateStoreInput,
} from "@/shared/backend-mock";

import { ApiError } from "@/shared/api/api-client";
import { inventoryApi } from "./inventory.api";

interface InventoryState {
  stores: StoreResponse[];
  productsByStoreId: Record<string, Product[]>;
  storeSearch: string;
  productSearchByStoreId: Record<string, string>;
  loadingStores: boolean;
  loadingProducts: Record<string, boolean>;
  submitting: boolean;
  error: string | null;
  loadStores: () => Promise<void>;
  loadProducts: (storeId: string) => Promise<void>;
  createStore: (input: CreateStoreInput) => Promise<StoreResponse>;
  updateStore: (
    storeId: string,
    input: UpdateStoreInput,
  ) => Promise<StoreResponse>;
  deleteStore: (storeId: string) => Promise<void>;
  createProduct: (input: CreateProductInput) => Promise<Product>;
  updateProduct: (
    productId: string,
    storeId: string,
    input: UpdateProductInput,
  ) => Promise<Product>;
  deleteProduct: (productId: string, storeId: string) => Promise<void>;
  setStoreSearch: (value: string) => void;
  setProductSearch: (storeId: string, value: string) => void;
  clearError: () => void;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Ocorreu um erro inesperado.";
}

export const useInventoryStore = create<InventoryState>((set, get) => ({
  stores: [],
  productsByStoreId: {},
  storeSearch: "",
  productSearchByStoreId: {},
  loadingStores: false,
  loadingProducts: {},
  submitting: false,
  error: null,

  async loadStores() {
    set({ loadingStores: true, error: null });

    try {
      const stores = await inventoryApi.listStores();
      set({ stores, loadingStores: false });
    } catch (error) {
      set({ loadingStores: false, error: getErrorMessage(error) });
    }
  },

  async loadProducts(storeId) {
    set((state) => ({
      loadingProducts: { ...state.loadingProducts, [storeId]: true },
      error: null,
    }));

    try {
      const products = await inventoryApi.listProducts(storeId);
      set((state) => ({
        productsByStoreId: { ...state.productsByStoreId, [storeId]: products },
        loadingProducts: { ...state.loadingProducts, [storeId]: false },
      }));
    } catch (error) {
      set((state) => ({
        loadingProducts: { ...state.loadingProducts, [storeId]: false },
        error: getErrorMessage(error),
      }));
    }
  },

  async createStore(input) {
    set({ submitting: true, error: null });

    try {
      const store = await inventoryApi.createStore(input);
      set((state) => ({
        stores: [store, ...state.stores],
        submitting: false,
      }));

      return store;
    } catch (error) {
      const message = getErrorMessage(error);
      set({ submitting: false, error: message });
      throw new Error(message);
    }
  },

  async updateStore(storeId, input) {
    set({ submitting: true, error: null });

    try {
      const store = await inventoryApi.updateStore(storeId, input);
      set((state) => ({
        stores: state.stores.map((item) => (item.id === storeId ? store : item)),
        submitting: false,
      }));

      return store;
    } catch (error) {
      const message = getErrorMessage(error);
      set({ submitting: false, error: message });
      throw new Error(message);
    }
  },

  async deleteStore(storeId) {
    set({ error: null });

    try {
      await inventoryApi.deleteStore(storeId);
      set((state) => {
        const nextProducts = { ...state.productsByStoreId };
        delete nextProducts[storeId];

        return {
          stores: state.stores.filter((item) => item.id !== storeId),
          productsByStoreId: nextProducts,
        };
      });
    } catch (error) {
      set({ error: getErrorMessage(error) });
    }
  },

  async createProduct(input) {
    set({ submitting: true, error: null });

    try {
      const product = await inventoryApi.createProduct(input);
      set((state) => ({
        productsByStoreId: {
          ...state.productsByStoreId,
          [input.storeId]: [
            product,
            ...(state.productsByStoreId[input.storeId] ?? []),
          ],
        },
        submitting: false,
      }));

      await get().loadStores();

      return product;
    } catch (error) {
      const message = getErrorMessage(error);
      set({ submitting: false, error: message });
      throw new Error(message);
    }
  },

  async updateProduct(productId, storeId, input) {
    set({ submitting: true, error: null });

    try {
      const product = await inventoryApi.updateProduct(productId, input);
      set((state) => ({
        productsByStoreId: {
          ...state.productsByStoreId,
          [storeId]: (state.productsByStoreId[storeId] ?? []).map((item) =>
            item.id === productId ? product : item,
          ),
        },
        submitting: false,
      }));

      await get().loadStores();

      return product;
    } catch (error) {
      const message = getErrorMessage(error);
      set({ submitting: false, error: message });
      throw new Error(message);
    }
  },

  async deleteProduct(productId, storeId) {
    set({ error: null });

    try {
      await inventoryApi.deleteProduct(productId);
      set((state) => ({
        productsByStoreId: {
          ...state.productsByStoreId,
          [storeId]: (state.productsByStoreId[storeId] ?? []).filter(
            (item) => item.id !== productId,
          ),
        },
      }));

      await get().loadStores();
    } catch (error) {
      set({ error: getErrorMessage(error) });
    }
  },

  setStoreSearch(value) {
    set({ storeSearch: value });
  },

  setProductSearch(storeId, value) {
    set((state) => ({
      productSearchByStoreId: {
        ...state.productSearchByStoreId,
        [storeId]: value,
      },
    }));
  },

  clearError() {
    set({ error: null });
  },
}));
