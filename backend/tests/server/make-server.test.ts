import { makeServer } from "../../src/server/makeServer.js";

function readDb(server: unknown) {
  return server as {
    db: {
      dump: () => {
        stores?: unknown[];
        products?: unknown[];
      };
    };
    shutdown: () => void;
  };
}

describe("makeServer", () => {
  it("loads the default seed when no initial data is provided", () => {
    const server = readDb(makeServer({ environment: "development" }));

    try {
      const db = server.db.dump();

      expect(db.stores).toHaveLength(3);
      expect(db.products).toHaveLength(4);
    } finally {
      server.shutdown();
    }
  });

  it("loads a provided initial snapshot", () => {
    const server = readDb(
      makeServer({
        environment: "development",
        initialData: {
          stores: [
            {
              id: "store-custom",
              name: "Loja Custom",
              address: "Rua Custom, 10",
            },
          ],
          products: [
            {
              id: "product-custom",
              storeId: "store-custom",
              name: "Produto Custom",
              category: "Teste",
              price: 10,
            },
          ],
        },
      }),
    );

    try {
      const db = server.db.dump();

      expect(db.stores).toEqual([
        {
          id: "store-custom",
          name: "Loja Custom",
          address: "Rua Custom, 10",
        },
      ]);
      expect(db.products).toEqual([
        {
          id: "product-custom",
          storeId: "store-custom",
          name: "Produto Custom",
          category: "Teste",
          price: 10,
        },
      ]);
    } finally {
      server.shutdown();
    }
  });
});
