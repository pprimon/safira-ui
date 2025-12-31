import { createTheme } from "@mui/material/styles";
import type { Theme, ThemeOptions } from "@mui/material/styles";
import { getAlertThemeOverrides } from "../components/Alert/Alert.theme";
import { getBadgeThemeOverrides } from "../components/Badge/Badge.theme";


export const designTokens = {
  colors: {
    primary: {
      main: "#9472C8",
      light: "#B899D4",
      dark: "#572F93",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#572F93",
      light: "#7A5BAD",
      dark: "#3F2066",
      contrastText: "#EBE54B",
    },
    accent: {
      main: "#EBE54B",
      light: "#F0EB70",
      dark: "#D4CE3A",
      contrastText: "#3F3E33",
    },
    success: {
      main: "#4CAF50",
      light: "#81C784",
      dark: "#1B5E20", // Verde mais escuro para melhor contraste (7:1 com #E8F5E9)
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#F44336",
      light: "#E57373",
      dark: "#B71C1C", // Vermelho mais escuro para melhor contraste (7:1 com #FFEBEE)
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#FF9800",
      light: "#FFB74D",
      dark: "#BF360C", // Deep Orange 900 para melhor contraste (7:1 com #FFF3E0)
      contrastText: "#000000",
    },
    info: {
      main: "#2196F3",
      light: "#64B5F6",
      dark: "#0D47A1", // Azul mais escuro para melhor contraste (7:1 com #E3F2FD)
      contrastText: "#FFFFFF",
    },
  },
  shape: {
    borderRadius: 8,
    borderRadiusLg: 12,
    borderRadiusXl: 16,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
};

/**
 * Opções base compartilhadas entre temas claro e escuro
 */
const getBaseThemeOptions = (mode: "light" | "dark"): ThemeOptions => ({
  palette: {
    mode,
    primary: designTokens.colors.primary,
    secondary: designTokens.colors.secondary,
    success: designTokens.colors.success,
    error: designTokens.colors.error,
    warning: designTokens.colors.warning,
    info: designTokens.colors.info,
  },
  typography: {
    fontFamily: designTokens.typography.fontFamily,
    button: {
      textTransform: "none" as const,
    },
  },
  shape: {
    borderRadius: designTokens.shape.borderRadius,
  },
});

/**
 * Customizações de componentes que funcionam com qualquer tema
 * Os temas de cada componente são importados de seus respectivos arquivos
 */
const getComponentOverrides = (theme: Theme, mode: "light" | "dark"): ThemeOptions["components"] => {
  const alertOverrides = getAlertThemeOverrides(theme, mode);
  const badgeOverrides = getBadgeThemeOverrides(theme, mode);

  return {
    ...alertOverrides,
    ...badgeOverrides,
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.shape.borderRadiusLg,
          fontWeight: 500,
          padding: theme.spacing(1, 3),
          "&:hover": {
            transform: "translateY(-1px)",
          },
          transition: theme.transitions.create(
            ["background-color", "box-shadow", "transform"],
            { duration: theme.transitions.duration.shorter }
          ),
        },
        contained: {
          boxShadow: theme.shadows[1],
          "&:hover": {
            boxShadow: theme.shadows[4],
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.shape.borderRadiusXl,
          boxShadow: theme.shadows[2],
          "&:hover": {
            boxShadow: theme.shadows[4],
            transform: "translateY(-2px)",
          },
          transition: theme.transitions.create(
            ["box-shadow", "transform"],
            { duration: theme.transitions.duration.shorter }
          ),
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.shape.borderRadiusLg,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.shape.borderRadiusXl,
          fontWeight: 500,
        },
      },
    },
  };
};

/**
 * Cria um tema Safira UI completo
 */
const createSafiraTheme = (mode: "light" | "dark"): Theme => {
  // Primeiro, cria o tema base
  const baseTheme = createTheme({
    ...getBaseThemeOptions(mode),
    palette: {
      ...getBaseThemeOptions(mode).palette,
      background:
        mode === "light"
          ? { default: "#F8F8F8", paper: "#FFFFFF" }
          : { default: "#1A1A2E", paper: "#252538" },
      text:
        mode === "light"
          ? { primary: "#3F3E33", secondary: "#60586B", disabled: "#9E9E9E" }
          : { primary: "#FFFFFF", secondary: "#B0B0B0", disabled: "#666666" },
    },
  });

  // Depois, aplica as customizações de componentes que precisam do tema
  return createTheme(baseTheme, {
    components: getComponentOverrides(baseTheme, mode),
  });
};

/**
 * Tema claro do Safira UI
 */
export const lightTheme: Theme = createSafiraTheme("light");

/**
 * Tema escuro do Safira UI
 */
export const darkTheme: Theme = createSafiraTheme("dark");

/**
 * Função para criar um tema customizado baseado no Safira UI
 * Permite sobrescrever cores e configurações
 */
export const createCustomTheme = (
  mode: "light" | "dark",
  customOptions?: Partial<ThemeOptions>
): Theme => {
  const baseTheme = createSafiraTheme(mode);

  if (!customOptions) return baseTheme;

  return createTheme(baseTheme, customOptions);
};

export default lightTheme;
