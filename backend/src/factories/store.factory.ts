import type {
  CreateStoreInput,
  Store,
  UpdateStoreInput,
} from "../contracts/store.types.js";
import { createId } from "../utils/create-id.js";

export function createStore(data: CreateStoreInput): Store {
  return {
    id: createId("store"),
    name: data.name.trim(),
    address: data.address.trim(),
  };
}

export function applyStoreUpdate(
  store: Store,
  updates: UpdateStoreInput,
): Store {
  return {
    ...store,
    name: updates.name?.trim() ?? store.name,
    address: updates.address?.trim() ?? store.address,
  };
}
