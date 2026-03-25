import { act } from "@testing-library/react-native";

import { inventoryApi } from "@/features/inventory/inventory.api";
import { useInventoryStore } from "@/features/inventory/inventory.store";

jest.mock("@/features/inventory/inventory.api", () => ({
  inventoryApi: {
    listStores: jest.fn(),
    createStore: jest.fn(),
    updateStore: jest.fn(),
    deleteStore: jest.fn(),
    listProducts: jest.fn(),
    createProduct: jest.fn(),
    updateProduct: jest.fn(),
    deleteProduct: jest.fn(),
  },
}));

const inventoryApiMock = jest.mocked(inventoryApi);
const initialState = useInventoryStore.getState();

describe("inventory store", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useInventoryStore.setState(initialState, true);
  });

  it("loads stores into global state", async () => {
    inventoryApiMock.listStores.mockResolvedValue([
      {
        id: "store-1",
        name: "Loja Centro",
        address: "Rua A, 123",
        productCount: 2,
      },
    ]);

    await act(async () => {
      await useInventoryStore.getState().loadStores();
    });

    expect(useInventoryStore.getState().stores).toEqual([
      {
        id: "store-1",
        name: "Loja Centro",
        address: "Rua A, 123",
        productCount: 2,
      },
    ]);
    expect(useInventoryStore.getState().loadingStores).toBe(false);
    expect(useInventoryStore.getState().error).toBeNull();
  });

  it("creates a product, stores it under the related store and refreshes counts", async () => {
    inventoryApiMock.createProduct.mockResolvedValue({
      id: "product-1",
      storeId: "store-1",
      name: "Mouse",
      category: "Eletrônicos",
      price: 99.9,
    });
    inventoryApiMock.listStores.mockResolvedValue([
      {
        id: "store-1",
        name: "Loja Centro",
        address: "Rua A, 123",
        productCount: 1,
      },
    ]);

    await act(async () => {
      await useInventoryStore.getState().createProduct({
        storeId: "store-1",
        name: "Mouse",
        category: "Eletrônicos",
        price: 99.9,
      });
    });

    expect(inventoryApiMock.createProduct).toHaveBeenCalledWith({
      storeId: "store-1",
      name: "Mouse",
      category: "Eletrônicos",
      price: 99.9,
    });
    expect(inventoryApiMock.listStores).toHaveBeenCalledTimes(1);
    expect(useInventoryStore.getState().productsByStoreId["store-1"]).toEqual([
      {
        id: "product-1",
        storeId: "store-1",
        name: "Mouse",
        category: "Eletrônicos",
        price: 99.9,
      },
    ]);
    expect(useInventoryStore.getState().stores).toEqual([
      {
        id: "store-1",
        name: "Loja Centro",
        address: "Rua A, 123",
        productCount: 1,
      },
    ]);
  });
});
