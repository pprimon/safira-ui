import type { Theme, Components } from "@mui/material/styles";
import type { ButtonProps as MuiButtonProps } from "@mui/material";
import { 
  colors, 
  borderRadius,
  spacing,
  typography,
  shadows,
  transitions
} from "../../theme/tokens";

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';
type Mode = 'light' | 'dark';

export interface ButtonOwnerState extends MuiButtonProps {
  customSize?: ButtonSize;
  customVariant?: ButtonVariant;
  loading?: boolean | null;
}

declare module '@mui/material/Button' {
  interface ButtonOwnProps {
    customSize?: ButtonSize;
    customVariant?: ButtonVariant;
    loading?: boolean | null;
  }
}

export const getSizeStyles = (size: ButtonSize) => {
  const sizeStyles = {
    small: {
      padding: `${spacing.xs} ${spacing.md}`,
      fontSize: typography.fontSize.sm,
      minHeight: '32px',
      gap: spacing.xs,
    },
    medium: {
      padding: `${spacing.sm} ${spacing.lg}`,
      fontSize: typography.fontSize.md,
      minHeight: '40px',
      gap: spacing.sm,
    },
    large: {
      padding: `${spacing.md} ${spacing.xl}`,
      fontSize: typography.fontSize.lg,
      minHeight: '48px',
      gap: spacing.sm,
    },
  };
  return sizeStyles[size];
};

export const getVariantStyles = (variant: ButtonVariant, mode: Mode) => {
  const isDark = mode === 'dark';
  
  const variantStyles = {
    primary: {
      backgroundColor: colors.primary.main,
      color: colors.primary.contrastText,
      boxShadow: shadows.sm,
      border: 'none',
      "&:hover": {
        backgroundColor: colors.primary.dark,
        boxShadow: shadows.primary,
        transform: "translateY(-2px)",
      },
      "&:active": {
        transform: "translateY(-1px)",
        boxShadow: shadows.md,
      },
    },
    secondary: {
      backgroundColor: colors.secondary.main,
      color: colors.secondary.contrastText,
      boxShadow: shadows.sm,
      border: 'none',
      "&:hover": {
        backgroundColor: colors.secondary.dark,
        boxShadow: shadows.secondary,
        transform: "translateY(-2px)",
      },
      "&:active": {
        transform: "translateY(-1px)",
        boxShadow: shadows.md,
      },
    },
    outline: {
      backgroundColor: "transparent",
      color: colors.primary.main,
      border: `2px solid ${colors.primary.main}`,
      boxShadow: "none",
      "&:hover": {
        backgroundColor: colors.primary.main,
        color: colors.primary.contrastText,
        boxShadow: shadows.primary,
        transform: "translateY(-2px)",
        borderColor: colors.primary.main,
      },
      "&:active": {
        transform: "translateY(-1px)",
        backgroundColor: colors.primary.dark,
      },
    },
    ghost: {
      backgroundColor: "transparent",
      color: isDark ? colors.primary.light : colors.primary.main,
      boxShadow: "none",
      border: "none",
      "&:hover": {
        backgroundColor: isDark ? colors.primary.alpha.hover : colors.surface.light,
        color: isDark ? colors.primary.light : colors.primary.dark,
        transform: "translateY(-1px)",
      },
      "&:active": {
        transform: "translateY(0)",
        backgroundColor: isDark ? colors.primary.alpha.active : colors.surface.main,
      },
    },
    danger: {
      backgroundColor: colors.error.main,
      color: colors.error.contrastText,
      boxShadow: shadows.sm,
      border: 'none',
      "&:hover": {
        backgroundColor: colors.error.dark,
        boxShadow: `0 4px 14px 0 ${colors.error.alpha.shadow}`,
        transform: "translateY(-2px)",
      },
      "&:active": {
        transform: "translateY(-1px)",
        boxShadow: shadows.md,
      },
    },
  };
  
  return variantStyles[variant];
};

export const getButtonThemeOverrides = (
  _theme: Theme,
  mode: Mode
): Pick<Components<Theme>, "MuiButton"> => ({
  MuiButton: {
    styleOverrides: {
      root: ({ ownerState }) => {
        const state = ownerState as ButtonOwnerState;
        const size = state.customSize || 'medium';
        const customVariant = state.customVariant || 'primary';
        const isLoading = state.loading || false;

        const sizeStyles = getSizeStyles(size);
        const variantStyles = getVariantStyles(customVariant, mode);

        return {
          borderRadius: borderRadius.xl,
          textTransform: 'none' as const,
          fontWeight: typography.fontWeight.semibold,
          letterSpacing: typography.letterSpacing.wide,
          transition: `all ${transitions.duration.shorter}ms ${transitions.easing.easeInOut}`,
          cursor: isLoading ? 'wait' : 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative' as const,
          overflow: 'hidden',
          userSelect: 'none' as const,
          ...sizeStyles,
          ...variantStyles,
          "&:disabled": {
            opacity: 0.5,
            cursor: "not-allowed",
            transform: "none",
            pointerEvents: "none",
          },
          "&:disabled:hover": {
            transform: "none",
            boxShadow: "none",
          },
          "&:focus-visible": {
            outline: `3px solid ${colors.accent.main}`,
            outlineOffset: "2px",
          },
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(45deg, transparent 30%, ${colors.overlay.light} 50%, transparent 70%)`,
            transform: "translateX(-100%)",
            transition: `transform ${transitions.duration.standard}ms ${transitions.easing.easeInOut}`,
          },
          "&:hover::before": {
            transform: "translateX(100%)",
          },
        };
      },
    },
  },
});

