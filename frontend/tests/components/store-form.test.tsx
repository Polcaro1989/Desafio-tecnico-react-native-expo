import { fireEvent, screen, waitFor } from "@testing-library/react-native";

import { StoreForm } from "@/features/inventory/components/store-form";

import { renderWithUI } from "../utils/render-with-ui";

describe("StoreForm", () => {
  it("submits trimmed values when the form is valid", async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);

    renderWithUI(
      <StoreForm
        submitLabel="Salvar loja"
        onSubmit={onSubmit}
      />,
    );

    fireEvent.changeText(
      screen.getByPlaceholderText("Ex.: Loja Centro"),
      "  Loja Centro  ",
    );
    fireEvent.changeText(
      screen.getByPlaceholderText("Rua, numero e referencia"),
      "  Rua A, 123  ",
    );
    fireEvent.press(screen.getByRole("button"));

    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith({
        name: "Loja Centro",
        address: "Rua A, 123",
      }),
    );
  });

  it("shows an error when required fields are missing", async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);

    renderWithUI(
      <StoreForm
        submitLabel="Salvar loja"
        onSubmit={onSubmit}
      />,
    );

    fireEvent.press(screen.getByRole("button"));

    expect(
      await screen.findByText("Nome e endereço são obrigatórios."),
    ).toBeTruthy();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
