import {
  createSeedMockDatabaseSnapshot,
  normalizeMockDatabaseSnapshot,
} from "../../src/db/mock-database.js";

describe("mock database", () => {
  it("returns the default seeded data", () => {
    const snapshot = createSeedMockDatabaseSnapshot();

    expect(snapshot.stores).toHaveLength(3);
    expect(snapshot.products).toHaveLength(4);
  });

  it("falls back to the seed when input is invalid", () => {
    const snapshot = normalizeMockDatabaseSnapshot({
      stores: "invalid",
      products: [],
    });

    expect(snapshot.stores).toHaveLength(3);
    expect(snapshot.products).toHaveLength(4);
  });

  it("clones valid data instead of reusing references", () => {
    const source = {
      stores: [
        {
          id: "store-1",
          name: "Loja Teste",
          address: "Rua A",
        },
      ],
      products: [
        {
          id: "product-1",
          storeId: "store-1",
          name: "Mouse",
          category: "Eletronicos",
          price: 99.9,
        },
      ],
    };

    const snapshot = normalizeMockDatabaseSnapshot(source);

    expect(snapshot).toEqual(source);
    expect(snapshot.stores).not.toBe(source.stores);
    expect(snapshot.products).not.toBe(source.products);
  });
});
