import type { Theme, Components } from "@mui/material/styles";
import { 
  colors, 
  borderRadius,
  spacing,
  typography 
} from "../../theme/tokens";

type Mode = 'light' | 'dark';
type CardVariant = 'elevated' | 'outlined' | 'filled';

const getVariantStyles = (variant: CardVariant, mode: Mode) => {
  const isDark = mode === 'dark';
  
  const variantStyles = {
    elevated: {
      backgroundColor: isDark ? colors.background.light : colors.white,
      boxShadow: `0 10px 15px -3px rgba(0, 0, 0, ${isDark ? '0.3' : '0.1'}), 0 4px 6px -2px rgba(0, 0, 0, ${isDark ? '0.2' : '0.05'})`,
      border: `1px solid ${isDark ? colors.background.main : colors.surface.light}`,
    },
    outlined: {
      backgroundColor: isDark ? colors.background.light : colors.white,
      boxShadow: `0 1px 2px 0 rgba(0, 0, 0, ${isDark ? '0.2' : '0.05'})`,
      border: `2px solid ${isDark ? colors.primary.main : colors.primary.light}`,
    },
    filled: {
      backgroundColor: isDark ? colors.primary.alpha.lightDark : colors.primary.alpha.light,
      boxShadow: `0 4px 6px -1px rgba(0, 0, 0, ${isDark ? '0.3' : '0.1'}), 0 2px 4px -1px rgba(0, 0, 0, ${isDark ? '0.2' : '0.06'})`,
      border: `1px solid ${isDark ? colors.primary.dark : colors.primary.light}`,
    },
  };

  return variantStyles[variant];
};

const getClickableStyles = (theme: Theme) => ({
  cursor: 'pointer',
  transition: theme.transitions.create(
    ['transform', 'box-shadow', 'border-color'],
    { duration: theme.transitions.duration.shorter }
  ),
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: theme.shadows[8],
    borderColor: colors.primary.main,
    '& .MuiCardHeader-root': {
      backgroundColor: colors.primary.dark,
    },
  },
  '&:active': {
    transform: 'translateY(-3px)',
  },
});

export const getCardThemeOverrides = (
  theme: Theme,
  mode: Mode
): Pick<Components<Theme>, "MuiCard" | "MuiCardHeader" | "MuiCardContent" | "MuiCardActions"> => ({
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: borderRadius.xl,
        overflow: 'hidden',
        position: 'relative',
        transition: theme.transitions.create(
          ['box-shadow', 'transform', 'border-color'],
          { duration: theme.transitions.duration.shorter }
        ),
        '&[data-variant="elevated"]': getVariantStyles('elevated', mode),
        '&[data-variant="outlined"]': getVariantStyles('outlined', mode),
        '&[data-variant="filled"]': getVariantStyles('filled', mode),
        '&[data-clickable="true"]': getClickableStyles(theme),
      },
    },
  },
  MuiCardHeader: {
    defaultProps: {
      titleTypographyProps: {
        color: 'inherit',
      },
      subheaderTypographyProps: {
        color: 'inherit',
      },
    },
    styleOverrides: {
      root: {
        backgroundColor: colors.primary.main,
        color: colors.primary.contrastText,
        padding: `${spacing.xl} ${spacing.xxl}`,
        transition: theme.transitions.create(
          ['background-color'],
          { duration: theme.transitions.duration.shorter }
        ),
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: spacing.xxl,
          right: spacing.xxl,
          height: '2px',
          backgroundColor: colors.accent.main,
        },
      },
      title: {
        fontSize: typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.bold,
        letterSpacing: typography.letterSpacing.tight,
      },
      subheader: {
        fontSize: typography.fontSize.md,
        marginTop: spacing.sm,
        fontWeight: typography.fontWeight.medium,
      },
      avatar: {
        marginRight: spacing.lg,
      },
      action: {
        margin: 0,
        alignSelf: 'center',
      },
    },
  },
  MuiCardContent: {
    styleOverrides: {
      root: {
        backgroundColor: 'transparent',
        color: mode === 'dark' ? colors.white : colors.text.primary,
        padding: spacing.xxl,
        '&:last-child': {
          paddingBottom: spacing.xxl,
        },
        lineHeight: typography.lineHeight.normal,
        fontSize: typography.fontSize.md,
        '& h1, & h2, & h3, & h4, & h5, & h6': {
          color: mode === 'dark' ? colors.white : colors.secondary.main,
        },
      },
    },
  },
  MuiCardActions: {
    styleOverrides: {
      root: {
        backgroundColor: mode === 'dark' ? colors.primary.alpha.lightDark : colors.primary.alpha.light,
        padding: `${spacing.lg} ${spacing.xxl}`,
        borderTop: `2px solid ${colors.accent.main}`,
        justifyContent: 'flex-end',
        gap: spacing.md,
        ...(mode === 'dark' && {
          '& .MuiButton-outlined, & .MuiButton-text': {
            color: colors.white,
            borderColor: colors.white,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderColor: colors.white,
            },
          },
        }),
      },
    },
  },
});

