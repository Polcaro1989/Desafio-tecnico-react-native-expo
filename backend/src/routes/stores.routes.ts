import { Response } from "miragejs";

import type { Product } from "../contracts/product.types.js";
import type {
  CreateStoreInput,
  Store,
  UpdateStoreInput,
} from "../contracts/store.types.js";
import { STORE_BY_ID_PATH, STORES_PATH } from "../constants/routes.js";
import { applyStoreUpdate, createStore } from "../factories/store.factory.js";
import { mapStore } from "../mappers/store.mapper.js";
import type {
  MockDbCollection,
  MockRequest,
  MockRouteServer,
  MockSchema,
} from "../server/mirage.types.js";
import { asCollection, collectionToArray } from "../server/mirage.types.js";
import {
  parseJsonBody,
  validateCreateStoreInput,
  validateUpdateStoreInput,
} from "../utils/validators.js";

function badRequest(message: string): Response {
  return new Response(400, {}, { error: message });
}

function notFound(message: string): Response {
  return new Response(404, {}, { error: message });
}

function getStoreCollection(schema: MockSchema): MockDbCollection<Store> {
  return asCollection<Store>(schema.db.stores);
}

function getStores(schema: MockSchema): Store[] {
  return collectionToArray<Store>(schema.db.stores);
}

function getProductCollection(schema: MockSchema): MockDbCollection<Product> {
  return asCollection<Product>(schema.db.products);
}

function getProducts(schema: MockSchema): Product[] {
  return collectionToArray<Product>(schema.db.products);
}

function getStoreId(request: MockRequest): string | null {
  return request.params.id?.trim() || null;
}

export function registerStoreRoutes(
  server: MockRouteServer,
  onDataChange?: (schema: MockSchema) => void,
): void {
  server.get(STORES_PATH, (schema) => {
    const stores = getStores(schema);
    const products = getProducts(schema);

    return {
      stores: stores.map((store) => mapStore(store, products)),
    };
  });

  server.post(STORES_PATH, (schema, request) => {
    const body = parseJsonBody<CreateStoreInput>(request.requestBody);

    if (!body) {
      return badRequest("Corpo JSON invalido para criar loja.");
    }

    const validationError = validateCreateStoreInput(body);

    if (validationError) {
      return badRequest(validationError);
    }

    const store = createStore(body as CreateStoreInput);

    getStoreCollection(schema).insert(store);
    onDataChange?.(schema);

    return mapStore(store, getProducts(schema));
  });

  server.patch(STORE_BY_ID_PATH, (schema, request) => {
    const storeId = getStoreId(request);

    if (!storeId) {
      return badRequest("O id da loja precisa ser informado.");
    }

    const currentStore = getStoreCollection(schema).find(storeId);

    if (!currentStore) {
      return notFound("Loja nao encontrada.");
    }

    const body = parseJsonBody<UpdateStoreInput>(request.requestBody);

    if (!body) {
      return badRequest("Corpo JSON invalido para atualizar loja.");
    }

    const validationError = validateUpdateStoreInput(body);

    if (validationError) {
      return badRequest(validationError);
    }

    const nextStore = applyStoreUpdate(currentStore, body);

    getStoreCollection(schema).update(storeId, {
      name: nextStore.name,
      address: nextStore.address,
    });
    onDataChange?.(schema);

    return mapStore(nextStore, getProducts(schema));
  });

  server.del(STORE_BY_ID_PATH, (schema, request) => {
    const storeId = getStoreId(request);

    if (!storeId) {
      return badRequest("O id da loja precisa ser informado.");
    }

    const currentStore = getStoreCollection(schema).find(storeId);

    if (!currentStore) {
      return notFound("Loja nao encontrada.");
    }

    const relatedProducts = getProductCollection(schema).where({ storeId });

    relatedProducts.forEach((product) => {
      getProductCollection(schema).remove(product.id);
    });

    getStoreCollection(schema).remove(storeId);
    onDataChange?.(schema);

    return new Response(204);
  });
}
