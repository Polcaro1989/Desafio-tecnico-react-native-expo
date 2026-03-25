import type { PropsWithChildren, ReactNode } from "react";
import { ScrollView, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useRouter } from "expo-router";

import { Box, Button, ButtonText, HStack, Text, VStack } from "@gluestack-ui/themed";

interface ScreenShellProps extends PropsWithChildren {
  eyebrow: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
  showBackButton?: boolean;
}

export function ScreenShell({
  action,
  children,
  eyebrow,
  subtitle,
  title,
  showBackButton,
}: ScreenShellProps) {
  const { width } = useWindowDimensions();
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F1F5F9" }}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Box
          style={{
            width: "100%",
            maxWidth: width >= 1024 ? 920 : 720,
            alignSelf: "center",
          }}
        >
          <VStack gap="$5">
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
                shadowRadius: 15,
                elevation: 2,
              }}
            >
              <VStack gap="$4">
                <VStack gap="$2">
                  <HStack justifyContent="space-between" alignItems="center">
                    <Text
                      color="#4338ca"
                      size="sm"
                      style={{ textTransform: "uppercase", letterSpacing: 1.2 }}
                    >
                      {eyebrow}
                    </Text>
                    {showBackButton && router.canGoBack() ? (
                      <Button variant="link" size="sm" onPress={() => router.back()}>
                        <ButtonText color="#4338ca">← Voltar</ButtonText>
                      </Button>
                    ) : null}
                  </HStack>
                  <Text
                    color="#1e293b"
                    style={{ fontSize: 34, lineHeight: 40, fontWeight: "700" }}
                  >
                    {title}
                  </Text>
                  {subtitle ? (
                    <Text color="#475569" style={{ fontSize: 16, lineHeight: 24 }}>
                      {subtitle}
                    </Text>
                  ) : null}
                </VStack>
                {action ? (
                  <HStack flexWrap="wrap" gap="$3">
                    {action}
                  </HStack>
                ) : null}
              </VStack>
            </Box>

            {children}
          </VStack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}
