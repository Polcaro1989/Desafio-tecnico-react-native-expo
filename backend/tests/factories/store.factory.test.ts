import {
  applyStoreUpdate,
  createStore,
} from "../../src/factories/store.factory.js";

describe("store factory", () => {
  it("trims fields and prefixes the generated id", () => {
    const store = createStore({
      name: "  Loja Centro  ",
      address: "  Rua A, 123  ",
    });

    expect(store.id).toMatch(/^store-/);
    expect(store.name).toBe("Loja Centro");
    expect(store.address).toBe("Rua A, 123");
  });

  it("keeps previous values when a field is omitted in update", () => {
    expect(
      applyStoreUpdate(
        {
          id: "store-1",
          name: "Loja Norte",
          address: "Avenida Brasil, 100",
        },
        {
          name: "  Loja Norte Atualizada  ",
        },
      ),
    ).toEqual({
      id: "store-1",
      name: "Loja Norte Atualizada",
      address: "Avenida Brasil, 100",
    });
  });
});
