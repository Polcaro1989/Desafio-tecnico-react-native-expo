import type { ReactElement } from "react";

import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { render } from "@testing-library/react-native";

export function renderWithUI(element: ReactElement) {
  return render(
    <GluestackUIProvider config={config}>{element}</GluestackUIProvider>,
  );
}
