import type { Product } from "@/shared/backend-mock";

import {
  Badge,
  BadgeText,
  Box,
  Button,
  HStack,
  Text,
  VStack,
} from "@gluestack-ui/themed";

import { Feather } from "@expo/vector-icons";

import { formatCurrency } from "@/shared/utils/format-currency";

interface ProductCardProps {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
}

export function ProductCard({ onDelete, onEdit, product }: ProductCardProps) {
  return (
    <Box
      bg="$white"
      borderRadius="$3xl"
      borderWidth={1}
      borderColor="#e2e8f0"
      px="$5"
      py="$6"
      style={{
        shadowColor: "#1e293b",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 2,
      }}
    >
      <VStack gap="$4">
        <HStack justifyContent="space-between" alignItems="flex-start">
          <VStack gap="$1" flex={1}>
            <Text bold size="lg" color="#1e293b">
              {product.name}
            </Text>
            <Text color="#64748b">{formatCurrency(product.price)}</Text>
          </VStack>
          <Badge bg="#d1fae5" borderRadius="$full">
            <BadgeText color="#047857">{product.category}</BadgeText>
          </Badge>
        </HStack>

        <HStack gap="$2" pt="$2" justifyContent="flex-end" alignItems="center" flexWrap="wrap">
          <Button
            variant="outline"
            size="sm"
            borderColor="#4f46e5"
            onPress={onEdit}
            gap="$1.5"
          >
            <Feather name="edit-2" size={14} color="#4f46e5" />
            <Text color="#4f46e5" size="sm" bold>Editar</Text>
          </Button>
          <Button
            bg="#e11d48"
            size="sm"
            onPress={onDelete}
            gap="$1.5"
          >
            <Feather name="trash-2" size={14} color="white" />
            <Text color="white" size="sm" bold>Excluir</Text>
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
