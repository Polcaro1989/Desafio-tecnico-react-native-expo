import { createServer } from "miragejs";

import { API_NAMESPACE, MOCK_API_URL } from "../constants/routes.js";
import {
  normalizeMockDatabaseSnapshot,
  readMockDatabaseSnapshot,
  type MockDatabaseSnapshot,
} from "../db/mock-database.js";
import { registerProductRoutes } from "../routes/products.routes.js";
import { registerStoreRoutes } from "../routes/stores.routes.js";
import type { MockRouteServer, MockSchema } from "./mirage.types.js";

export interface MakeServerOptions {
  environment?: "development" | "test";
  initialData?: MockDatabaseSnapshot | null;
  onDataChange?: (
    snapshot: MockDatabaseSnapshot,
  ) => void | Promise<void>;
}

export function makeServer(options: MakeServerOptions = {}) {
  const {
    environment = "development",
    initialData,
    onDataChange,
  } = options;
  const snapshot = normalizeMockDatabaseSnapshot(initialData);

  function notifyDataChange(schema: MockSchema) {
    if (!onDataChange) {
      return;
    }

    void Promise.resolve(onDataChange(readMockDatabaseSnapshot(schema))).catch(
      () => undefined,
    );
  }

  return createServer({
    environment,
    seeds(server) {
      server.db.loadData(snapshot);
    },
    routes() {
      this.urlPrefix = MOCK_API_URL;
      this.namespace = API_NAMESPACE;

      registerStoreRoutes(
        this as unknown as MockRouteServer,
        notifyDataChange,
      );
      registerProductRoutes(
        this as unknown as MockRouteServer,
        notifyDataChange,
      );
    },
  });
}
