import { Alert, Platform } from "react-native";

interface ConfirmDestructiveOptions {
  title: string;
  message: string;
  confirmLabel?: string;
}

type ConfirmFunction = (message?: string) => boolean;

function getWebConfirm(): ConfirmFunction | undefined {
  const maybeGlobal = globalThis as { confirm?: ConfirmFunction };

  return typeof maybeGlobal.confirm === "function"
    ? maybeGlobal.confirm
    : undefined;
}

export async function confirmDestructive({
  title,
  message,
  confirmLabel = "Excluir",
}: ConfirmDestructiveOptions): Promise<boolean> {
  if (Platform.OS === "web") {
    const confirm = getWebConfirm();
    return confirm ? confirm(`${title}\n\n${message}`) : false;
  }

  return new Promise<boolean>((resolve) => {
    let settled = false;

    const finish = (value: boolean) => {
      if (settled) {
        return;
      }

      settled = true;
      resolve(value);
    };

    Alert.alert(
      title,
      message,
      [
        { text: "Cancelar", style: "cancel", onPress: () => finish(false) },
        {
          text: confirmLabel,
          style: "destructive",
          onPress: () => finish(true),
        },
      ],
      {
        cancelable: true,
        onDismiss: () => finish(false),
      },
    );
  });
}
