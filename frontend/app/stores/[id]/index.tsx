import { useEffect, useDeferredValue, useMemo, useState } from "react";

import { useLocalSearchParams, useRouter } from "expo-router";

import {
  Badge,
  BadgeText,
  Box,
  Button,
  HStack,
  Input,
  InputField,
  Spinner,
  Text,
  VStack,
} from "@gluestack-ui/themed";

import { Feather } from "@expo/vector-icons";

import { ProductCard } from "@/features/inventory/components/product-card";
import { useInventoryStore } from "@/features/inventory/inventory.store";
import { EmptyState } from "@/shared/components/empty-state";
import { ScreenShell } from "@/shared/components/screen-shell";
import { confirmDestructive } from "@/shared/utils/confirm-destructive";

export default function StoreDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const storeId = params.id;

  const stores = useInventoryStore((state) => state.stores);
  const productsByStoreId = useInventoryStore((state) => state.productsByStoreId);
  const loadingStores = useInventoryStore((state) => state.loadingStores);
  const loadingProducts = useInventoryStore((state) => state.loadingProducts);
  const loadStores = useInventoryStore((state) => state.loadStores);
  const loadProducts = useInventoryStore((state) => state.loadProducts);
  const deleteProduct = useInventoryStore((state) => state.deleteProduct);
  const query = useInventoryStore(
    (state) => state.productSearchByStoreId[storeId] ?? "",
  );
  const setProductSearch = useInventoryStore((state) => state.setProductSearch);

  const deferredQuery = useDeferredValue(query);
  const store = stores.find((item) => item.id === storeId);
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

  useEffect(() => {
    if (storeId) {
      void loadProducts(storeId);
    }
  }, [loadProducts, storeId]);

  const filteredProducts = useMemo(() => {
    const normalized = deferredQuery.trim().toLowerCase();
    const products = productsByStoreId[storeId] ?? [];

    if (!normalized) {
      return products;
    }

    return products.filter((product) => {
      const haystack = `${product.name} ${product.category}`.toLowerCase();
      return haystack.includes(normalized);
    });
  }, [deferredQuery, productsByStoreId, storeId]);

  async function confirmDeleteProduct(productId: string, name: string) {
    const confirmed = await confirmDestructive({
      title: "Excluir produto",
      message: `Deseja remover o produto "${name}"?`,
    });

    if (!confirmed) {
      return;
    }

    await deleteProduct(productId, storeId);
  }

  if (!hasCheckedStore || (!store && loadingStores)) {
    return (
      <ScreenShell
        eyebrow="detalhes"
        title="Carregando loja"
        subtitle="Buscando os dados mais recentes desta loja."
      >
        <Spinner color="#4f46e5" />
      </ScreenShell>
    );
  }

  if (!store) {
    return (
      <ScreenShell
        eyebrow="detalhes"
        title="Loja nao encontrada"
        subtitle="Pode ter sido removida ou o id da rota esta incorreto."
      >
        <EmptyState
          title="Nada para mostrar aqui"
          description="Volte para a listagem e escolha uma loja valida."
        />
      </ScreenShell>
    );
  }

  return (
    <ScreenShell
      showBackButton
      eyebrow="detalhes da loja"
      title={store.name}
      subtitle={store.address}
      action={
        <HStack gap="$3">
          <Button
            variant="outline"
            size="sm"
            borderColor="#4f46e5"
            gap="$1.5"
            onPress={() =>
              router.push({
                pathname: "/stores/[id]/edit",
                params: { id: store.id },
              })
            }
          >
            <Feather name="edit-2" size={14} color="#4f46e5" />
            <Text color="#4f46e5" size="sm" bold>
              Editar
            </Text>
          </Button>
          <Button
            bg="#059669"
            size="sm"
            gap="$1.5"
            onPress={() =>
              router.push({
                pathname: "/stores/[id]/products/new",
                params: { id: store.id },
              })
            }
          >
            <Feather name="plus" size={16} color="white" />
            <Text color="white" size="sm" bold>
              Novo Produto
            </Text>
          </Button>
        </HStack>
      }
    >
      <VStack gap="$4">
        <Box
          bg="#4f46e5"
          borderRadius="$3xl"
          px="$6"
          py="$6"
          style={{
            shadowColor: "#4f46e5",
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.15,
            shadowRadius: 14,
            elevation: 4,
          }}
        >
          <VStack gap="$3">
            <Text color="#eef2ff" size="sm">
              Resumo da loja
            </Text>
            <HStack justifyContent="space-between" alignItems="center">
              <Text color="$white" size="2xl" bold>
                {store.productCount} produtos
              </Text>
              <Badge bg="$white" borderRadius="$full">
                <BadgeText color="#4f46e5">estoque ativo</BadgeText>
              </Badge>
            </HStack>
          </VStack>
        </Box>

        <Box
          bg="$white"
          borderRadius="$3xl"
          px="$5"
          py="$5"
          style={{
            shadowColor: "#1e293b",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.08,
            shadowRadius: 12,
            elevation: 2,
          }}
        >
          <VStack gap="$3">
            <Text color="#475569" size="sm">
              Buscar produtos
            </Text>
            <Input borderRadius="full" bg="#f8fafc" borderColor="#cbd5e1">
              <InputField
                placeholder="Ex.: camiseta, mouse, eletronicos"
                value={query}
                onChangeText={(value) => setProductSearch(storeId, value)}
              />
            </Input>
          </VStack>
        </Box>

        <HStack justifyContent="space-between" alignItems="center">
          <Text size="lg" bold color="#1e293b">
            Produtos da loja
          </Text>
          {loadingProducts[storeId] ? <Spinner color="#4f46e5" /> : null}
        </HStack>

        {!loadingProducts[storeId] && filteredProducts.length === 0 ? (
          <EmptyState
            title="Nenhum produto encontrado"
            description="Cadastre um produto para essa loja ou ajuste a busca."
          />
        ) : null}

        <VStack gap="$3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={() =>
                router.push({
                  pathname: "/stores/[id]/products/[productId]/edit",
                  params: { id: storeId, productId: product.id },
                })
              }
              onDelete={() => {
                void confirmDeleteProduct(product.id, product.name);
              }}
            />
          ))}
        </VStack>
      </VStack>
    </ScreenShell>
  );
}
