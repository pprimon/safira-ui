import { createTheme } from "@mui/material/styles";
import type { Theme, ThemeOptions } from "@mui/material/styles";
import { getAlertThemeOverrides } from "../components/Alert/Alert.theme";
import { getBadgeThemeOverrides } from "../components/Badge/Badge.theme";
import { getButtonThemeOverrides } from "../components/Button/Button.theme";
import { getCardThemeOverrides } from "../components/Card/Card.theme";
import { getInputThemeOverrides } from "../components/Input/Input.theme";
import { colors, borderRadius, typography } from "./tokens";

export const designTokens = {
  colors,
  shape: {
    borderRadius: borderRadius.md,
    borderRadiusLg: borderRadius.lg,
    borderRadiusXl: borderRadius.xl,
  },
  typography: {
    fontFamily: typography.fontFamily.primary,
  },
} as const;

const getBaseThemeOptions = (mode: "light" | "dark"): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: colors.primary.main,
      light: colors.primary.light,
      dark: colors.primary.dark,
      contrastText: colors.primary.contrastText,
    },
    secondary: {
      main: colors.secondary.main,
      light: colors.secondary.light,
      dark: colors.secondary.dark,
      contrastText: colors.secondary.contrastText,
    },
    success: {
      main: colors.success.main,
      light: colors.success.light,
      dark: colors.success.dark,
      contrastText: colors.success.contrastText,
    },
    error: {
      main: colors.error.main,
      light: colors.error.light,
      dark: colors.error.dark,
      contrastText: colors.error.contrastText,
    },
    warning: {
      main: colors.warning.main,
      light: colors.warning.light,
      dark: colors.warning.dark,
      contrastText: colors.warning.contrastText,
    },
    info: {
      main: colors.info.main,
      light: colors.info.light,
      dark: colors.info.dark,
      contrastText: colors.info.contrastText,
    },
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
  transitions: {
    create: (props, options) => {
      const defaultOptions = {
        duration: 250,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        delay: 0,
        ...options,
      };

      const properties = Array.isArray(props) ? props : [props];
      const transitions = properties.map(
        (prop) =>
          `${prop} ${defaultOptions.duration}ms ${defaultOptions.easing} ${defaultOptions.delay}ms`
      );

      return transitions.join(", ");
    },
  },
});

const getComponentOverrides = (
  theme: Theme,
  mode: "light" | "dark"
): ThemeOptions["components"] => {
  const alertOverrides = getAlertThemeOverrides(theme, mode);
  const badgeOverrides = getBadgeThemeOverrides(theme, mode);
  const buttonOverrides = getButtonThemeOverrides(theme, mode);
  const cardOverrides = getCardThemeOverrides(theme, mode);
  const inputOverrides = getInputThemeOverrides(theme, mode);

  return {
    ...alertOverrides,
    ...badgeOverrides,
    ...buttonOverrides,
    ...cardOverrides,
    ...inputOverrides,
    MuiCssBaseline: {
      styleOverrides: {
        "@media (prefers-reduced-motion: reduce)": {
          "*": {
            animationDuration: "0.01ms !important",
            animationIterationCount: "1 !important",
            transitionDuration: "0.01ms !important",
          },
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
    MuiButtonBase: {
      defaultProps: {
        disableRipple: false,
      },
    },
  };
};

const createSafiraTheme = (mode: "light" | "dark"): Theme => {
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
          ? {
              primary: colors.text.primary,
              secondary: colors.text.secondary,
              disabled: colors.text.disabled,
            }
          : {
              primary: "#FFFFFF",
              secondary: "#B0B0B0",
              disabled: "#666666",
            },
    },
  });

  return createTheme(baseTheme, {
    components: getComponentOverrides(baseTheme, mode),
  });
};

export const lightTheme: Theme = createSafiraTheme("light");

export const darkTheme: Theme = createSafiraTheme("dark");

export const createCustomTheme = (
  mode: "light" | "dark",
  customOptions?: Partial<ThemeOptions>
): Theme => {
  const baseTheme = createSafiraTheme(mode);

  if (!customOptions) return baseTheme;

  return createTheme(baseTheme, customOptions);
};

export default lightTheme;
