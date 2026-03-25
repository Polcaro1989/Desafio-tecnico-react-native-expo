import { useEffect, useDeferredValue, useMemo } from "react";
import { Alert } from "react-native";

import { useRouter } from "expo-router";

import {
  Box,
  Button,
  ButtonText,
  HStack,
  Input,
  InputField,
  Spinner,
  Text,
  VStack,
} from "@gluestack-ui/themed";

import { StoreCard } from "@/features/inventory/components/store-card";
import { useInventoryStore } from "@/features/inventory/inventory.store";
import { EmptyState } from "@/shared/components/empty-state";
import { ScreenShell } from "@/shared/components/screen-shell";

export default function StoresScreen() {
  const router = useRouter();
  const stores = useInventoryStore((state) => state.stores);
  const loadingStores = useInventoryStore((state) => state.loadingStores);
  const error = useInventoryStore((state) => state.error);
  const loadStores = useInventoryStore((state) => state.loadStores);
  const deleteStore = useInventoryStore((state) => state.deleteStore);
  const query = useInventoryStore((state) => state.storeSearch);
  const setQuery = useInventoryStore((state) => state.setStoreSearch);

  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    void loadStores();
  }, [loadStores]);

  const filteredStores = useMemo(() => {
    const normalized = deferredQuery.trim().toLowerCase();

    if (!normalized) {
      return stores;
    }

    return stores.filter((store) => {
      const haystack = `${store.name} ${store.address}`.toLowerCase();
      return haystack.includes(normalized);
    });
  }, [deferredQuery, stores]);

  function confirmDelete(id: string, name: string) {
    Alert.alert(
      "Excluir loja",
      `Deseja remover a loja "${name}"? Os produtos ligados a ela também serão removidos.`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            void deleteStore(id);
          },
        },
      ],
    );
  }

  return (
    <ScreenShell
      eyebrow="painel principal"
      title="Lojas e estoque em um lugar só"
      action={
        <Button
          bg="#4f46e5"
          borderRadius="$full"
          onPress={() => router.push("/stores/new")}
        >
          <ButtonText>Criar loja</ButtonText>
        </Button>
      }
    >
      <VStack gap="$4">
        <Box
          bg="$white"
          borderWidth={1}
          borderColor="#e2e8f0"
          borderRadius="$3xl"
          px="$4"
          py="$4"
          shadowColor="$backgroundDark950"
          shadowOpacity={0.06}
          shadowRadius={18}
        >
          <VStack gap="$3">
            <Text color="#475569" size="sm">
              Busca rápida
            </Text>
            <Input borderRadius="full" bg="#f8fafc" borderColor="#cbd5e1">
              <InputField
                placeholder="Buscar por nome ou endereço"
                value={query}
                onChangeText={setQuery}
              />
            </Input>
          </VStack>
        </Box>

        {error ? (
          <Box bg="#fff1f2" borderRadius="$2xl" px="$4" py="$3">
            <Text color="#be123c">{error}</Text>
          </Box>
        ) : null}

        <HStack justifyContent="space-between" alignItems="center">
          <Text size="lg" bold color="#1e293b">
            Lojas cadastradas
          </Text>
          {loadingStores ? <Spinner color="#4f46e5" /> : null}
        </HStack>

        {!loadingStores && filteredStores.length === 0 ? (
          <EmptyState
            title="Nenhuma loja encontrada"
            description="Crie a primeira loja ou ajuste o filtro para continuar."
          />
        ) : null}

        <VStack gap="$3">
          {filteredStores.map((store) => (
            <StoreCard
              key={store.id}
              store={store}
              onOpen={() =>
                router.push({
                  pathname: "/stores/[id]",
                  params: { id: store.id },
                })
              }
              onEdit={() =>
                router.push({
                  pathname: "/stores/[id]/edit",
                  params: { id: store.id },
                })
              }
              onDelete={() => confirmDelete(store.id, store.name)}
            />
          ))}
        </VStack>
      </VStack>
    </ScreenShell>
  );
}
