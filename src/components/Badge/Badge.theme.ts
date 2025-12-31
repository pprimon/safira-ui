import type { Theme, Components } from "@mui/material/styles";
import type { BadgeProps as MuiBadgeProps } from "@mui/material";
import { 
  colors, 
  borderRadius,
  typography,
  shadows,
  transitions
} from "../../theme/tokens";

export type BadgeColor = 'primary' | 'secondary' | 'accent' | 'success' | 'error' | 'warning' | 'info';
export type BadgeSize = 'small' | 'medium' | 'large';
export type BadgeVariant = 'standard' | 'dot' | 'outlined';
type Mode = 'light' | 'dark';

export interface BadgeOwnerState extends MuiBadgeProps {
  size?: BadgeSize;
  customColor?: BadgeColor;
  customVariant?: BadgeVariant;
  standalone?: boolean;
}

declare module '@mui/material/Badge' {
  interface BadgeOwnProps {
    size?: BadgeSize;
    customColor?: BadgeColor;
    customVariant?: BadgeVariant;
    standalone?: boolean;
  }
}

export const getColorStyles = (color: BadgeColor) => {
  const colorConfig = colors[color];
  return {
    backgroundColor: colorConfig.main,
    color: colorConfig.contrastText,
  };
};

export const getSizeStyles = (size: BadgeSize) => {
  const sizeStyles = {
    small: {
      height: '16px',
      minWidth: '16px',
      fontSize: typography.fontSize.xs,
      padding: '0 4px',
    },
    medium: {
      height: '20px',
      minWidth: '20px',
      fontSize: '0.75rem',
      padding: '0 6px',
    },
    large: {
      height: '24px',
      minWidth: '24px',
      fontSize: typography.fontSize.sm,
      padding: '0 8px',
    },
  };
  return sizeStyles[size];
};

export const getDotSizeStyles = (size: BadgeSize) => {
  const dotSizes = {
    small: '8px',
    medium: '10px',
    large: '12px',
  };
  return {
    height: dotSizes[size],
    minWidth: dotSizes[size],
    padding: 0,
    borderRadius: '50%',
  };
};

export const getOutlinedBadgeStyles = (color: BadgeColor) => {
  const colorConfig = colors[color];
  return {
    backgroundColor: 'transparent',
    color: colorConfig.main,
    border: `2px solid ${colorConfig.main}`,
  };
};

export const getStandaloneBadgeStyles = () => ({
  position: 'static' as const,
  transform: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const getBadgeThemeOverrides = (
  theme: Theme,
  mode: Mode
): Pick<Components<Theme>, "MuiBadge"> => ({
  MuiBadge: {
    styleOverrides: {
      badge: ({ ownerState }: { ownerState: BadgeOwnerState }) => {
        const size = ownerState.size || 'medium';
        const customColor = ownerState.customColor || 'primary';
        const customVariant = ownerState.customVariant || 'standard';
        const standalone = ownerState.standalone || false;
        const isDot = customVariant === 'dot';
        const isOutlined = customVariant === 'outlined';

        const sizeStyles = isDot ? getDotSizeStyles(size) : getSizeStyles(size);
        const colorStyles = isOutlined 
          ? getOutlinedBadgeStyles(customColor)
          : getColorStyles(customColor);

        return {
          borderRadius: isDot ? '50%' : borderRadius.xxl,
          fontWeight: typography.fontWeight.bold,
          lineHeight: 1,
          letterSpacing: typography.letterSpacing.wide,
          transition: `all ${transitions.duration.shorter}ms ${transitions.easing.easeInOut}`,
          border: `2px solid ${mode === 'light' ? colors.white : theme.palette.background.paper}`,
          boxShadow: shadows.md,
          ...sizeStyles,
          ...colorStyles,
          ...(standalone ? getStandaloneBadgeStyles() : {}),
          "&:hover": {
            transform: standalone ? "scale(1.05)" : "scale(1.15)",
            boxShadow: shadows.lg,
          },
        };
      },
      invisible: {
        transform: "scale(0)",
        opacity: 0,
      },
    },
  },
});
