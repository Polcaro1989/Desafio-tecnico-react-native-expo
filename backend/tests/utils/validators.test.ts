import {
  parseJsonBody,
  validateCreateProductInput,
  validateCreateStoreInput,
  validateUpdateProductInput,
  validateUpdateStoreInput,
} from "../../src/utils/validators.js";

describe("validators", () => {
  it("returns null for invalid JSON", () => {
    expect(parseJsonBody("{ invalid json")).toBeNull();
  });

  it("rejects empty store fields on create", () => {
    expect(
      validateCreateStoreInput({
        name: "  ",
        address: "",
      }),
    ).toBe("O campo 'name' da loja e obrigatorio.");
  });

  it("requires at least one field on store update", () => {
    expect(validateUpdateStoreInput({})).toBe(
      "Informe ao menos um campo para atualizar a loja.",
    );
  });

  it("rejects invalid product prices on create", () => {
    expect(
      validateCreateProductInput({
        storeId: "store-1",
        name: "Mouse",
        category: "Eletronicos",
        price: -1,
      }),
    ).toBe(
      "O campo 'price' do produto precisa ser um numero maior ou igual a zero.",
    );
  });

  it("accepts valid partial product updates", () => {
    expect(
      validateUpdateProductInput({
        price: 49.9,
      }),
    ).toBeNull();
  });
});
