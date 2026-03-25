import { useEffect, useState } from "react";

import {
  Box,
  Button,
  ButtonSpinner,
  ButtonText,
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  Text,
  VStack,
} from "@gluestack-ui/themed";

import type { StoreFormValues } from "../types";

interface StoreFormProps {
  initialValues?: StoreFormValues;
  submitLabel: string;
  isSubmitting?: boolean;
  onSubmit: (values: StoreFormValues) => Promise<void>;
}

export function StoreForm({
  initialValues,
  isSubmitting,
  onSubmit,
  submitLabel,
}: StoreFormProps) {
  const [name, setName] = useState(initialValues?.name ?? "");
  const [address, setAddress] = useState(initialValues?.address ?? "");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setName(initialValues?.name ?? "");
    setAddress(initialValues?.address ?? "");
  }, [initialValues?.address, initialValues?.name]);

  async function handleSubmit() {
    if (!name.trim() || !address.trim()) {
      setError("Nome e endereço são obrigatórios.");
      return;
    }

    setError(null);
    await onSubmit({
      name: name.trim(),
      address: address.trim(),
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
            Dados da loja
          </Text>
        </VStack>

        <FormControl isInvalid={Boolean(error && !name.trim())}>
          <FormControlLabel>
            <FormControlLabelText>Nome da loja</FormControlLabelText>
          </FormControlLabel>
          <Input borderRadius="2xl" bg="#f8fafc" borderColor="#cbd5e1">
            <InputField
              placeholder="Ex.: Loja Centro"
              value={name}
              onChangeText={setName}
            />
          </Input>
          <FormControlHelper>
            <FormControlHelperText>
              Use um nome facil de localizar na listagem.
            </FormControlHelperText>
          </FormControlHelper>
        </FormControl>

        <FormControl isInvalid={Boolean(error && !address.trim())}>
          <FormControlLabel>
            <FormControlLabelText>Endereço</FormControlLabelText>
          </FormControlLabel>
          <Input borderRadius="2xl" bg="#f8fafc" borderColor="#cbd5e1">
            <InputField
              placeholder="Rua, numero e referencia"
              value={address}
              onChangeText={setAddress}
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
