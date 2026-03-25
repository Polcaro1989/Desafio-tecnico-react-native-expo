import { Box, Text, VStack } from "@gluestack-ui/themed";

interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ description, title }: EmptyStateProps) {
  return (
    <Box
      bg="$white"
      borderRadius="$3xl"
      borderWidth={1}
      borderColor="#e2e8f0"
      px="$5"
      py="$8"
    >
      <VStack gap="$2">
        <Text bold color="#1e293b" size="lg">
          {title}
        </Text>
        <Text color="#64748b" style={{ lineHeight: 22 }}>
          {description}
        </Text>
      </VStack>
    </Box>
  );
}
