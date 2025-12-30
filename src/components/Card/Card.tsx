import React from "react";
import {
  Card as MuiCard,
  CardHeader,
  CardContent,
  CardActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import type { BaseComponentProps, ClickableProps } from "../../types";
import {
  colors,
  borderRadius,
  spacing,
  shadows,
  transitions,
} from "../../theme";

export interface CardProps extends BaseComponentProps, ClickableProps {
  /**
   * Conteúdo principal do card
   */
  children: React.ReactNode;
  /**
   * Título do card (aparece no header)
   */
  title?: string;
  /**
   * Subtítulo do card (aparece no header)
   */
  subtitle?: string;
  /**
   * Avatar ou ícone do header
   */
  avatar?: React.ReactNode;
  /**
   * Ações do header (botões, menu, etc)
   */
  headerAction?: React.ReactNode;
  /**
   * Ações do footer (botões)
   */
  actions?: React.ReactNode;
  /**
   * Variante visual do card
   */
  variant?: "elevated" | "outlined" | "filled";
  /**
   * Se o card é clicável (adiciona hover effects)
   */
  clickable?: boolean;
  /**
   * Se deve mostrar o header
   */
  showHeader?: boolean;
  /**
   * Se deve mostrar o footer de ações
   */
  showActions?: boolean;
  /**
   * Padding customizado do conteúdo
   */
  contentPadding?: string;
}

const StyledCard = styled(MuiCard, {
  shouldForwardProp: (prop) =>
    !["variant", "clickable"].includes(prop as string),
})<{ variant?: "elevated" | "outlined" | "filled"; clickable?: boolean }>(
  ({ theme, variant = "elevated", clickable = false }) => {
    const variantStyles = {
      elevated: {
        backgroundColor: "#FFFFFF",
        boxShadow: shadows.lg,
        border: `1px solid ${colors.surface.light}`,
      },
      outlined: {
        backgroundColor: "#FFFFFF",
        boxShadow: shadows.sm,
        border: `2px solid ${colors.primary.light}`,
      },
      filled: {
        backgroundColor: colors.surface.light,
        boxShadow: shadows.md,
        border: `1px solid ${colors.surface.main}`,
      },
    };

    const clickableStyles = clickable
      ? {
          cursor: "pointer",
          transition: `all ${transitions.duration.shorter}ms ${transitions.easing.easeInOut}`,
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: variant === "outlined" ? shadows.xl : shadows.xxl,
            borderColor: colors.primary.main,
            "& .card-header": {
              backgroundColor: colors.primary.dark,
            },
          },
          "&:active": {
            transform: "translateY(-3px)",
          },
        }
      : {};

    return {
      borderRadius: borderRadius.xl,
      overflow: "hidden",
      position: "relative",
      ...variantStyles[variant],
      ...clickableStyles,
    };
  }
);

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  backgroundColor: colors.primary.main,
  color: colors.primary.contrastText,
  padding: `${spacing.xl} ${spacing.xxl}`,
  transition: `all ${transitions.duration.shorter}ms ${transitions.easing.easeInOut}`,
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: spacing.xxl,
    right: spacing.xxl,
    height: "2px",
    backgroundColor: colors.accent.main,
  },
  "& .MuiCardHeader-title": {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: colors.primary.contrastText,
    letterSpacing: "-0.025em",
  },
  "& .MuiCardHeader-subheader": {
    fontSize: "1rem",
    color: colors.primary.contrastText + "DD",
    marginTop: spacing.sm,
    fontWeight: 500,
  },
  "& .MuiCardHeader-avatar": {
    marginRight: spacing.lg,
  },
  "& .MuiCardHeader-action": {
    margin: 0,
    alignSelf: "center",
  },
}));

const StyledCardContent = styled(CardContent, {
  shouldForwardProp: (prop) => prop !== "contentPadding",
})<{ contentPadding?: string }>(({ theme, contentPadding }) => ({
  backgroundColor: "transparent",
  color: colors.text.primary,
  padding: contentPadding || `${spacing.xxl}`,
  "&:last-child": {
    paddingBottom: contentPadding || `${spacing.xxl}`,
  },
  lineHeight: 1.6,
  fontSize: "1rem",
}));

const StyledCardActions = styled(CardActions)(({ theme }) => ({
  backgroundColor: colors.surface.light,
  padding: `${spacing.lg} ${spacing.xxl}`,
  borderTop: `2px solid ${colors.surface.main}`,
  justifyContent: "flex-end",
  gap: spacing.md,
}));

/**
 * Componente Card do Safira UI
 *
 * Container moderno e flexível com header, conteúdo e ações.
 * Suporta múltiplas variantes visuais e estados interativos.
 *
 * @example
 * ```tsx
 * <Card
 *   title="Título do Card"
 *   subtitle="Subtítulo opcional"
 *   avatar={<Avatar>U</Avatar>}
 *   actions={
 *     <>
 *       <Button variant="outline">Cancelar</Button>
 *       <Button variant="primary">Confirmar</Button>
 *     </>
 *   }
 * >
 *   <p>Conteúdo do card aqui...</p>
 * </Card>
 *
 * <Card
 *   variant="outlined"
 *   clickable
 *   onClick={() => navigate('/details')}
 * >
 *   <h3>Card Clicável</h3>
 *   <p>Clique para navegar</p>
 * </Card>
 *
 * <Card
 *   variant="filled"
 *   contentPadding="32px"
 *   showHeader={false}
 * >
 *   <CustomContent />
 * </Card>
 * ```
 */
export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  avatar,
  headerAction,
  actions,
  variant = "elevated",
  clickable = false,
  showHeader = true,
  showActions = true,
  contentPadding,
  onClick,
  className,
  "data-testid": dataTestId,
}) => {
  const hasHeader = showHeader && (title || subtitle || avatar || headerAction);
  const hasActions = showActions && actions;
  const isClickable = clickable || !!onClick;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <StyledCard
      variant={variant}
      clickable={isClickable}
      onClick={isClickable ? handleClick : undefined}
      className={`${className || ""} ${isClickable ? "card-clickable" : ""}`}
      data-testid={dataTestId}
    >
      {hasHeader && (
        <StyledCardHeader
          className="card-header"
          title={title}
          subheader={subtitle}
          avatar={avatar}
          action={headerAction}
        />
      )}

      <StyledCardContent contentPadding={contentPadding}>
        {children}
      </StyledCardContent>

      {hasActions && <StyledCardActions>{actions}</StyledCardActions>}
    </StyledCard>
  );
};

export default Card;
