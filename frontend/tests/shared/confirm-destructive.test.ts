jest.mock("react-native", () => ({
  Alert: { alert: jest.fn() },
  Platform: { OS: "web" },
}));

import { Alert, Platform } from "react-native";

import { confirmDestructive } from "@/shared/utils/confirm-destructive";

const alertMock = jest.mocked(Alert.alert);
const platform = Platform as { OS: string };
const browserGlobal = globalThis as typeof globalThis & {
  confirm?: (message?: string) => boolean;
};

describe("confirmDestructive", () => {
  const originalConfirm = browserGlobal.confirm;

  beforeEach(() => {
    jest.clearAllMocks();
    platform.OS = "web";
    Reflect.deleteProperty(browserGlobal, "confirm");
  });

  afterAll(() => {
    if (originalConfirm) {
      browserGlobal.confirm = originalConfirm;
      return;
    }

    Reflect.deleteProperty(browserGlobal, "confirm");
  });

  it("uses browser confirm on web", async () => {
    const confirmMock = jest.fn(() => true);
    browserGlobal.confirm = confirmMock;

    const result = await confirmDestructive({
      title: "Excluir loja",
      message: 'Deseja remover a loja "Centro"?',
    });

    expect(result).toBe(true);
    expect(confirmMock).toHaveBeenCalledWith(
      'Excluir loja\n\nDeseja remover a loja "Centro"?',
    );
    expect(alertMock).not.toHaveBeenCalled();
  });

  it("resolves true when the destructive action is confirmed on native", async () => {
    platform.OS = "ios";
    alertMock.mockImplementation((_, __, buttons) => {
      buttons?.[1]?.onPress?.();
    });

    const result = await confirmDestructive({
      title: "Excluir produto",
      message: 'Deseja remover o produto "Mouse"?',
    });

    expect(result).toBe(true);
    expect(alertMock).toHaveBeenCalledTimes(1);
  });

  it("resolves false when browser confirm is unavailable", async () => {
    const result = await confirmDestructive({
      title: "Excluir loja",
      message: "Sem confirm",
    });

    expect(result).toBe(false);
  });
});
