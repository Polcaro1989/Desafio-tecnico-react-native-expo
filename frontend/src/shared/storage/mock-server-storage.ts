import AsyncStorage from "@react-native-async-storage/async-storage";

import type { MockDatabaseSnapshot } from "@/shared/backend-mock";

const MOCK_DATABASE_STORAGE_KEY = "@storehub/mock-database";

export async function loadPersistedMockDatabase(): Promise<MockDatabaseSnapshot | null> {
  try {
    const rawValue = await AsyncStorage.getItem(MOCK_DATABASE_STORAGE_KEY);

    if (!rawValue) {
      return null;
    }

    return JSON.parse(rawValue) as MockDatabaseSnapshot;
  } catch {
    return null;
  }
}

export async function persistMockDatabase(
  snapshot: MockDatabaseSnapshot,
): Promise<void> {
  await AsyncStorage.setItem(
    MOCK_DATABASE_STORAGE_KEY,
    JSON.stringify(snapshot),
  );
}
