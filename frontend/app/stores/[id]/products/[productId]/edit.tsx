import { useEffect } from "react";

import { useLocalSearchParams, useRouter } from "expo-router";

import { ProductForm } from "@/features/inventory/components/product-form";
import { useInventoryStore } from "@/features/inventory/inventory.store";
import { ScreenShell } from "@/shared/components/screen-shell";

export default function EditProductScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string; productId: string }>();
  const storeId = params.id;
  const productId = params.productId;
  const products = useInventoryStore((state) => state.productsByStoreId[storeId] ?? []);
  const loadProducts = useInventoryStore((state) => state.loadProducts);
  const updateProduct = useInventoryStore((state) => state.updateProduct);
  const submitting = useInventoryStore((state) => state.submitting);
  const product = products.find((item) => item.id === productId);

  useEffect(() => {
    if (!product && storeId) {
      void loadProducts(storeId);
    }
  }, [loadProducts, product, storeId]);

  if (!product) {
    return (
      <ScreenShell
        eyebrow="produto"
        title="Produto não encontrado"
        subtitle="Não foi possível carregar os dados deste produto."
      />
    );
  }

  return (
    <ScreenShell
      showBackButton
      eyebrow="produto"
      title="Editar produto"
    >
      <ProductForm
        initialValues={{
          name: product.name,
          category: product.category,
          price: product.price.toString(),
        }}
        submitLabel="Atualizar produto"
        isSubmitting={submitting}
        onSubmit={async (values) => {
          await updateProduct(productId, storeId, {
            name: values.name,
            category: values.category,
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
