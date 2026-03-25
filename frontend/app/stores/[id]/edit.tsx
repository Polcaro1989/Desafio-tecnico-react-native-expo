import { useEffect, useState } from "react";

import { Spinner } from "@gluestack-ui/themed";
import { useLocalSearchParams, useRouter } from "expo-router";

import { StoreForm } from "@/features/inventory/components/store-form";
import { useInventoryStore } from "@/features/inventory/inventory.store";
import { ScreenShell } from "@/shared/components/screen-shell";

export default function EditStoreScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const storeId = params.id;
  const store = useInventoryStore((state) =>
    state.stores.find((item) => item.id === storeId),
  );
  const loadingStores = useInventoryStore((state) => state.loadingStores);
  const loadStores = useInventoryStore((state) => state.loadStores);
  const updateStore = useInventoryStore((state) => state.updateStore);
  const submitting = useInventoryStore((state) => state.submitting);
  const [hasCheckedStore, setHasCheckedStore] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function ensureStoreLoaded() {
      if (!storeId) {
        if (isMounted) {
          setHasCheckedStore(true);
        }

        return;
      }

      if (store) {
        if (isMounted) {
          setHasCheckedStore(true);
        }

        return;
      }

      await loadStores();

      if (isMounted) {
        setHasCheckedStore(true);
      }
    }

    void ensureStoreLoaded();

    return () => {
      isMounted = false;
    };
  }, [loadStores, store, storeId]);

  if (!hasCheckedStore || (!store && loadingStores)) {
    return (
      <ScreenShell
        eyebrow="edição"
        title="Carregando loja"
        subtitle="Buscando os dados da loja para edição."
      >
        <Spinner color="#4f46e5" />
      </ScreenShell>
    );
  }

  if (!store) {
    return (
      <ScreenShell
        eyebrow="edição"
        title="Loja não encontrada"
        subtitle="Não foi possível localizar a loja para editar."
      />
    );
  }

  return (
    <ScreenShell
      showBackButton
      eyebrow="edição"
      title="Editar loja"
    >
      <StoreForm
        initialValues={{ name: store.name, address: store.address }}
        submitLabel="Atualizar loja"
        isSubmitting={submitting}
        onSubmit={async (values) => {
          await updateStore(storeId, values);
          router.replace({
            pathname: "/stores/[id]",
            params: { id: storeId },
          });
        }}
      />
    </ScreenShell>
  );
}
