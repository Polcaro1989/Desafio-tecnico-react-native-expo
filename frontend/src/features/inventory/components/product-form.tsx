import { useEffect, useState } from "react";

import {
  Box,
  Button,
  ButtonSpinner,
  ButtonText,
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  Text,
  VStack,
} from "@gluestack-ui/themed";

import type { ProductFormValues } from "../types";

interface ProductFormProps {
  initialValues?: ProductFormValues;
  submitLabel: string;
  isSubmitting?: boolean;
  onSubmit: (values: ProductFormValues) => Promise<void>;
}

export function ProductForm({
  initialValues,
  isSubmitting,
  onSubmit,
  submitLabel,
}: ProductFormProps) {
  const [name, setName] = useState(initialValues?.name ?? "");
  const [category, setCategory] = useState(initialValues?.category ?? "");
  const [price, setPrice] = useState(initialValues?.price ?? "");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setName(initialValues?.name ?? "");
    setCategory(initialValues?.category ?? "");
    setPrice(initialValues?.price ?? "");
  }, [initialValues?.category, initialValues?.name, initialValues?.price]);

  async function handleSubmit() {
    const normalizedPrice = Number(price.replace(",", "."));

    if (!name.trim() || !category.trim() || !price.trim()) {
      setError("Nome, categoria e preço são obrigatórios.");
      return;
    }

    if (Number.isNaN(normalizedPrice) || normalizedPrice < 0) {
      setError("Informe um preco valido.");
      return;
    }

    setError(null);

    await onSubmit({
      name: name.trim(),
      category: category.trim(),
      price: normalizedPrice.toString(),
    });
  }

  return (
    <Box
      bg="$white"
      borderRadius="$3xl"
      px="$6"
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
        <VStack gap="$1">
          <Text bold size="xl" color="#1e293b">
            Dados do produto
          </Text>
        </VStack>

        <FormControl>
          <FormControlLabel>
            <FormControlLabelText>Nome do produto</FormControlLabelText>
          </FormControlLabel>
          <Input borderRadius="2xl" bg="#f8fafc" borderColor="#cbd5e1">
            <InputField
              placeholder="Ex.: Mouse sem fio"
              value={name}
              onChangeText={setName}
            />
          </Input>
        </FormControl>

        <FormControl>
          <FormControlLabel>
            <FormControlLabelText>Categoria</FormControlLabelText>
          </FormControlLabel>
          <Input borderRadius="2xl" bg="#f8fafc" borderColor="#cbd5e1">
            <InputField
              placeholder="Ex.: Eletrônicos"
              value={category}
              onChangeText={setCategory}
            />
          </Input>
        </FormControl>

        <FormControl>
          <FormControlLabel>
            <FormControlLabelText>Preco</FormControlLabelText>
          </FormControlLabel>
          <Input borderRadius="2xl" bg="#f8fafc" borderColor="#cbd5e1">
            <InputField
              placeholder="Ex.: 89.90"
              keyboardType="decimal-pad"
              value={price}
              onChangeText={setPrice}
            />
          </Input>
        </FormControl>

        {error ? (
          <FormControl isInvalid>
            <FormControlError>
              <FormControlErrorText>{error}</FormControlErrorText>
            </FormControlError>
          </FormControl>
        ) : null}

        <Button bg="#4f46e5" borderRadius="$full" onPress={() => void handleSubmit()}>
          {isSubmitting ? <ButtonSpinner mr="$2" /> : null}
          <ButtonText>{submitLabel}</ButtonText>
        </Button>
      </VStack>
    </Box>
  );
}
