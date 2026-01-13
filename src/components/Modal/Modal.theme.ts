import type { Theme, Components } from "@mui/material/styles";
import {
  colors,
  borderRadius,
  typography,
  shadows,
} from "../../theme/tokens";

type Mode = "light" | "dark";

export const getModalThemeOverrides = (
  theme: Theme,
  mode: Mode
): Pick<
  Components<Theme>,
  "MuiDialog" | "MuiDialogTitle" | "MuiDialogContent" | "MuiDialogActions"
> => {
  const isDark = mode === "dark";

  const backgroundColors = {
    paper: isDark ? "#1E1E2E" : colors.white,
    overlay: isDark ? "rgba(0, 0, 0, 0.7)" : "rgba(0, 0, 0, 0.5)",
  };

  const borderColors = {
    divider: isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)",
  };

  return {
    MuiDialog: {
      styleOverrides: {
        root: {
          "& .MuiBackdrop-root": {
            backgroundColor: backgroundColors.overlay,
            backdropFilter: "blur(4px)",
          },
        },
        paper: {
          backgroundColor: backgroundColors.paper,
          borderRadius: borderRadius.xl,
          boxShadow: shadows.xxl,
          border: `1px solid ${borderColors.divider}`,
          transition: theme.transitions.create(
            ["transform", "opacity"],
            {
              duration: theme.transitions.duration.standard,
            }
          ),
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontWeight: typography.fontWeight.bold,
          fontSize: typography.fontSize.xl,
          color: isDark ? colors.white : colors.text.primary,
          padding: theme.spacing(2, 3),
          borderBottom: `1px solid ${borderColors.divider}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: theme.spacing(3),
          color: isDark ? "#E0E0E0" : colors.text.primary,
          fontSize: typography.fontSize.md,
          lineHeight: typography.lineHeight.relaxed,
          "&:first-of-type": {
            paddingTop: theme.spacing(3),
          },
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: theme.spacing(2, 3),
          borderTop: `1px solid ${borderColors.divider}`,
          gap: theme.spacing(1),
          "& > :not(:first-of-type)": {
            marginLeft: 0,
          },
        },
      },
    },
  };
};
