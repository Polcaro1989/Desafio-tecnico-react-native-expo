import { mapStore } from "../../src/mappers/store.mapper.js";

describe("store mapper", () => {
  it("returns the product count for the requested store", () => {
    expect(
      mapStore(
        {
          id: "store-1",
          name: "Loja Centro",
          address: "Rua A, 123",
        },
        [
          {
            id: "product-1",
            storeId: "store-1",
            name: "Mouse",
            category: "Eletronicos",
            price: 99.9,
          },
          {
            id: "product-2",
            storeId: "store-2",
            name: "Teclado",
            category: "Eletronicos",
            price: 120,
          },
          {
            id: "product-3",
            storeId: "store-1",
            name: "Monitor",
            category: "Eletronicos",
            price: 899,
          },
        ],
      ),
    ).toEqual({
      id: "store-1",
      name: "Loja Centro",
      address: "Rua A, 123",
      productCount: 2,
    });
  });
});
