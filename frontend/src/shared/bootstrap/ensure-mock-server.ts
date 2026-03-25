import {
  makeServer,
  type MockDatabaseSnapshot,
} from "@/shared/backend-mock";
import {
  loadPersistedMockDatabase,
  persistMockDatabase,
} from "@/shared/storage/mock-server-storage";

declare global {
  var __storeHubMockServerStarted__: boolean | undefined;
  var __storeHubMockServerPromise__: Promise<void> | undefined;
  var __storeHubMockServerSnapshot__: MockDatabaseSnapshot | null | undefined;
}

export async function ensureMockServer() {
  if (globalThis.__storeHubMockServerStarted__) {
    return;
  }

  if (!globalThis.__storeHubMockServerPromise__) {
    globalThis.__storeHubMockServerPromise__ = (async () => {
      const initialData =
        globalThis.__storeHubMockServerSnapshot__ ??
        (await loadPersistedMockDatabase());

      makeServer({
        initialData,
        onDataChange: async (snapshot) => {
          globalThis.__storeHubMockServerSnapshot__ = snapshot;
          await persistMockDatabase(snapshot);
        },
      });

      globalThis.__storeHubMockServerSnapshot__ = initialData;
      globalThis.__storeHubMockServerStarted__ = true;
    })().catch((error) => {
      globalThis.__storeHubMockServerPromise__ = undefined;
      throw error;
    });
  }

  await globalThis.__storeHubMockServerPromise__;
}
