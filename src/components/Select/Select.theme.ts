import type { Theme, Components } from "@mui/material/styles";
import {
  colors,
  borderRadius,
  shadows,
  typography,
} from "../../theme/tokens";

type Mode = "light" | "dark";

export const getSelectThemeOverrides = (
  theme: Theme,
  mode: Mode
): Pick<Components<Theme>, "MuiSelect" | "MuiMenuItem"> => {
  const isDark = mode === "dark";

  const textColors = {
    primary: isDark ? colors.white : colors.text.primary,
    secondary: isDark ? "#B0B0B0" : colors.text.secondary,
    disabled: isDark ? "#666666" : colors.text.disabled,
  };

  const backgroundColors = {
    default: isDark ? "#252538" : colors.white,
    hover: isDark ? "#2A2A3E" : colors.primary.alpha.hover,
    selected: isDark ? "#3A3A4E" : colors.primary.alpha.active,
    menuPaper: isDark ? "#1E1E2E" : colors.white,
  };

  const borderColors = {
    default: colors.primary.light,
    hover: colors.primary.main,
    focused: colors.primary.dark,
  };

  return {
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.xl,
          backgroundColor: backgroundColors.default,
          transition: theme.transitions.create(
            ["background-color", "box-shadow", "border-color", "transform"],
            {
              duration: theme.transitions.duration.shorter,
            }
          ),
          "&:hover": {
            backgroundColor: backgroundColors.hover,
            transform: "translateY(-1px)",
            boxShadow: shadows.sm,
          },
          "&.Mui-focused": {
            backgroundColor: backgroundColors.default,
            boxShadow: `0 0 0 3px ${colors.primary.alpha.shadow}, ${shadows.md}`,
          },
          "&.Mui-error": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: colors.error.main,
            },
          },
          "&.Mui-disabled": {
            backgroundColor: isDark ? "#1A1A2E" : "#F5F5F5",
            opacity: 0.6,
          },
        },
        select: {
          color: textColors.primary,
          padding: theme.spacing(1.25, 1.75),
          minHeight: "auto",
          display: "flex",
          alignItems: "center",
        },
        icon: {
          color: colors.primary.main,
          transition: theme.transitions.create(["transform"], {
            duration: theme.transitions.duration.shorter,
          }),
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: typography.fontSize.md,
          fontWeight: typography.fontWeight.normal,
          padding: theme.spacing(1.25, 2),
          borderRadius: borderRadius.md,
          margin: theme.spacing(0.25, 1),
          transition: theme.transitions.create(
            ["background-color", "color"],
            {
              duration: theme.transitions.duration.shorter,
            }
          ),
          "&:hover": {
            backgroundColor: backgroundColors.hover,
          },
          "&.Mui-selected": {
            backgroundColor: backgroundColors.selected,
            fontWeight: typography.fontWeight.medium,
            color: colors.primary.dark,
            "&:hover": {
              backgroundColor: colors.primary.alpha.active,
            },
          },
          "&.Mui-disabled": {
            opacity: 0.5,
            color: textColors.disabled,
          },
        },
      },
    },
  };
};
