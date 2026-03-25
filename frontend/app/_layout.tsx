import { useEffect, useState } from "react";

import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { config } from "@gluestack-ui/config";
import {
  Box,
  GluestackUIProvider,
  Spinner,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { ensureMockServer } from "@/shared/bootstrap/ensure-mock-server";

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#F1F5F9",
    card: "#ffffff",
    border: "#e2e8f0",
    primary: "#4f46e5",
    text: "#1e293b",
  },
};

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [bootstrapError, setBootstrapError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    void ensureMockServer()
      .then(() => {
        if (isMounted) {
          setIsReady(true);
        }
      })
      .catch((error: unknown) => {
        if (!isMounted) {
          return;
        }

        const message =
          error instanceof Error
            ? error.message
            : "Não foi possível iniciar a API mock.";

        setBootstrapError(message);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <GluestackUIProvider config={config}>
      <ThemeProvider value={navigationTheme}>
        {isReady ? (
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "#F1F5F9" },
              animation: "slide_from_right",
            }}
          />
        ) : (
          <Box
            flex={1}
            bg="#f8fafc"
            alignItems="center"
            justifyContent="center"
            px="$6"
          >
            <VStack gap="$4" alignItems="center">
              <Spinner size="large" color="#4f46e5" />
              <Text bold color="#1e293b" textAlign="center">
                Iniciando a base mock
              </Text>
              <Text color="#64748b" textAlign="center">
                {bootstrapError ??
                  "Carregando lojas e produtos persistidos no dispositivo."}
              </Text>
            </VStack>
          </Box>
        )}
        <StatusBar style="dark" />
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
