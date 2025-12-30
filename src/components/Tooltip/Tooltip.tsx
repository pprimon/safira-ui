import React from "react";
import {
  Tooltip as MuiTooltip,
  TooltipProps as MuiTooltipProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import type { BaseComponentProps, Position } from "../../types";
import {
  colors,
  borderRadius,
  spacing,
  shadows,
  transitions,
  typography,
} from "../../theme";

export interface TooltipProps extends BaseComponentProps {
  /**
   * Elemento que ativa o tooltip
   */
  children: React.ReactElement;
  /**
   * Conteúdo do tooltip
   */
  title: React.ReactNode;
  /**
   * Posição do tooltip
   */
  placement?: Position;
  /**
   * Se o tooltip está sempre visível
   */
  open?: boolean;
  /**
   * Callback quando o tooltip abre
   */
  onOpen?: () => void;
  /**
   * Callback quando o tooltip fecha
   */
  onClose?: () => void;
  /**
   * Delay para mostrar o tooltip (ms)
   */
  enterDelay?: number;
  /**
   * Delay para esconder o tooltip (ms)
   */
  leaveDelay?: number;
  /**
   * Se deve seguir o cursor
   */
  followCursor?: boolean;
  /**
   * Variante visual do tooltip
   */
  variant?: "default" | "light" | "error" | "warning" | "success" | "info";
  /**
   * Tamanho máximo do tooltip
   */
  maxWidth?: number;
}

const StyledTooltip = styled(MuiTooltip, {
  shouldForwardProp: (prop) =>
    !["variant", "maxWidth"].includes(prop as string),
})<{ variant?: TooltipProps["variant"]; maxWidth?: number }>(
  ({ theme, variant = "default", maxWidth = 300 }) => {
    const variantStyles = {
      default: {
        backgroundColor: colors.background.main,
        color: colors.accent.main,
        border: `1px solid ${colors.primary.light}30`,
      },
      light: {
        backgroundColor: "#FFFFFF",
        color: colors.text.primary,
        border: `2px solid ${colors.surface.main}`,
      },
      error: {
        backgroundColor: colors.error.main,
        color: "#FFFFFF",
        border: `1px solid ${colors.error.dark}`,
      },
      warning: {
        backgroundColor: colors.warning.main,
        color: colors.text.primary,
        border: `1px solid ${colors.warning.dark}`,
      },
      success: {
        backgroundColor: colors.success.main,
        color: "#FFFFFF",
        border: `1px solid ${colors.success.dark}`,
      },
      info: {
        backgroundColor: colors.info.main,
        color: "#FFFFFF",
        border: `1px solid ${colors.info.dark}`,
      },
    };

    return {
      "& .MuiTooltip-tooltip": {
        ...variantStyles[variant],
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.semibold,
        padding: `${spacing.md} ${spacing.lg}`,
        borderRadius: borderRadius.xl,
        boxShadow: shadows.xl,
        maxWidth: `${maxWidth}px`,
        lineHeight: typography.lineHeight.normal,
        letterSpacing: "0.025em",
        transition: `all ${transitions.duration.shorter}ms ${transitions.easing.easeInOut}`,
        '&[data-popper-placement*="bottom"] .MuiTooltip-arrow': {
          top: 0,
          left: 0,
          marginTop: "-0.71em",
          width: "3em",
          height: "1em",
          "&::before": {
            borderWidth: "0 1em 1em 1em",
            borderColor: `transparent transparent ${variantStyles[variant].backgroundColor} transparent`,
          },
        },
        '&[data-popper-placement*="top"] .MuiTooltip-arrow': {
          bottom: 0,
          left: 0,
          marginBottom: "-0.71em",
          width: "3em",
          height: "1em",
          "&::before": {
            borderWidth: "1em 1em 0 1em",
            borderColor: `${variantStyles[variant].backgroundColor} transparent transparent transparent`,
          },
        },
        '&[data-popper-placement*="right"] .MuiTooltip-arrow': {
          left: 0,
          marginLeft: "-0.71em",
          height: "3em",
          width: "1em",
          "&::before": {
            borderWidth: "1em 1em 1em 0",
            borderColor: `transparent ${variantStyles[variant].backgroundColor} transparent transparent`,
          },
        },
        '&[data-popper-placement*="left"] .MuiTooltip-arrow': {
          right: 0,
          marginRight: "-0.71em",
          height: "3em",
          width: "1em",
          "&::before": {
            borderWidth: "1em 0 1em 1em",
            borderColor: `transparent transparent transparent ${variantStyles[variant].backgroundColor}`,
          },
        },
      },
      "& .MuiTooltip-arrow": {
        overflow: "hidden",
        position: "absolute",
        width: "1em",
        height: "0.71em",
        boxSizing: "border-box",
        color: variantStyles[variant].backgroundColor,
        "&::before": {
          content: '""',
          margin: "auto",
          display: "block",
          width: 0,
          height: 0,
          borderStyle: "solid",
        },
      },
    };
  }
);

/**
 * Componente Tooltip do Safira UI
 *
 * Tooltip moderno com múltiplas variantes, posicionamento flexível e animações suaves.
 * Baseado no Tooltip do Material UI com customizações para a identidade visual do Safira UI.
 *
 * @example
 * ```tsx
 * <Tooltip title="Informação útil" placement="top">
 *   <Button>Hover aqui</Button>
 * </Tooltip>
 *
 * <Tooltip
 *   title="Erro crítico detectado"
 *   variant="error"
 *   placement="bottom"
 *   enterDelay={500}
 * >
 *   <IconButton>
 *     <ErrorIcon />
 *   </IconButton>
 * </Tooltip>
 *
 * <Tooltip
 *   title="Este é um tooltip com muito texto que pode quebrar em múltiplas linhas"
 *   maxWidth={200}
 *   variant="light"
 * >
 *   <span>Texto com tooltip longo</span>
 * </Tooltip>
 * ```
 */
export const Tooltip: React.FC<TooltipProps> = ({
  children,
  title,
  placement = "top",
  open,
  onOpen,
  onClose,
  enterDelay = 700,
  leaveDelay = 0,
  followCursor = false,
  variant = "default",
  maxWidth = 300,
  duration = transitions.duration.shorter,
  className,
  "data-testid": dataTestId,
}) => {
  // Converter placement do nosso tipo para o tipo do MUI
  const muiPlacement = placement as MuiTooltipProps["placement"];

  return (
    <StyledTooltip
      title={title}
      placement={muiPlacement}
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      enterDelay={enterDelay}
      leaveDelay={leaveDelay}
      followCursor={followCursor}
      variant={variant}
      maxWidth={maxWidth}
      arrow
      className={className}
      componentsProps={{
        tooltip: {
          "data-testid": dataTestId,
        },
        transition: {
          timeout: duration,
        },
      }}
    >
      {children}
    </StyledTooltip>
  );
};

export default Tooltip;
