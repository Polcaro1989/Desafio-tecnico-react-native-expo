import { useRouter } from "expo-router";

import { StoreForm } from "@/features/inventory/components/store-form";
import { useInventoryStore } from "@/features/inventory/inventory.store";
import { ScreenShell } from "@/shared/components/screen-shell";

export default function NewStoreScreen() {
  const router = useRouter();
  const createStore = useInventoryStore((state) => state.createStore);
  const submitting = useInventoryStore((state) => state.submitting);

  return (
    <ScreenShell
      showBackButton
      eyebrow="cadastro"
      title="Nova loja"
    >
      <StoreForm
        isSubmitting={submitting}
        submitLabel="Salvar loja"
        onSubmit={async (values) => {
          const store = await createStore(values);

          router.replace({
            pathname: "/stores/[id]",
            params: { id: store.id },
          });
        }}
      />
    </ScreenShell>
  );
}
