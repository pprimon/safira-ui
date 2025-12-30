import React from "react";
import { Button as MuiButton, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { ButtonProps as MuiButtonProps } from "@mui/material";
import type {
  BaseComponentProps,
  SizeProps,
  VariantProps,
  DisabledProps,
  LoadingProps,
  ClickableProps,
} from "../../types";
import {
  colors,
  borderRadius,
  spacing,
  shadows,
  transitions,
} from "../../theme";

export interface ButtonProps
  extends BaseComponentProps,
    SizeProps,
    VariantProps,
    DisabledProps,
    LoadingProps,
    ClickableProps {
  /**
   * Conteúdo do botão
   */
  children: React.ReactNode;
  /**
   * Tipo do botão HTML
   */
  type?: "button" | "submit" | "reset";
  /**
   * Se o botão deve ocupar toda a largura disponível
   */
  fullWidth?: boolean;
  /**
   * Ícone à esquerda do texto
   */
  startIcon?: React.ReactNode;
  /**
   * Ícone à direita do texto
   */
  endIcon?: React.ReactNode;
}

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => !["variant", "size"].includes(prop as string),
})<ButtonProps>(({ theme, variant = "primary", size = "medium" }) => {
  const sizeStyles = {
    small: {
      padding: `${spacing.xs} ${spacing.md}`,
      fontSize: "0.875rem",
      minHeight: "32px",
    },
    medium: {
      padding: `${spacing.sm} ${spacing.lg}`,
      fontSize: "1rem",
      minHeight: "40px",
    },
    large: {
      padding: `${spacing.md} ${spacing.xl}`,
      fontSize: "1.125rem",
      minHeight: "48px",
    },
  };

  const variantStyles = {
    primary: {
      backgroundColor: colors.primary.main,
      color: colors.primary.contrastText,
      boxShadow: shadows.sm,
      border: "none",
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
      border: "none",
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
      color: colors.primary.main,
      boxShadow: "none",
      border: "none",
      "&:hover": {
        backgroundColor: colors.surface.light,
        color: colors.primary.dark,
        transform: "translateY(-1px)",
      },
      "&:active": {
        transform: "translateY(0)",
        backgroundColor: colors.surface.main,
      },
    },
  };

  return {
    borderRadius: borderRadius.xl,
    textTransform: "none",
    fontWeight: 600,
    letterSpacing: "0.025em",
    transition: `all ${transitions.duration.shorter}ms ${transitions.easing.easeInOut}`,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    position: "relative",
    overflow: "hidden",
    userSelect: "none",
    ...sizeStyles[size],
    ...variantStyles[variant],
    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
      transform: "none !important",
      "&:hover": {
        transform: "none !important",
        boxShadow: "none !important",
      },
    },
    "&:focus-visible": {
      outline: `3px solid ${colors.accent.main}`,
      outlineOffset: "2px",
    },
    // Efeito ripple sutil
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background:
        "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
      transform: "translateX(-100%)",
      transition: "transform 0.6s ease",
    },
    "&:hover::before": {
      transform: "translateX(100%)",
    },
  };
});

/**
 * Componente Button do Safira UI
 *
 * Botão moderno com múltiplas variações, estados de loading e acessibilidade completa.
 * Baseado no Material UI com customizações para a identidade visual do Safira UI.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="medium" onClick={handleClick}>
 *   Clique aqui
 * </Button>
 *
 * <Button variant="outline" loading startIcon={<Icon />}>
 *   Carregando...
 * </Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  fullWidth = false,
  startIcon,
  endIcon,
  type = "button",
  onClick,
  className,
  "data-testid": dataTestId,
  ...rest
}) => {
  const isDisabled = disabled || loading;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!isDisabled && onClick) {
      onClick(event);
    }
  };

  // Mapear variantes customizadas para variantes do MUI
  const getMuiVariant = (
    variant: string
  ): "contained" | "outlined" | "text" => {
    switch (variant) {
      case "primary":
      case "secondary":
        return "contained";
      case "outline":
        return "outlined";
      case "ghost":
        return "text";
      default:
        return "contained";
    }
  };

  return (
    <StyledButton
      variant={getMuiVariant(variant)}
      size={size}
      disabled={isDisabled}
      fullWidth={fullWidth}
      type={type}
      onClick={handleClick}
      className={className}
      data-testid={dataTestId}
      startIcon={loading ? undefined : startIcon}
      endIcon={loading ? undefined : endIcon}
      {...rest}
    >
      {loading && (
        <CircularProgress
          size={size === "small" ? 16 : size === "large" ? 24 : 20}
          sx={{
            color:
              variant === "outline" || variant === "ghost"
                ? colors.primary.main
                : colors.primary.contrastText,
            marginRight: children ? spacing.xs : 0,
          }}
        />
      )}
      {children}
    </StyledButton>
  );
};

export default Button;
