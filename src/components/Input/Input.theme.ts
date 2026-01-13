import type { Theme, Components } from "@mui/material/styles";
import {
  colors,
  borderRadius,
  spacing,
  shadows,
  typography,
} from "../../theme/tokens";

type Mode = "light" | "dark";

const getSizeStyles = (size: "small" | "medium" | "large", theme: Theme) => {
  const sizes = {
    small: {
      minHeight: "36px",
      fontSize: typography.fontSize.sm,
      "& .MuiOutlinedInput-input": {
        padding: theme.spacing(1, 1.5),
      },
    },
    medium: {
      minHeight: "44px",
      fontSize: typography.fontSize.md,
      "& .MuiOutlinedInput-input": {
        padding: theme.spacing(1.25, 1.75),
      },
    },
    large: {
      minHeight: "52px",
      fontSize: typography.fontSize.lg,
      "& .MuiOutlinedInput-input": {
        padding: theme.spacing(1.5, 2),
      },
    },
  };
  return sizes[size];
};

export const getInputThemeOverrides = (
  theme: Theme,
  mode: Mode
): Pick<
  Components<Theme>,
  "MuiTextField" | "MuiOutlinedInput" | "MuiInputLabel" | "MuiFormHelperText"
> => {
  const isDark = mode === "dark";

  const textColors = {
    primary: isDark ? colors.white : colors.text.primary,
    secondary: isDark ? "#B0B0B0" : colors.text.secondary,
    disabled: isDark ? "#666666" : colors.text.disabled,
    hint: isDark ? "#888888" : colors.text.hint,
  };

  const backgroundColors = {
    default: isDark ? "#252538" : colors.white,
    hover: isDark ? "#2A2A3E" : colors.primary.alpha.hover,
    focused: isDark ? "#2A2A3E" : colors.white,
    error: isDark ? `${colors.error.dark}20` : `${colors.error.light}10`,
    errorHover: isDark ? `${colors.error.dark}30` : `${colors.error.light}15`,
    disabled: isDark ? "#1A1A2E" : "#F5F5F5",
  };

  const borderColors = {
    default: colors.primary.light,
    hover: colors.primary.main,
    focused: colors.primary.dark,
  };

  return {
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            ...getSizeStyles("medium", theme),
          },
          '&[data-size="small"] .MuiInputBase-root': {
            ...getSizeStyles("small", theme),
          },
          '&[data-size="large"] .MuiInputBase-root': {
            ...getSizeStyles("large", theme),
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.xl,
          backgroundColor: backgroundColors.default,
          alignItems: "center",
          transition: theme.transitions.create(
            ["background-color", "box-shadow", "border-color", "transform"],
            {
              duration: theme.transitions.duration.shorter,
            }
          ),
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: borderColors.default,
            borderWidth: "1px",
            transition: theme.transitions.create(["border-color", "border-width"], {
              duration: theme.transitions.duration.shorter,
            }),
          },
          "&:hover": {
            backgroundColor: backgroundColors.hover,
            transform: "translateY(-1px)",
            boxShadow: shadows.sm,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: borderColors.hover,
              borderWidth: "2px",
            },
          },
          "&.Mui-focused": {
            backgroundColor: backgroundColors.focused,
            transform: "translateY(-1px)",
            boxShadow: `0 0 0 3px ${colors.primary.alpha.shadow}, ${shadows.md}`,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: borderColors.focused,
              borderWidth: "2px",
            },
          },
          "&.Mui-error": {
            backgroundColor: backgroundColors.error,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: colors.error.light,
              borderWidth: "1px",
            },
            "&:hover": {
              backgroundColor: backgroundColors.errorHover,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: colors.error.main,
                borderWidth: "2px",
              },
            },
            "&.Mui-focused": {
              backgroundColor: backgroundColors.focused,
              boxShadow: `0 0 0 3px ${colors.error.alpha.shadow}, ${shadows.md}`,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: colors.error.main,
                borderWidth: "2px",
              },
            },
          },
          "&.Mui-disabled": {
            backgroundColor: backgroundColors.disabled,
            opacity: 0.6,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: colors.primary.alpha.light,
              borderWidth: "1px",
            },
          },
        },
        input: {
          color: textColors.primary,
          boxSizing: "border-box",
          "&::placeholder": {
            color: textColors.hint,
            opacity: 1,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: textColors.secondary,
          fontWeight: typography.fontWeight.medium,
          fontSize: typography.fontSize.sm,
          "&.Mui-focused": {
            color: colors.primary.main,
            fontWeight: typography.fontWeight.semibold,
          },
          "&.Mui-error": {
            color: colors.error.main,
          },
          "&.Mui-disabled": {
            color: textColors.disabled,
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: spacing.sm,
          marginTop: spacing.xs,
          fontSize: typography.fontSize.xs,
          fontWeight: typography.fontWeight.medium,
          color: textColors.secondary,
          "&.Mui-error": {
            color: colors.error.main,
            fontWeight: typography.fontWeight.semibold,
          },
          "&.Mui-disabled": {
            color: textColors.disabled,
          },
        },
      },
    },
  };
};

