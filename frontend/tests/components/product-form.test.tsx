import { fireEvent, screen, waitFor } from "@testing-library/react-native";

import { ProductForm } from "@/features/inventory/components/product-form";

import { renderWithUI } from "../utils/render-with-ui";

describe("ProductForm", () => {
  it("normalizes decimal input before submitting", async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);

    renderWithUI(
      <ProductForm
        submitLabel="Salvar produto"
        onSubmit={onSubmit}
      />,
    );

    fireEvent.changeText(
      screen.getByPlaceholderText("Ex.: Mouse sem fio"),
      "  Mouse sem fio  ",
    );
    fireEvent.changeText(
      screen.getByPlaceholderText("Ex.: Eletrônicos"),
      "  Eletrônicos  ",
    );
    fireEvent.changeText(
      screen.getByPlaceholderText("Ex.: 89.90"),
      "19,9",
    );
    fireEvent.press(screen.getByRole("button"));

    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith({
        name: "Mouse sem fio",
        category: "Eletrônicos",
        price: "19.9",
      }),
    );
  });

  it("prevents submission when the price is invalid", async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);

    renderWithUI(
      <ProductForm
        submitLabel="Salvar produto"
        onSubmit={onSubmit}
      />,
    );

    fireEvent.changeText(
      screen.getByPlaceholderText("Ex.: Mouse sem fio"),
      "Mouse sem fio",
    );
    fireEvent.changeText(
      screen.getByPlaceholderText("Ex.: Eletrônicos"),
      "Eletrônicos",
    );
    fireEvent.changeText(
      screen.getByPlaceholderText("Ex.: 89.90"),
      "-10",
    );
    fireEvent.press(screen.getByRole("button"));

    expect(await screen.findByText("Informe um preco valido.")).toBeTruthy();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
