import {
  applyProductUpdate,
  createProduct,
} from "../../src/factories/product.factory.js";

describe("product factory", () => {
  it("trims text fields and rounds the price", () => {
    const product = createProduct({
      storeId: "store-1",
      name: "  Mouse Gamer  ",
      category: "  Eletronicos  ",
      price: 99.999,
    });

    expect(product.id).toMatch(/^product-/);
    expect(product.storeId).toBe("store-1");
    expect(product.name).toBe("Mouse Gamer");
    expect(product.category).toBe("Eletronicos");
    expect(product.price).toBe(100);
  });

  it("preserves existing values when update is partial", () => {
    expect(
      applyProductUpdate(
        {
          id: "product-1",
          storeId: "store-1",
          name: "Mouse Gamer",
          category: "Eletronicos",
          price: 99.9,
        },
        {
          price: 110.555,
        },
      ),
    ).toEqual({
      id: "product-1",
      storeId: "store-1",
      name: "Mouse Gamer",
      category: "Eletronicos",
      price: 110.56,
    });
  });
});
