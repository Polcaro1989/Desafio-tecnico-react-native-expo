import type {
  CreateProductInput,
  UpdateProductInput,
} from "../contracts/product.types.js";
import type {
  CreateStoreInput,
  UpdateStoreInput,
} from "../contracts/store.types.js";

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidPrice(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

export function parseJsonBody<T>(requestBody: string): Partial<T> | null {
  if (!requestBody) {
    return {};
  }

  try {
    return JSON.parse(requestBody) as Partial<T>;
  } catch {
    return null;
  }
}

export function validateCreateStoreInput(
  input: Partial<CreateStoreInput>,
): string | null {
  if (!isNonEmptyString(input.name)) {
    return "O campo 'name' da loja e obrigatorio.";
  }

  if (!isNonEmptyString(input.address)) {
    return "O campo 'address' da loja e obrigatorio.";
  }

  return null;
}

export function validateUpdateStoreInput(
  input: Partial<UpdateStoreInput>,
): string | null {
  if (input.name === undefined && input.address === undefined) {
    return "Informe ao menos um campo para atualizar a loja.";
  }

  if (input.name !== undefined && !isNonEmptyString(input.name)) {
    return "O campo 'name' da loja nao pode ser vazio.";
  }

  if (input.address !== undefined && !isNonEmptyString(input.address)) {
    return "O campo 'address' da loja nao pode ser vazio.";
  }

  return null;
}

export function validateCreateProductInput(
  input: Partial<CreateProductInput>,
): string | null {
  if (!isNonEmptyString(input.storeId)) {
    return "O campo 'storeId' do produto e obrigatorio.";
  }

  if (!isNonEmptyString(input.name)) {
    return "O campo 'name' do produto e obrigatorio.";
  }

  if (!isNonEmptyString(input.category)) {
    return "O campo 'category' do produto e obrigatorio.";
  }

  if (!isValidPrice(input.price)) {
    return "O campo 'price' do produto precisa ser um numero maior ou igual a zero.";
  }

  return null;
}

export function validateUpdateProductInput(
  input: Partial<UpdateProductInput>,
): string | null {
  if (
    input.name === undefined &&
    input.category === undefined &&
    input.price === undefined
  ) {
    return "Informe ao menos um campo para atualizar o produto.";
  }

  if (input.name !== undefined && !isNonEmptyString(input.name)) {
    return "O campo 'name' do produto nao pode ser vazio.";
  }

  if (input.category !== undefined && !isNonEmptyString(input.category)) {
    return "O campo 'category' do produto nao pode ser vazio.";
  }

  if (input.price !== undefined && !isValidPrice(input.price)) {
    return "O campo 'price' do produto precisa ser um numero maior ou igual a zero.";
  }

  return null;
}
