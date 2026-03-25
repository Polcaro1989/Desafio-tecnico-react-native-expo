import { Response } from "miragejs";

import type {
  CreateProductInput,
  Product,
  UpdateProductInput,
} from "../contracts/product.types.js";
import { PRODUCT_BY_ID_PATH, PRODUCTS_PATH } from "../constants/routes.js";
import {
  applyProductUpdate,
  createProduct,
} from "../factories/product.factory.js";
import { mapProduct } from "../mappers/product.mapper.js";
import type { Store } from "../contracts/store.types.js";
import type {
  MockDbCollection,
  MockRequest,
  MockRouteServer,
  MockSchema,
} from "../server/mirage.types.js";
import { asCollection, collectionToArray } from "../server/mirage.types.js";
import {
  parseJsonBody,
  validateCreateProductInput,
  validateUpdateProductInput,
} from "../utils/validators.js";

function badRequest(message: string): Response {
  return new Response(400, {}, { error: message });
}

function notFound(message: string): Response {
  return new Response(404, {}, { error: message });
}

function getProductCollection(schema: MockSchema): MockDbCollection<Product> {
  return asCollection<Product>(schema.db.products);
}

function getProducts(schema: MockSchema): Product[] {
  return collectionToArray<Product>(schema.db.products);
}

function getStoreCollection(schema: MockSchema): MockDbCollection<Store> {
  return asCollection<Store>(schema.db.stores);
}

function getStores(schema: MockSchema): Store[] {
  return collectionToArray<Store>(schema.db.stores);
}

function getProductId(request: MockRequest): string | null {
  return request.params.id?.trim() || null;
}

export function registerProductRoutes(
  server: MockRouteServer,
  onDataChange?: (schema: MockSchema) => void,
): void {
  server.get(PRODUCTS_PATH, (schema, request) => {
    const products = getProducts(schema);
    const storeId = request.queryParams.storeId?.trim();

    const filteredProducts = storeId
      ? products.filter((product) => product.storeId === storeId)
      : products;

    return {
      products: filteredProducts.map(mapProduct),
    };
  });

  server.post(PRODUCTS_PATH, (schema, request) => {
    const body = parseJsonBody<CreateProductInput>(request.requestBody);

    if (!body) {
      return badRequest("Corpo JSON invalido para criar produto.");
    }

    const validationError = validateCreateProductInput(body);

    if (validationError) {
      return badRequest(validationError);
    }

    const storeExists = getStores(schema).some(
      (store) => store.id === body.storeId,
    );

    if (!storeExists) {
      return notFound("A loja informada para o produto nao existe.");
    }

    const product = createProduct(body as CreateProductInput);

    getProductCollection(schema).insert(product);
    onDataChange?.(schema);

    return mapProduct(product);
  });

  server.patch(PRODUCT_BY_ID_PATH, (schema, request) => {
    const productId = getProductId(request);

    if (!productId) {
      return badRequest("O id do produto precisa ser informado.");
    }

    const currentProduct = getProductCollection(schema).find(productId);

    if (!currentProduct) {
      return notFound("Produto nao encontrado.");
    }

    const body = parseJsonBody<UpdateProductInput>(request.requestBody);

    if (!body) {
      return badRequest("Corpo JSON invalido para atualizar produto.");
    }

    const validationError = validateUpdateProductInput(body);

    if (validationError) {
      return badRequest(validationError);
    }

    const nextProduct = applyProductUpdate(currentProduct, body);

    getProductCollection(schema).update(productId, {
      name: nextProduct.name,
      category: nextProduct.category,
      price: nextProduct.price,
    });
    onDataChange?.(schema);

    return mapProduct(nextProduct);
  });

  server.del(PRODUCT_BY_ID_PATH, (schema, request) => {
    const productId = getProductId(request);

    if (!productId) {
      return badRequest("O id do produto precisa ser informado.");
    }

    const currentProduct = getProductCollection(schema).find(productId);

    if (!currentProduct) {
      return notFound("Produto nao encontrado.");
    }

    getProductCollection(schema).remove(productId);
    onDataChange?.(schema);

    return new Response(204);
  });
}
