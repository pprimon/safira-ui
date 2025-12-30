import React, { createContext, useContext, useState, useMemo } from "react";
import type { ReactNode } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import type { Theme, ThemeOptions } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { lightTheme, darkTheme, createCustomTheme } from "./theme";

type ThemeMode = "light" | "dark";

interface SafiraThemeContextType {
  mode: ThemeMode;
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

const SafiraThemeContext = createContext<SafiraThemeContextType | undefined>(
  undefined
);

export interface SafiraThemeProviderProps {
  children: ReactNode;
  /**
   * Modo inicial do tema
   * @default "light"
   */
  defaultMode?: ThemeMode;
  /**
   * Tema customizado para modo claro (opcional)
   * Se não fornecido, usa o tema padrão do Safira UI
   */
  lightThemeOverride?: Theme;
  /**
   * Tema customizado para modo escuro (opcional)
   * Se não fornecido, usa o tema padrão do Safira UI
   */
  darkThemeOverride?: Theme;
  /**
   * Opções para customizar o tema (será aplicado sobre o tema base)
   */
  themeOptions?: Partial<ThemeOptions>;
}

/**
 * Provider de tema do Safira UI
 *
 * Gerencia alternância entre modo claro e escuro e permite customização de temas.
 *
 * @example
 * ```tsx
 * // Uso básico com temas padrão
 * <SafiraThemeProvider>
 *   <App />
 * </SafiraThemeProvider>
 *
 * // Com modo escuro como padrão
 * <SafiraThemeProvider defaultMode="dark">
 *   <App />
 * </SafiraThemeProvider>
 *
 * // Com tema customizado
 * <SafiraThemeProvider
 *   themeOptions={{
 *     palette: {
 *       primary: { main: '#FF5722' }
 *     }
 *   }}
 * >
 *   <App />
 * </SafiraThemeProvider>
 * ```
 */
export const SafiraThemeProvider: React.FC<SafiraThemeProviderProps> = ({
  children,
  defaultMode = "light",
  lightThemeOverride,
  darkThemeOverride,
  themeOptions,
}) => {
  const [mode, setMode] = useState<ThemeMode>(defaultMode);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const setThemeMode = (newMode: ThemeMode) => {
    setMode(newMode);
  };

  // Calcula o tema baseado no modo e customizações
  const theme = useMemo(() => {
    // Se um tema customizado foi fornecido, usa ele
    if (mode === "light" && lightThemeOverride) {
      return lightThemeOverride;
    }
    if (mode === "dark" && darkThemeOverride) {
      return darkThemeOverride;
    }

    // Se opções de tema foram fornecidas, cria um tema customizado
    if (themeOptions) {
      return createCustomTheme(mode, themeOptions);
    }

    // Caso contrário, usa o tema padrão
    return mode === "light" ? lightTheme : darkTheme;
  }, [mode, lightThemeOverride, darkThemeOverride, themeOptions]);

  const contextValue: SafiraThemeContextType = useMemo(
    () => ({
      mode,
      theme,
      toggleTheme,
      setTheme: setThemeMode,
    }),
    [mode, theme]
  );

  return (
    <SafiraThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </SafiraThemeContext.Provider>
  );
};

/**
 * Hook para acessar o contexto de tema do Safira UI
 *
 * @example
 * ```tsx
 * const { mode, toggleTheme, theme } = useSafiraTheme();
 * ```
 */
export const useSafiraTheme = (): SafiraThemeContextType => {
  const context = useContext(SafiraThemeContext);
  if (context === undefined) {
    throw new Error("useSafiraTheme must be used within a SafiraThemeProvider");
  }
  return context;
};

/**
 * Componente de botão para alternar tema
 *
 * @example
 * ```tsx
 * <ThemeToggle />
 * ```
 */
export const ThemeToggle: React.FC = () => {
  const { mode, toggleTheme, theme } = useSafiraTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: "8px 16px",
        borderRadius: theme.shape.borderRadius,
        border: "none",
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        cursor: "pointer",
        fontWeight: 500,
        transition: `all ${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeInOut}`,
      }}
    >
      {mode === "light" ? "🌙 Modo Escuro" : "☀️ Modo Claro"}
    </button>
  );
};

// Exporta também o nome antigo para compatibilidade
export const useTheme = useSafiraTheme;

export default SafiraThemeProvider;
