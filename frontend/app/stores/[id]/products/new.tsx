import { useLocalSearchParams, useRouter } from "expo-router";

import { ProductForm } from "@/features/inventory/components/product-form";
import { useInventoryStore } from "@/features/inventory/inventory.store";
import { ScreenShell } from "@/shared/components/screen-shell";

export default function NewProductScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const storeId = params.id;
  const createProduct = useInventoryStore((state) => state.createProduct);
  const submitting = useInventoryStore((state) => state.submitting);

  return (
    <ScreenShell
      showBackButton
      eyebrow="cadastro"
      title="Novo produto"
    >
      <ProductForm
        submitLabel="Salvar produto"
        isSubmitting={submitting}
        onSubmit={async (values) => {
          await createProduct({
            ...values,
            storeId,
            price: Number(values.price),
          });
          router.replace({
            pathname: "/stores/[id]",
            params: { id: storeId },
          });
        }}
      />
    </ScreenShell>
  );
}
