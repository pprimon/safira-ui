import type { Theme, Components } from "@mui/material/styles";
import {
  colors,
  borderRadius,
  typography,
  shadows,
} from "../../theme/tokens";

type Mode = "light" | "dark";

export const getTooltipThemeOverrides = (
  theme: Theme,
  mode: Mode
): Pick<Components<Theme>, "MuiTooltip"> => {
  const isDark = mode === "dark";

  const backgroundColors = {
    default: isDark ? "#2A2A3E" : colors.background.dark,
    light: isDark ? "#1E1E2E" : colors.white,
  };

  const textColors = {
    default: colors.white,
    light: isDark ? colors.white : colors.text.primary,
  };

  return {
    MuiTooltip: {
      defaultProps: {
        arrow: true,
        enterDelay: 700,
        leaveDelay: 0,
      },
      styleOverrides: {
        tooltip: {
          backgroundColor: backgroundColors.default,
          color: textColors.default,
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.medium,
          padding: theme.spacing(1, 1.5),
          borderRadius: borderRadius.md,
          boxShadow: shadows.lg,
          maxWidth: 300,
          lineHeight: typography.lineHeight.normal,
          "& .MuiTooltip-arrow": {
            color: backgroundColors.default,
          },
        },
        tooltipPlacementTop: {
          marginBottom: `${theme.spacing(1)} !important`,
        },
        tooltipPlacementBottom: {
          marginTop: `${theme.spacing(1)} !important`,
        },
        tooltipPlacementLeft: {
          marginRight: `${theme.spacing(1)} !important`,
        },
        tooltipPlacementRight: {
          marginLeft: `${theme.spacing(1)} !important`,
        },
        arrow: {
          color: backgroundColors.default,
          "&::before": {
            backgroundColor: backgroundColors.default,
          },
        },
      },
    },
  };
};
