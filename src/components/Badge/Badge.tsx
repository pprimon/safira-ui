import React from "react";
import { Badge as MuiBadge, BadgeProps as MuiBadgeProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  BaseComponentProps,
  SizeProps,
  ColorProps,
  VariantProps,
} from "../../types";
import {
  colors,
  borderRadius,
  spacing,
  shadows,
  transitions,
  typography,
} from "../../theme";

export interface BadgeProps extends BaseComponentProps, SizeProps, ColorProps {
  /**
   * Elemento que recebe o badge
   */
  children?: React.ReactElement;
  /**
   * Conteúdo do badge (número, texto, ícone)
   */
  content?: React.ReactNode;
  /**
   * Número máximo a ser exibido (ex: 99+)
   */
  max?: number;
  /**
   * Se deve mostrar zero
   */
  showZero?: boolean;
  /**
   * Variante visual do badge
   */
  variant?: "standard" | "dot" | "outlined";
  /**
   * Posição do badge
   */
  anchorOrigin?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "right";
  };
  /**
   * Se o badge está invisível
   */
  invisible?: boolean;
  /**
   * Badge standalone (sem children)
   */
  standalone?: boolean;
}

const StyledBadge = styled(MuiBadge, {
  shouldForwardProp: (prop) =>
    !["color", "size", "variant", "standalone"].includes(prop as string),
})<{
  color?: BadgeProps["color"];
  size?: BadgeProps["size"];
  variant?: BadgeProps["variant"];
  standalone?: boolean;
}>(
  ({
    theme,
    color = "primary",
    size = "medium",
    variant = "standard",
    standalone = false,
  }) => {
    const colorStyles = {
      primary: {
        backgroundColor: colors.primary.main,
        color: colors.primary.contrastText,
      },
      secondary: {
        backgroundColor: colors.secondary.main,
        color: colors.secondary.contrastText,
      },
      accent: {
        backgroundColor: colors.accent.main,
        color: colors.accent.contrastText,
      },
      success: {
        backgroundColor: colors.success.main,
        color: colors.success.contrastText,
      },
      error: {
        backgroundColor: colors.error.main,
        color: colors.error.contrastText,
      },
      warning: {
        backgroundColor: colors.warning.main,
        color: colors.warning.contrastText,
      },
      info: {
        backgroundColor: colors.info.main,
        color: colors.info.contrastText,
      },
    };

    const sizeStyles = {
      small: {
        height: "16px",
        minWidth: "16px",
        fontSize: "0.625rem",
        padding: "0 4px",
      },
      medium: {
        height: "20px",
        minWidth: "20px",
        fontSize: "0.75rem",
        padding: "0 6px",
      },
      large: {
        height: "24px",
        minWidth: "24px",
        fontSize: "0.875rem",
        padding: "0 8px",
      },
    };

    const variantStyles = {
      standard: {
        ...colorStyles[color],
        boxShadow: shadows.sm,
      },
      dot: {
        ...colorStyles[color],
        height: size === "small" ? "8px" : size === "large" ? "12px" : "10px",
        minWidth: size === "small" ? "8px" : size === "large" ? "12px" : "10px",
        padding: 0,
        borderRadius: "50%",
      },
      outlined: {
        backgroundColor: "transparent",
        color: colorStyles[color].backgroundColor,
        border: `2px solid ${colorStyles[color].backgroundColor}`,
      },
    };

    const standaloneStyles = standalone
      ? {
          position: "static",
          transform: "none",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }
      : {};

    return {
      "& .MuiBadge-badge": {
        borderRadius: variant === "dot" ? "50%" : borderRadius.xxl,
        fontWeight: typography.fontWeight.bold,
        lineHeight: 1,
        letterSpacing: "0.025em",
        transition: `all ${transitions.duration.shorter}ms ${transitions.easing.easeInOut}`,
        border: "2px solid #FFFFFF",
        boxShadow: shadows.md,
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...standaloneStyles,
        "&:hover": {
          transform: standalone ? "scale(1.05)" : "scale(1.15)",
          boxShadow: shadows.lg,
        },
      },
      ...(standalone && {
        "& .MuiBadge-badge": {
          position: "static",
          transform: "none",
          "&:hover": {
            transform: "scale(1.05)",
          },
        },
      }),
    };
  }
);

/**
 * Componente Badge do Safira UI
 *
 * Indicador visual moderno para notificações, contadores e status.
 * Pode ser usado como overlay em outros elementos ou standalone.
 *
 * @example
 * ```tsx
 * // Badge com contador
 * <Badge content={5} color="error">
 *   <IconButton>
 *     <NotificationsIcon />
 *   </IconButton>
 * </Badge>
 *
 * // Badge dot para indicar status
 * <Badge variant="dot" color="success">
 *   <Avatar src="/user.jpg" />
 * </Badge>
 *
 * // Badge standalone
 * <Badge
 *   content="Novo"
 *   color="accent"
 *   size="small"
 *   standalone
 * />
 *
 * // Badge com texto
 * <Badge content="Beta" variant="outlined" color="info">
 *   <Button>Recurso Beta</Button>
 * </Badge>
 * ```
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  content,
  max = 99,
  showZero = false,
  variant = "standard",
  color = "primary",
  size = "medium",
  anchorOrigin = {
    vertical: "top",
    horizontal: "right",
  },
  invisible = false,
  standalone = false,
  className,
  "data-testid": dataTestId,
}) => {
  // Se é standalone, renderiza apenas o badge
  if (standalone) {
    return (
      <StyledBadge
        color={color}
        size={size}
        variant={variant}
        standalone={standalone}
        badgeContent={content}
        max={max}
        showZero={showZero}
        invisible={invisible}
        className={className}
        data-testid={dataTestId}
      >
        <span /> {/* Elemento vazio necessário para o MUI Badge */}
      </StyledBadge>
    );
  }

  // Renderização normal com children
  return (
    <StyledBadge
      color={color}
      size={size}
      variant={variant}
      badgeContent={content}
      max={max}
      showZero={showZero}
      anchorOrigin={anchorOrigin}
      invisible={invisible}
      className={className}
      data-testid={dataTestId}
    >
      {children}
    </StyledBadge>
  );
};

export default Badge;
