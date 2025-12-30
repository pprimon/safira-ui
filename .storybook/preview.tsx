import React from "react";
import type { Preview, Decorator } from "@storybook/react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "../src/theme";

/**
 * Decorator que aplica o tema baseado no parâmetro global
 */
const withTheme: Decorator = (Story, context) => {
  const selectedTheme = context?.globals?.theme ?? "light";
  const theme = selectedTheme === "dark" ? darkTheme : lightTheme;

  // No contexto de docs, não aplicar minHeight para evitar Canvas muito grandes
  const isDocsContext = context?.viewMode === "docs";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        style={{
          padding: "1rem",
          backgroundColor: theme.palette.background.default,
          minHeight: isDocsContext ? "auto" : "100vh",
        }}
      >
        <Story />
      </div>
    </ThemeProvider>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true,
    },
  },
  // Valor inicial do tema
  initialGlobals: {
    theme: "light",
  },
  // Adiciona controle global para tema na toolbar
  globalTypes: {
    theme: {
      description: "Tema global para os componentes",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "light", icon: "sun", title: "Light Theme" },
          { value: "dark", icon: "moon", title: "Dark Theme" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTheme],
};

export default preview;
